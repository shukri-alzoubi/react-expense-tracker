import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";

const PrivacyPolicyPage = () => {
    return (<>
        <Navbar page="privacy policy">
            <PrivacyPolicy />
        </Navbar>
    </>);
}

export default PrivacyPolicyPage;

const PrivacyPolicy = () => {
    return (
        <div className="container py-5">
            <div className="text-center mb-4">
                <h2 className="fw-bold"><i className="fa-solid fa-shield-halved me-2"></i>Privacy Policy</h2>
                <p className="text-muted">Last updated: {new Date().getFullYear()}</p>
            </div>

            <div className="border-bottom p-3 mb-4">
                <div className="card-body">
                    <h5 className="mb-3"><i className="fa-solid fa-circle-info me-2 text-primary"></i>Introduction</h5>
                    <p className="px-3 fs-md">
                        Expense Tracker ("we", "us", "our") is committed to protecting your privacy. This Privacy Policy explains how we collect,
                        use, disclose, and protect information when you use our web application.
                    </p>
                </div>
            </div>

            <div className="border-bottom p-3 mb-4">
                <div className="card-body">
                    <h5 className="mb-3"><i className="fa-solid fa-database me-2 text-success"></i>Information We Collect</h5>
                    <ul className="fs-md">
                        <li className="mb-1"><strong>Account Information:</strong> Email address and profile info you provide during sign-up (via Firebase Auth).</li>
                        <li className="mb-1"><strong>Transaction & Financial Data:</strong> Wallet balances, transactions, categories, notes and tags stored in Firestore.</li>
                        <li className="mb-1"><strong>Usage Data:</strong> App usage, pages visited, and performance data for diagnostics and improvements.</li>
                        <li className="mb-1"><strong>Device & Browser Data:</strong> IP address, browser type, and basic device details for security and analytics.</li>
                    </ul>
                </div>
            </div>

            <div className="border-bottom p-3 mb-4">
                <div className="card-body">
                    <h5 className="mb-3"><i className="fa-solid fa-hands-helping me-2 text-warning"></i>How We Use Your Information</h5>
                    <ul className="fs-md">
                        <li className="mb-1">To provide and maintain your account, sync your transactions, and display your dashboard.</li>
                        <li className="mb-1">To authenticate users securely using Firebase Authentication.</li>
                        <li className="mb-1">To store and retrieve your transaction data using Firebase Firestore.</li>
                        <li className="mb-1">To improve the app, troubleshoot issues, and analyze usage patterns.</li>
                        <li className="mb-1">To communicate important updates, security alerts, or account-related messages.</li>
                    </ul>
                </div>
            </div>

            <div className="border-bottom p-3 mb-4">
                <div className="card-body">
                    <h5 className="mb-3"><i className="fa-solid fa-lock me-2 text-secondary"></i>Authentication & Storage</h5>
                    <p className="mb-1">
                        We use <strong>Firebase Authentication</strong> to manage user sign-in and account security. Your authentication credentials are
                        handled by Firebase and are never accessible to us in plaintext.
                    </p>
                    <p className="px-3 fs-md">
                        Your app data (transactions, wallet, settings) is stored in <strong>Firebase Firestore</strong>. Access to your Firestore data
                        is controlled by Firebase security rules — only authenticated users can access their own records.
                    </p>
                </div>
            </div>

            <div className="border-bottom p-3 mb-4">
                <div className="card-body">
                    <h5 className="mb-3"><i className="fa-solid fa-shield-virus me-2 text-danger"></i>Security</h5>
                    <p className="px-3 fs-md">
                        We take reasonable measures to protect your data, including using HTTPS for all network traffic and relying on Firebase's
                        security features. However, no system is 100% secure — please keep your account credentials safe and enable strong passwords.
                    </p>
                </div>
            </div>

            <div className="border-bottom p-3 mb-4">
                <div className="card-body">
                    <h5 className="mb-3"><i className="fa-solid fa-cookie me-2 text-info"></i>Cookies & Local Storage</h5>
                    <p className="px-3 fs-md">
                        The app may use cookies or browser local storage for session handling and UI preferences (e.g., light/dark theme). These are
                        non-invasive and not used to store sensitive financial data.
                    </p>
                </div>
            </div>

            <div className="border-bottom p-3 mb-4">
                <div className="card-body">
                    <h5 className="mb-3"><i className="fa-solid fa-handshake-angle me-2 text-muted"></i>Third-Party Services</h5>
                    <p className="px-3 fs-md">
                        We rely on third-party providers (Firebase) for authentication and data storage. These providers have their own privacy
                        practices — please review Firebase's policies for details. We do not sell your personal information to third parties.
                    </p>
                </div>
            </div>

            <div className="border-bottom p-3 mb-4">
                <div className="card-body">
                    <h5 className="mb-3"><i className="fa-solid fa-clock-rotate-left me-2 text-warning"></i>Data Retention</h5>
                    <p className="px-3 fs-md">
                        We retain your account and transactional data for as long as your account exists or as needed to provide the service.
                        If you delete your account, we will remove your data from Firestore within a reasonable timeframe, except where retention is
                        required by law.
                    </p>
                </div>
            </div>

            <div className="border-bottom p-3 mb-4">
                <div className="card-body">
                    <h5 className="mb-3"><i className="fa-solid fa-user-gear me-2 text-primary"></i>Your Rights</h5>
                    <ul>
                        <li className="mb-1">Access: You can view your profile and exported transaction data anytime from the app.</li>
                        <li className="mb-1">Portability: Use the app's export feature to download your data as CSV or as JSON.</li>
                        <li className="mb-1">Deletion: You may delete your account from Settings — this will remove your data from our servers.</li>
                    </ul>
                    <p className="mb-0 text-muted">If you need assistance exercising any rights, contact us at <a href="mailto:support@expensetracker.com">support@expensetracker.com</a>.</p>
                </div>
            </div>

            <div className="border-bottom p-3 mb-4">
                <div className="card-body">
                    <h5 className="mb-3"><i className="fa-solid fa-circle-exclamation me-2 text-danger"></i>Children's Privacy</h5>
                    <p className="px-3 fs-md">
                        Expense Tracker is not intended for children under 13. We do not knowingly collect or maintain information from children under
                        13. If you believe a child under 13 has created an account, contact us to remove the account.
                    </p>
                </div>
            </div>

            <div className="border-bottom p-3 mb-4">
                <div className="card-body">
                    <h5 className="mb-3"><i className="fa-solid fa-file-pen me-2 text-secondary"></i>Changes to This Policy</h5>
                    <p className="px-3 fs-md">
                        We may update this Privacy Policy periodically. When changes are significant, we will provide a prominent notice in the app or
                        via the email associated with your account.
                    </p>
                </div>
            </div>

            <div className="p-3 mb-4">
                <div className="card-body">
                    <h5 className="mb-3"><i className="fa-solid fa-envelope me-2 text-success"></i>Contact Us</h5>
                    <p className="px-3 fs-md">
                        If you have questions or concerns about this Privacy Policy, please contact us at
                        <a href="mailto:support@expensetracker.com" className="ms-1">support@expensetracker.com</a>.
                    </p>
                </div>
            </div>

            <Footer />
        </div>
    );

}