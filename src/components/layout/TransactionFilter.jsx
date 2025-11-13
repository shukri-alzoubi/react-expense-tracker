import { useMemo } from "react";
import { claculateAmounts, formatCurrency } from "../../utils/helper";
import Select from "../ui/Select";
import categories from '../../data/categories.json';
import paymentMethods from '../../data/payment_methods.json';
import DateGroup from "../ui/DateGroup";

/**
 * 
 * @param {Object} obj
 * @param {import('../../models/TransactionFilter.model').TransactionFilterModel} obj.filter
 * @param {Array<import('../../models/Transaction.model').Transaction>} obj.transactions
 * @param {(data: import('../../models/TransactionFilter.model').TransactionFilterModel) => void} obj.setFilter
 * @param {() => void} obj.handleNewTransaction
 * @param {() => void} obj.handleExportTransactions
 * @returns 
 */
const TransactionFilter = ({
    filter,
    transactions,
    setFilter,
    handleNewTransaction,
    handleExportTransactions,
}) => {

    const amounts = useMemo(()=> claculateAmounts(transactions), [transactions])

    const toggleCashflow = (value) => {
        if (filter.cashflow.includes(value)) {
            setFilter({ ...filter, cashflow: filter.cashflow.filter((v) => v !== value) });
        } else {
            setFilter({ ...filter, cashflow: [...filter.cashflow, value] });
        }
    }

    const toggleCategory = (value) => {
        if (filter.categories.includes(value)) {
            setFilter({ ...filter, categories: filter.categories.filter((v) => v !== value) });
        } else {
            setFilter({ ...filter, categories: [...filter.categories, value] });
        }
    }

    const togglePaymentMethod = (value) => {
        if (filter.paymentMethods.includes(value)) {
            setFilter({ ...filter, paymentMethods: filter.paymentMethods.filter((v) => v !== value) });
        } else {
            setFilter({ ...filter, paymentMethods: [...filter.paymentMethods, value] });
        }
    }

    return (<>
        {/* Wallet */}
        <div className="card border-0 shadow p-2 mb-3">
            <div className="d-flex justify-content-between align-items-center">
                <div className="text-success mx-1 fs-4">{formatCurrency(amounts.wallet)}</div>
                <div><i className="fa-solid fa-wallet fs-3 text-secondary mx-1"></i></div>
            </div>
        </div>

        <div className="card border-0 shadow p-2 mb-3">
            {/* Income Amount */}
            <div className="d-flex justify-content-between align-items-center text-success">
                <div className="mx-1">{formatCurrency(amounts.income)}</div>
                <div><i className="fa-solid fa-arrow-trend-up mx-1"></i></div>
            </div>

            <hr className="my-1" />

            {/* Expense Amount */}
            <div className="d-flex justify-content-between align-items-center text-danger">
                <div className="mx-1">{formatCurrency(amounts.expense)}</div>
                <div><i className="fa-solid fa-arrow-trend-down mx-1"></i></div>
            </div>
        </div>

        <div className="card border-0 shadow p-2 flex-grow-1 of-auto">

            {/* Search By Description */}
            < div className="input-group custom bg-body-tertiary mb-3">
                <span className="input-group-text"><i className="fa-solid fa-magnifying-glass"></i></span>
                <input
                    value={filter?.search} onChange={(e) => setFilter({ ...filter, search: e.target.value })}
                    type="search" className="form-control fs-sm" placeholder="Find Transaction" />
                <span className="input-group-text fw-semibold">{transactions.length}</span>
            </div>

            <div className="d-flex">
                {/* Add A New Transaction */}
                <button className="btn btn-sm fs-sm btn-primary w-50 mx-1" onClick={handleNewTransaction}>
                    New
                </button>
                {/* Add A New Transaction */}
                <button className="btn btn-sm fs-sm btn-warning w-50 mx-1" onClick={handleExportTransactions}>
                    Export
                </button>
            </div>

            {/* Cashflow */}
            <div className="cashflow">
                <hr />
                <div >
                    <div className="text-muted fs-sm mb-3"><i className="fa-solid fa-dollar-sign"></i> Cashflow</div>
                    <div className="row fs-sm mx-1">
                        <div className="col-12 col-md-6 mb-2">
                            <i
                                onClick={() => toggleCashflow('expense')}
                                className={`${filter.cashflow.includes('expense') ? 'fa-solid fa-square-check' : 'fa-regular fa-square'} fs-md text-primary me-1 pointer`}></i>
                            Expense
                        </div>
                        <div className="col-12 col-md-6">
                            <i
                                onClick={() => toggleCashflow('income')}
                                className={`${filter.cashflow.includes('income') ? 'fa-solid fa-square-check' : 'fa-regular fa-square'} fs-md text-primary me-1 pointer`}></i>
                            Income
                        </div>

                    </div>
                </div>
            </div>

            {/* Category */}
            <div className="category">
                <hr />
                <div className="category-container" >

                    <div className="text-muted fs-sm mb-2 d-flex justify-content-between align-items-center">
                        <div><i className="fa-solid fa-layer-group"></i> Categories</div>

                        {/* Set Categories Button */}
                        <div className="d-flex">
                            {filter.categories.length > 0 &&
                                <button className="btn border-0 fs-sm" onClick={() => setFilter({ ...filter, categories: [] })}>
                                    <i className="fa-solid fa-close"></i>
                                </button>}

                            <Select
                                autoClose="outside"
                                className="border-0"
                                icon={<i className="fa-solid fa-chevron-down text-muted"></i>}
                                selected={filter.categories}
                                options={categories
                                    .filter((c) => (filter.cashflow.length === 0) || filter.cashflow.includes(c.type))
                                    .map((c) => ({ key: c.name, icon: 'fa-solid ' + c.icon, color: c.color, value: c.name }))}
                                onClick={(key) => toggleCategory(key)}
                            />
                        </div>
                    </div>

                    {/* Selected Categories */}
                    <div className="categories-container h-10 of-auto">
                        {filter.categories.length === 0 &&
                            <div className="h100 d-flex align-items-center justify-content-center text-body-tertiary fs-sm">No Filtered Categories</div>}

                        {categories
                            .filter((cat) => filter.categories.includes(cat.name))
                            .map((cat) =>
                                <span
                                    onClick={() => toggleCategory(cat.name)}
                                    key={cat.name}
                                    className="badge bg-body-tertiary text-body fw-light m-2 pointer">
                                    <i className={`fa-solid ${cat.icon} me-1`} style={{ color: cat.color }}></i> {cat.name}
                                    <i className="fa-solid fa-close ms-2 fa-sm"></i>
                                </span>)}
                    </div>
                </div>
            </div>


            {/* Payment Methods */}
            <div className="payment-method">
                <hr />
                <div >
                    <div className="text-muted fs-sm mb-3">
                        <div className="d-flex justify-content-between align-items-center">
                            <span><i className="fa-solid fa-comment-dollar"></i> Payment Method</span>

                            <button className="btn border-0 fs-sm" onClick={() => setFilter({ ...filter, paymentMethods: [] })}>
                                <i className="fa-solid fa-close"></i>
                            </button>
                        </div>
                    </div>
                    <div className="row fs-sm mx-1">

                        {paymentMethods.map((method) =>
                            <div key={method.key} className="col-12 col-md-6 mb-2">
                                <i
                                    onClick={() => togglePaymentMethod(method.key)}
                                    className={`${filter.paymentMethods.includes(method.key) ? 'fa-solid fa-square-check' : 'fa-regular fa-square'} fs-md text-primary me-1 pointer`}></i>
                                {method.key}
                            </div>)}

                    </div>
                </div>
            </div>

            {/* Date Range */}
            <div className="date-range">
                <hr />
                <div >
                    <div className="text-muted fs-sm mb-2">
                        <div className="d-flex justify-content-between align-items-center">
                            <span><i className="fa-solid fa-calendar"></i> Date Range</span>

                            <button className="btn border-0 fs-sm" onClick={() => setFilter({ ...filter, dateRange: null })}>
                                <i className="fa-solid fa-rotate-left"></i>
                            </button>
                        </div>
                    </div>

                    <div className="text-muted fs-sm mb-2"></div>
                    <div className="">
                        <div className="px-1">
                            <DateGroup
                                // withPortal
                                icon={<i className="fa-solid fa-calendar"></i>}
                                selected={filter.dateRange.start}
                                placeholder='Start Date'
                                onChange={(date) => setFilter({ ...filter, dateRange: { ...filter.dateRange, start: date } })}
                            />
                        </div>

                        <div className="px-1">
                            <DateGroup
                                // withPortal
                                icon={<i className="fa-solid fa-calendar"></i>}
                                selected={filter.dateRange.end}
                                placeholder='End Date'
                                onChange={(date) => setFilter({ ...filter, dateRange: { ...filter.dateRange, end: date } })}
                            />
                        </div>

                    </div>
                </div>
            </div>



            {/* Amount */}
            <div className="date-range">
                <hr />
                <div >
                    <div className="text-muted fs-sm mb-2">
                        <div className="d-flex justify-content-between align-items-center">
                            <span><i className="fa-solid fa-sort"></i> Amount</span>

                            <button className="btn border-0 fs-sm" onClick={() => setFilter({ ...filter, amountRange: null })}>
                                <i className="fa-solid fa-rotate-left"></i>
                            </button>
                        </div>
                    </div>


                    <div className="d-flex">
                        <div className="px-1">
                            {/* Min Amount */}
                            <div className="input-group custom bg-body-tertiary mb-3">

                                <span className="input-group-text">
                                    <i className="fa-solid fa-square-caret-down"></i>
                                </span>

                                <input
                                    value={filter?.amountRange.min} onChange={(e) => setFilter({ ...filter, amountRange: { ...filter.amountRange, min: e.target.value } })}
                                    type="number" min={0.2} className="form-control fs-sm" placeholder="Min" />

                            </div>
                        </div>

                        <div className="px-1">
                            {/* Max Amount */}
                            <div className="input-group custom bg-body-tertiary mb-3">
                                <span className="input-group-text"><i className="fa-solid fa-square-caret-up"></i></span>
                                <input
                                    value={filter?.amountRange.max} onChange={(e) => setFilter({ ...filter, amountRange: { ...filter.amountRange, max: e.target.value } })}
                                    type="number" min={6000} className="form-control fs-sm" placeholder="Max" />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </>);
}

export default TransactionFilter;