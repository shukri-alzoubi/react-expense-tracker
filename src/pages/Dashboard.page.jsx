import { useEffect, useMemo, useState } from "react";
import SummaryCard from "../components/dashboard/SummaryCard";
import TransactionList from "../components/dashboard/TransactionList";
import Navbar from "../components/layout/Navbar";
import { useTransaction } from "../hooks/useTransaction";
import Charts from "../components/dashboard/Charts";
import { claculateAmounts, getMonthRange } from "../utils/helper";
import months from '../data/months.json'

const DashboardPage = () => {

    const { transactions, allTransactions, updateFilter, filter } = useTransaction();
    const [selectedMonth, setMonth] = useState(new Date().getMonth());

    useEffect(() => {
        updateFilter({ ...filter, dateRange: getMonthRange(selectedMonth) });

        // eslint-disable-next-line
    }, [allTransactions, selectedMonth]);

    const amounts = useMemo(() => claculateAmounts(transactions ?? []), [transactions]);

    return (<>
        <Navbar page="dashboard">
            <div className="container-fluid py-lg-4 d-flex flex-column h100 pb-4">

                {/* Summary */}
                <div className="row g-3 mb-4">
                    <div className="col-md-4">
                        <SummaryCard
                            title="Total Income"
                            value={amounts.income}
                            icon="fa-solid fa-arrow-trend-up"
                            color="success"
                        />
                    </div>

                    <div className="col-md-4">
                        <SummaryCard
                            title="Total Expense"
                            value={amounts.expense}
                            icon="fa-solid fa-arrow-trend-down"
                            color="danger"
                        />
                    </div>

                    <div className="col-md-4">
                        <SummaryCard
                            title="Balance"
                            value={amounts.wallet}
                            icon="fa-solid fa-wallet"
                            color="primary"
                        />
                    </div>

                    {/* Month Filter */}
                    <div className="col-12 mb-3 mt-5">
                        <div className="flex-grow-1 d-flex justify-content-center of-x-auto">
                            {months.map((tab) =>
                                <span
                                    key={tab.key}
                                    onClick={() => setMonth(tab.key)}
                                    className={`rounded-pill px-3 py-1 ${tab.key === selectedMonth ? 'text-bg-primary' : 'bg-body-tertiary'} fs-sm mx-1 pointer`}>
                                    <span>{tab.value}</span>
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Summary Charts */}
                    <div className="col-12">
                        <Charts transactions={transactions} />
                    </div>

                    <div className="col-12 mb-3"><hr /></div>

                    {/* Weekly Transactions */}
                    <div className="col-12">
                        <TransactionList transactions={transactions} />
                    </div>
                </div>
            </div>
        </Navbar>
    </>);
}

export default DashboardPage;