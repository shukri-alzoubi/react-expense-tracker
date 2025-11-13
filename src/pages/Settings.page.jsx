import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import { useAuth } from "../context/Auth.context";
import { useFirestore } from "../context/Firestore.context";
import { useNotifier } from "../context/Notifier.context";
import { useTheme } from "../context/Theme.context";
import { downloadCSV, downloadJSON, formatDate, isValidJSONObject, ObjectFromCSVFile, ObjectFromJSONFile } from "../utils/helper";

export default function SettingsPage() {

    const navigate = useNavigate();

    const {
        uploadFile,
        showLoadingModal,
        showFormModal,
        showToast,
        showConfirmModal,
        showOptionsModal,
    } = useNotifier();

    const {
        user,
        updateDisplayName,
        verifyEmail,
        updateUserEmail,
        updateUserPassword,
        reauthenticate,
        logout,
        deleteAccount,
    } = useAuth();

    const { data, updateField } = useFirestore();
    const { theme, setTheme } = useTheme();

    /** Update Display Name */
    function handleUpdateDisplayName() {
        showFormModal({
            autoClose: true,
            message: 'Update Name',
            formEntries: [
                { name: 'displayName', placeholder: 'e.g. Jhon Doe', value: user?.displayName ?? 'User', attributes: { required: true } },
                { name: 'password', type: 'password', placeholder: 'Enter password', attributes: { required: true } },
            ],
            submitText: 'Update',
            onSubmit: async (data) => {
                await showLoadingModal(true);
                try {
                    let authenticated = await reauthenticate(data.password);
                    if (authenticated) {
                        await updateDisplayName(data?.displayName);
                        showToast({ message: 'Name Was Updated', color: 'success' });
                    }
                } catch (error) {
                    showToast({ message: 'Something went wrong', color: 'danger' })
                }
                await showLoadingModal(false);
            }
        })
    }

    /** Update Email */
    function handleUpdateEmail() {
        showFormModal({
            message: 'Change Email Address',
            formEntries: [
                { name: 'email', placeholder: 'Enter new email address', attributes: { type: 'email', required: true } },
                { name: 'password', type: 'password', placeholder: 'Enter password', attributes: { required: true } },
            ],
            submitText: 'Update',
            onConfirm: async (data) => {
                await showLoadingModal(true);
                try {
                    let authenticated = await updateUserEmail(data.password, data.email);
                    if (authenticated)
                        showToast({ message: 'A confirmation link was sent to your email address', color: 'success' });
                } catch (error) {
                    showToast({ message: 'Something went wrong', color: 'danger' })
                }
                await showLoadingModal(false);
            }
        })
    }

    /** Verify Email Address */
    async function handleVerifyEmail() {
        await showLoadingModal(true);
        try {
            await verifyEmail();
            showToast({ message: 'A verification link was sent to your email address', color: 'success' });
        } catch (error) {
            showToast({ message: 'Something went wrong', color: 'danger' })
        }
        await showLoadingModal(false);
    }

    /** Update Password */
    function handleUpdatePassword() {
        showFormModal({
            message: 'Change Password',
            submitText: 'Update',
            formEntries: [
                { type: 'password', name: 'password', placeholder: 'Current Password', attributes: { required: true } },
                { type: 'password', name: 'newPassword', placeholder: 'New password', attributes: { required: true } },
                { type: 'password', name: 'confirmPassword', placeholder: 'Confirm password', attributes: { required: true } },
            ],
            onConfirm: async (data) => {
                await showLoadingModal(true);
                try {
                    if (data.newPassword !== data.confirmPassword) {
                        showToast({ message: 'password confirmation does not match with new password', color: 'danger' });
                    } else {
                        let authenticated = await updateUserPassword(data.password, data.newPasswprd);
                        if (authenticated) {
                            showToast({ message: 'Password Was Udated', color: 'success' });
                        } else {
                            throw new Error('somthing went wrong')
                        }
                    }

                } catch (error) {
                    showToast({ message: 'Something went wrong', color: 'danger' })
                }
                await showLoadingModal(false);
            }
        })
    }

    /** Sign Out Current User */
    const handleSignOut = () => {
        showConfirmModal({
            autoClose: true,
            title: 'Sign Out!',
            message: 'Do you want to sign out?',
            confirmColor: 'danger',
            confirmText: 'Sign Out',
            onConfirm: async () => {
                await logout();
            }
        })
    }

    /** Delete Account */
    const handleDeleteAccount = () => {
        showFormModal({
            autoClose: true,
            title: 'Delete Account!',
            message: 'Are you sure that you want to delete your account, if so all data on this account will be deleted !!!',
            formEntries: [
                { name: 'password', type: 'password', placeholder: 'Enter password', attributes: { required: true } },
            ],
            submitColor: 'danger',
            submitText: 'Delete',
            onConfirm: async (data) => {
                await showLoadingModal(true);
                try {
                    await deleteAccount(data.password);
                } catch (error) {
                    showToast({ message: 'Something went wrong', color: 'danger' })
                }
                await showLoadingModal(false);
            }
        })
    }

    // Import Transactions
    const handleImportTransactions = () => {
        showOptionsModal({
            autoClose: true,
            title: 'Export',
            options: [{ id: 'json', value: 'Import JSON' }, { id: 'csv', value: 'Import CSV' }],
            onConfirm: (id) => {
                // JSON Import
                if (id === 'json') { importTransactionsFromJSON() }
                // CSV Import
                else if (id === 'csv') { importTransactionsFromCSV() }
            }
        })
    }


    // Import JSON File
    const importTransactionsFromJSON = () => {
        uploadFile({
            extentions: '.json',
            onConfirm: async (file) => {
                await showLoadingModal(true);

                // Convert JSON File into JSON Object
                const json = await ObjectFromJSONFile(file);

                // Check JSON file 
                if (!json) {
                    showToast({ message: 'the file you imported is not valid', color: 'danger' });
                    return;
                }

                // Validate JSON File
                if (isValidJSONObject(json)) {
                    // Update Transaction if file is valid
                    await updateField({ field: 'transactions', data: json });
                    showToast({ message: 'Imported Successfully', color: 'success' });
                } else {
                    showToast({ message: 'the file you imported is not valid', color: 'danger' });
                }
                await showLoadingModal(false);
            }
        });
    }

    // Import CSV File
    const importTransactionsFromCSV = () => {
        uploadFile({
            extentions: '.csv',
            onConfirm: async (file) => {
                await showLoadingModal(true);

                // Convert JSON File into JSON Object
                const json = await ObjectFromCSVFile(file);

                // Check JSON file 
                if (!json) {
                    showToast({ message: 'the file you imported is not valid', color: 'danger' });
                    return;
                }

                // Validate JSON File
                if (isValidJSONObject(json)) {
                    // Update Transaction if file is valid
                    await updateField({ field: 'transactions', data: json });
                    showToast({ message: 'Imported Successfully', color: 'success' });
                } else {
                    showToast({ message: 'the file you imported is not valid', color: 'danger' });
                }
                await showLoadingModal(false);
            }
        });
    }

    const handleExportTransactions = () => {
        const transactions = data?.transactions ?? [];

        if (transactions.length <= 0) {
            showToast({ message: 'There are no transactions', color: 'danger' });
            return;
        }

        showOptionsModal({
            autoClose: true,
            title: 'Export',
            options: [{ id: 'json', value: 'Export JSON' }, { id: 'csv', value: 'Export CSV' }],
            onConfirm: (id) => {
                try {
                    if (id === 'json') { downloadJSON(transactions); }
                    else if (id === 'csv') { downloadCSV(transactions); }
                } catch (error) { showToast({ message: 'Something went wrong', color: 'danger' }); }
            }
        })
    }

    const handleClearData = () => {
        showFormModal({
            autoClose: true,
            title: 'Clear Data',
            message: 'All Transactions will be deleted from the app, make sure you have a backup file so you won\'t lose your data.',
            formEntries: [
                { name: 'password', type: 'password', placeholder: 'Enter password', attributes: { required: true } },
            ],
            submitColor: 'danger',
            submitText: 'Clear',
            onSubmit: async (data) => {
                await showLoadingModal(true);
                try {
                    // Authenticate With Password
                    let authenticated = await reauthenticate(data.password)
                    if (!authenticated) {
                        showToast({ message: 'wrong password', color: 'danger' })
                        return;
                    }

                    await updateField({ field: 'transactions', data: [] });
                    showToast({ message: 'All transactions were deleted', color: 'danger' })
                    await showLoadingModal(false);
                } catch (error) {
                    showToast({ message: 'Something went wrong', color: 'danger' })
                }
                await showLoadingModal(false);
            }
        });
    }


    return (<>
        <Navbar page="settings" >
            <div className="h100 py-lg-3">
                <h1 className="mb-5">Settings</h1>
                {/* Profile & Account */}
                <div className="profile-section  p-3 mb-4">
                    <div className="fw-bold"><i className="fa-solid fa-user-circle me-2"></i> Profile & Account</div>

                    <div className="p-3 col-12 col-lg-5">
                        {/* Display Name */}
                        <div className="input-group custom border-bottom rounded-0 mb-3 fs-md">
                            <div className="input-group-text fs-md"><i className="fa-solid fa-user"></i></div>
                            <input type="text" className="form-control input-sm" value={user?.displayName ?? 'User'} placeholder="Full Name" readOnly />
                            <div className="input-group-text fs-md" onClick={handleUpdateDisplayName}>
                                <i className="fa-solid fa-pen-to-square pointer"></i>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="mb-3">
                            <div className="input-group custom border-bottom rounded-0">
                                <div className="input-group-text fs-md"><i className="fa-solid fa-at"></i></div>
                                <input type="email" className="form-control input-sm" value={user?.email ?? 'Email'} placeholder="Email" readOnly />
                                <div className="input-group-text fs-md" onClick={handleUpdateEmail}>
                                    <i className="fa-solid fa-pen-to-square pointer"></i>
                                </div>
                            </div>

                            <div className="form-text fs-sm px-2">
                                {!user.emailVerified &&
                                    <span
                                        onClick={handleVerifyEmail}
                                        className="text-danger text-decoration-underline pointer">Verify</span>}
                            </div>
                        </div>

                        {/* Password */}
                        <div className="input-group custom border-bottom rounded-0 mb-3">
                            <div className="input-group-text fs-md"><i className="fa-solid fa-lock"></i></div>
                            <input type="password" className="form-control input-sm" value='**********' placeholder="Password" readOnly />
                            <div className="input-group-text fs-md" onClick={handleUpdatePassword}>
                                <i className="fa-solid fa-rotate-left pointer"></i>
                            </div>
                        </div>

                    </div>
                </div>


                {/* Theme & Appearance */}
                <div className="theme-section  p-3 mb-4">
                    <div className="fw-bold"><i className="fa-solid fa-palette me-2"></i>Theme & Appearance</div>

                    <div className="p-3 col-12 col-lg-5 fs-md">
                        <ul className="list-group list-group-flush">
                            <li
                                onClick={() => setTheme('light')}
                                className={`list-group-item list-group-item-action rounded my-1 border-0 ${theme === 'light' && 'active'}`}>
                                <div className="d-flex justify-content-between align-items-center">
                                    <span>Light Theme</span> <i className="fa-solid fa-sun"></i>
                                </div>
                            </li>

                            <li
                                onClick={() => setTheme('dark')}
                                className={`list-group-item list-group-item-action rounded my-1 border-0 ${theme === 'dark' && 'active'}`}>
                                <div className="d-flex justify-content-between align-items-center">
                                    <span>Dark Theme</span> <i className="fa-solid fa-moon"></i>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Data & Storage */}
                <div className="data-section  p-3 mb-4">
                    <div className="fw-bold"><i className="fa-solid fa-database me-2"></i>Data & Storage</div>

                    <div className="p-3 col-12 col-lg-5 fs-md">
                        <ul className="list-group list-group-flush">

                            {/* Sync With Firestore */}
                            <li
                                onClick={handleImportTransactions}
                                className={`list-group-item list-group-item-action rounded my-1 border-0`}>
                                <div className="d-flex justify-content-between align-items-center">
                                    <span>Import</span> <i className="fa-solid fa-file-import"></i>
                                </div>
                            </li>


                            {/*Export Data */}
                            <li
                                onClick={handleExportTransactions}
                                className={`list-group-item list-group-item-action rounded my-1 border-0`}>
                                <div className="d-flex justify-content-between align-items-center">
                                    <span>Export</span> <i className="fa-solid fa-file-export"></i>
                                </div>
                            </li>

                            {/* Clear Local Cash */}
                            <li
                                onClick={handleClearData}
                                className={`list-group-item list-group-item-action rounded my-1 border-0 text-danger`}>
                                <div className="d-flex justify-content-between align-items-center">
                                    <span>Clear All Data</span> <i className="fa-solid fa-trash-can"></i>
                                </div>
                            </li>

                        </ul>
                    </div>
                </div>

                {/* App Info */}
                <div className="app-section  p-3 mb-4">
                    <div className="fw-bold"><i className="fa-solid fa-circle-info me-2"></i>App Info</div>

                    <div className="p-3 col-12 col-lg-5 fs-md">
                        <ul className="list-group list-group-flush">
                            {/* Version */}
                            <li className={`list-group-item border-0`}>
                                <div className="d-flex justify-content-between align-items-center text-secondary no-highlight">
                                    <span>Version </span> <span>1.0.0</span>
                                </div>
                            </li>

                            {/* Last Update */}
                            <li className={`list-group-item border-0`}>
                                <div className="d-flex justify-content-between align-items-center text-secondary no-highlight">
                                    <span>Last Update</span> <span>{formatDate(Date.now())}</span>
                                </div>
                            </li>

                            <hr />

                            {/* About Link */}
                            <li className={`list-group-item list-group-item-action rounded my-1 border-0`}>
                                <div className="d-flex justify-content-between align-items-center" onClick={() => navigate('/about')}>
                                    <span>About</span> <i className="fa-solid fa-question"></i>
                                </div>
                            </li>

                            {/* Privacy Policy Link */}
                            <li className={`list-group-item list-group-item-action rounded my-1 border-0`} onClick={() => navigate('/privacy-policy')}>
                                <div className="d-flex justify-content-between align-items-center">
                                    <span>Privacy Policy</span> <i className="fa-solid fa-shield-halved"></i>
                                </div>
                            </li>
                        </ul>
                    </div>

                </div>

                {/* Danger Zone */}
                <div className="danger-section  p-3 mb-4">
                    <div className="fw-bold"><i className="fa-solid fa-triangle-exclamation me-2"></i>Danger Zone</div>

                    <div className="p-3 col-12 col-lg-5 fs-md">
                        <ul className="list-group list-group-flush">

                            {/* Sign Out */}
                            <li
                                onClick={handleSignOut}
                                className={`list-group-item list-group-item-action rounded my-1 border-0 text-danger`}>
                                <div className="d-flex justify-content-between align-items-center">
                                    <span>Sign Out</span> <i className="fa-solid fa-arrow-right-from-bracket"></i>
                                </div>
                            </li>

                            {/* Delete Account */}
                            <li className={`list-group-item border-0 rounded-2 my-1 p-0`}>
                                <button
                                    onClick={handleDeleteAccount}
                                    className="button btn btn-danger d-flex justify-content-between align-items-center w-100 px-3">
                                    <span>Delete Account</span> <i className="fa-solid fa-trash fs-sm"></i>
                                </button>
                            </li>

                        </ul>
                    </div>
                </div>
            </div>
        </Navbar>
    </>);
}
