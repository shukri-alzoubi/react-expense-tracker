import { Pie, Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

export default function Charts({ transactions }) {
    const income = transactions.filter((t) => t.cashflow === "income");
    const expense = transactions.filter((t) => t.cashflow === "expense");

    // Pie chart data: Income vs Expense
    const pieData = {
        labels: ["Income", "Expense"],
        datasets: [
            {
                data: [
                    income.reduce((sum, t) => sum + t.amount, 0),
                    expense.reduce((sum, t) => sum + t.amount, 0),
                ],
                backgroundColor: ["#198754", "#dc3545"],
                borderWidth: 0,
            },
        ],
    };

    // Bar chart data: Total by category
    const categories = [
        ...new Set(transactions.map((t) => t.category || "Uncategorized")),
    ];
    const categoryTotals = categories.map((cat) =>
        transactions
            .filter((t) => t.category === cat)
            .reduce((sum, t) => sum + t.amount, 0)
    );

    const barData = {
        labels: categories,
        datasets: [
            {
                label: "Total by Category ($)",
                data: categoryTotals,
                backgroundColor: "#0d6efd99",
                borderColor: "#ffffff",
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="row">

            <div className="col-12 col-lg-6 mb-3">
                <div className="card border-0 shadow h-40 mb-3 p-3">
                    <div>
                        <Pie className="mx-auto h-30" data={pieData} />
                    </div>
                    <div className="py-3 text-center">Income vs Expense</div>
                </div>
            </div>

            
            <div className="col-12 col-lg-6 mb-3">
                <div className="card border-0 h-40 shadow mb-3 p-4">
                    <div >
                        <Bar className="h-30" data={barData} />
                    </div>
                    <div className="py-3 text-center">Spending by Category</div>
                </div>
            </div>



        </div>
    );
}
