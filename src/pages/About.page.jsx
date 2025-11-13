import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";

const AboutPage = () => {
    return (<>
        <Navbar page="about">
            <div className="container py-5">
                <div className="text-center mb-5">
                    <h2 className="fw-bold"><i className="fa-solid fa-wallet me-2"></i>About Expense Tracker</h2>
                    <p className="text-muted">Manage your finances with clarity, control, and confidence.</p>
                </div>

                <div className="border-bottom p-3 mb-4">
                    <div className="p-3">
                        <h5 className="card-title mb-3"><i className="fa-solid fa-gear me-2 text-primary"></i>Built With</h5>
                        <ul className="list-unstyled mx-3 fs-md">
                            <li className="mb-2"><i className="fa-solid fa-bolt text-warning me-2"></i><strong>Vite</strong> – Ultra-fast build tool for instant loading.</li>
                            <li className="mb-2"><i className="fa-brands fa-bootstrap text-primary me-2"></i><strong>Bootstrap 5</strong> – Clean, responsive, and modern UI framework.</li>
                            <li className="mb-2"><i className="fa-solid fa-gem text-info me-2"></i><strong>Font Awesome Icons</strong> – Beautiful icons for a polished design.</li>
                            <li className="mb-2"><i className="fa-solid fa-fire text-danger me-2"></i><strong>Firebase Auth</strong> – Secure and reliable user authentication.</li>
                            <li className="mb-2"><i className="fa-solid fa-database text-success me-2"></i><strong>Firebase Firestore</strong> – Real-time cloud data storage.</li>
                        </ul>
                    </div>
                </div>

                <div className="border-bottom p-3 mb-4">
                    <div className="p-3">
                        <h5 className="card-title mb-3"><i className="fa-solid fa-chart-pie me-2 text-success"></i>Dashboard</h5>
                        <p>
                            View your <strong>wallet balance</strong>, <strong>total income</strong>, and <strong>total expenses</strong> at a glance.
                            Track your monthly activity with:
                        </p>
                        <ul className="fs-md">
                            <li className="mb-2">📊 <strong>Pie chart</strong> showing <em>Expenses vs Income</em>.</li>
                            <li className="mb-2">📈 <strong>Bar chart</strong> displaying <em>Spending by Category</em>.</li>
                            <li className="mb-2">🧾 <strong>Transaction list</strong> for the current month.</li>
                        </ul>
                        <p className="text-muted mb-0"><i className="fa-solid fa-circle-info me-2"></i>Categories are fixed within the app for consistency.</p>
                    </div>
                </div>

                <div className="border-bottom p-3 mb-4">
                    <div className="p-3">
                        <h5 className="card-title mb-3"><i className="fa-solid fa-money-check-dollar me-2 text-warning"></i>Transactions</h5>
                        <ul className="fs-md">
                            <li className="mb-2">Filter by date, type, or category.</li>
                            <li className="mb-2">Track real-time wallet updates.</li>
                            <li className="mb-2">Export data to CSV for reports or backups.</li>
                        </ul>
                    </div>
                </div>

                <div className="border-bottom p-3 mb-4">
                    <div className="p-3">
                        <h5 className="card-title mb-3"><i className="fa-solid fa-sliders me-2 text-secondary"></i>Settings</h5>
                        <ul className="fs-md">
                            <li className="mb-2">Update profile info and toggle light/dark theme.</li>
                            <li className="mb-2">Import, export, or delete data anytime.</li>
                            <li className="mb-2">Manage your account: sign out or delete it securely.</li>
                        </ul>
                    </div>
                </div>

                <div className="p-3 mb-4">
                    <div className="p-3">
                        <h5 className="card-title mb-3"><i className="fa-solid fa-file-lines me-2 text-info"></i>Additional Pages</h5>
                        <ul className="fs-md">
                            <li className="mb-2"><strong>About Page</strong> – Learn more about the app and its features.</li>
                            <li className="mb-2"><strong>Privacy Policy</strong> – Understand how your data is protected.</li>
                            <li className="mb-2"><strong>Contact Page</strong> – Reach out for help or feedback.</li>
                        </ul>
                    </div>
                </div>

                {/* Our Goal Section */}
                <div className="text-center mt-5">
                    <h6 className="fw-bold">Our Goal</h6>
                    <p className="text-muted">
                        To make personal finance simple, organized, and insightful — giving you complete control over your money.
                    </p>
                    <p className="text-secondary mb-0">Version <strong>v1.0.0</strong> • Built with 💙 using React, Vite, and Firebase</p>
                </div>

                <Footer />
            </div>
        </Navbar>
    </>);
}

export default AboutPage;

