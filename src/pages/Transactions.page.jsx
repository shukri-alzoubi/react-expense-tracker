import Navbar from "../components/layout/Navbar";
import { useNotifier } from "../context/Notifier.context";
import categories from '../data/categories.json';
import TransactionForm from "../components/forms/Transaction.form";
import { useTransaction } from "../hooks/useTransaction";
import Loading from "../components/ui/Loading";
import TransactionFilter from "../components/layout/TransactionFilter";
import { downloadCSV, downloadJSON, formatTime, formatDate, formatCurrency } from "../utils/helper";

const TransactionsPage = () => {

    const {
        showCustomModal,
        closeModal,
        showToast,
        showConfirmModal,
        showLoadingModal,
        showOptionsModal,
    } = useNotifier();

    const {
        filter,
        isFiltering,
        updateFilter,
        transactions,
        insertTransaction,
        updateTransaction,
        removeTransaction,
    } = useTransaction();


    // Add A New Transaction
    const handleNewTransaction = async () => {

        showCustomModal(<>
            <div className="modal-content">
                <TransactionForm
                    onSubmit={async (trans) => {
                        closeModal();
                        await showLoadingModal(true);
                        try {
                            await insertTransaction(trans);
                            showToast({ message: 'Added', color: 'success' });
                        } catch (error) { console.log(error) }
                        await showLoadingModal(false);
                    }}
                    onCancel={closeModal}
                />
            </div>
        </>)
    }

    // Handle Update Modal
    const handleUpdateTransaction = (transaction) => {
        showCustomModal(<>
            <div className="modal-content">
                <TransactionForm
                    confirmText="Update"
                    transaction={transaction}
                    onSubmit={async (trans) => {
                        closeModal();
                        await showLoadingModal(true);
                        try {
                            await updateTransaction(trans);
                            showToast({ message: 'Updated', color: 'primary' });
                        } catch (error) { console.log(error) }
                        await showLoadingModal(false);
                    }}
                    onDelete={() => handleremoveTransaction(transaction)}
                    onCancel={closeModal}
                />
            </div>
        </>)
    }

    // Handle Delete Confirmation
    const handleremoveTransaction = (transaction) => {
        showConfirmModal({
            autoClose: true,
            title: 'Delete',
            message: `Do you want
            isFiltering,
            updateFilter, to delete <b>${transaction.description}</b>`,
            confirmColor: 'danger',
            confirmText: 'Delete',
            onConfirm: async () => {
                await showLoadingModal(true);
                try {
                    await removeTransaction(transaction);
                    showToast({ message: 'Deleted', color: 'danger' });
                } catch (error) { console.log(error) }
                await showLoadingModal(false);

            }
        })
    }

    const handleExportTransactions = () => {
        if(transactions.length <= 0){
            showToast({message: 'There are no selected transactions', color: 'danger'});
            return;
        }

        showOptionsModal({
            autoClose: true,
            title: 'Export',
            options: [{ id: 'json', value: 'Export JSON' }, { id: 'csv', value: 'Export CSV' }],
            onConfirm: (id) => {
                try {
                    if (id === 'json') {downloadJSON(transactions);}
                    else if(id === 'csv') {downloadCSV(transactions);}
                } catch (error) { showToast({message: 'Something went wrong', color: 'danger'}); }
            }
        })
    }

    return (<Navbar
        page="transactions"
        actions={<button className="btn border-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#mobile-transaction-filter">
            <i className="fa-solid fa-filter"></i>
        </button>}>
        <div className="row py-lg-3 h100">

            {/* List */}
            <div className="col-12 col-lg-9 h100 mb-3">
                {isFiltering && <div className="card border-0 shadow h100 of-auto"><Loading /></div>}

                {!isFiltering && <div className="card border-0 shadow h100 of-auto">
                    <ul className="list-group list-group-flush transactions-table">
                        {/* Table Header */}
                        <li className="list-group-item transactions-table-header bg-body-tertiary">
                            <div className="row fw-semibold fs-md ">
                                <div className="col-12 col-lg-3">Category</div>
                                <div className="col-12 col-lg">Date</div>
                                <div className="col-12 col-lg">Payment Method</div>
                                <div className="col-12 col-lg-3">Description</div>
                                <div className="col-12 col-lg">amount</div>
                            </div>
                        </li>

                        {/* Items List */}
                        {transactions.map((transaction) =>
                            <li
                                key={transaction.id}
                                className="list-group-item list-group-item-action"
                                onClick={() => handleUpdateTransaction(transaction)}>
                                <div className="row fs-md">
                                    <div className="col-12 col-lg-3">
                                        <div className="d-flex justify-content-start align-items-center">
                                            <div><i
                                                className={`fa-solid ${categories.find((cat) => cat.name.includes(transaction.category))?.icon}`}
                                                style={{ color: categories.find((cat) => cat.name.includes(transaction.category))?.color }}></i></div>
                                            <div className="ms-2">{transaction.category}</div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-lg text-truncate">{formatDate(transaction.date)} | {formatTime(transaction.date)}</div>
                                    <div className="col-12 col-lg">{transaction.paymentMethod}</div>
                                    <div className="col-12 col-lg-3 text-truncate">{transaction.description}</div>
                                    <div className={`col-12 col-lg fw-semibold text-${transaction.cashflow === 'income' ? 'success' : 'danger'}`}>{formatCurrency(transaction.amount)}</div>
                                </div>
                            </li>)}

                    </ul>
                </div>}
            </div>

            {/* Filter For Large screens */}
            <div className="d-none d-lg-flex flex-column col-12 col-lg-3 mb-3 h100 d-flex flex-column ">
                <TransactionFilter
                    filter={filter}
                    transactions={transactions}
                    setFilter={updateFilter}
                    handleNewTransaction={handleNewTransaction}
                    handleExportTransactions={handleExportTransactions}
                />
            </div>
        </div>

        {/* Filter For Small And Medium screens */}
        <div className="offcanvas offcanvas-end p-3" tabIndex="-1" id="mobile-transaction-filter" data-bs-backdrop="false">
            <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasLabel">Filter</h5>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            
            <TransactionFilter
                filter={filter}
                transactions={transactions}
                setFilter={updateFilter}
                handleNewTransaction={handleNewTransaction}
                handleExportTransactions={handleExportTransactions}
            />
        </div>


    </Navbar >);
}

export default TransactionsPage;