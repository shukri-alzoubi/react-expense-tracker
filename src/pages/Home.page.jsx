import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth.context";
import { useEffect } from "react";
import Footer from "../components/layout/Footer";
import { useTheme } from "../context/Theme.context";

const HomePage = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        // if (user) navigate('/dashboard')

        // eslint-disable-next-line
    }, [])

    return (<>
        <div className="landing-page">

            {/* Navbar */}
            <div className="container-fluid py-3">
                <div className="row">

                    <div className="col-12 col-lg-4 text-center text-lg-start mb-3 mb-lg-0">
                        <a className="navbar-brand fs-5" href="/">
                            <i className="fa-solid fa-wallet text-warning"></i>
                            <span className="text-warning">E</span><span>Tracker</span>
                        </a>
                    </div>

                    <div className="col-12 col-lg-4">
                        <div className="d-flex justify-content-center align-items-center mb-3 mb-lg-0">
                            <ul className="list-inline fs-md">
                                <li className="list-inline-item mx-3 px-1 pb-1 border-2 border-bottom">
                                    <a className="nav-link" aria-current="page" href="#home">Home</a>
                                </li>
                                <li className="list-inline-item mx-3 pb-1">
                                    <a className="nav-link" href="#features">Features</a>
                                </li>
                                <li className="list-inline-item mx-3 pb-1">
                                    <a className="nav-link" href="#about">About</a>
                                </li>
                                <li className="list-inline-item mx-3 pb-1">
                                    <a className="nav-link" href="#contact">Contact</a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="col-12 col-lg-4 text-center text-lg-end">
                        <button className="btn btn-sm text-bg-emphasis rounded-0 border-0 me-2" onClick={toggleTheme}>
                            {theme === 'light' ? 'Dark' : 'Light'} Theme
                        </button>
                        <a href="/register" className="btn btn-sm btn-outline-warning rounded-0 mx-1">
                            {user ? 'Dashboard' : 'Register'}
                        </a>
                    </div>
                </div>
            </div>



            <div className="container-fluid">
                <div className="row">

                    {/* Home Section */}
                    <section className="py-5 text-body-emphasis">
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col-lg-6 mb-4 mb-lg-0">
                                    <h1 className="display-4 fw-bold mb-3">
                                        Manage Your <br /> Expenses Easily <br /> With <i className="fa-solid fa-wallet text-warning"></i><span className="text-warning">E</span>Tracker
                                    </h1>
                                    <div className="">
                                        <ul>
                                            <li className="mb-2">
                                                Take control of your finances with ease.
                                            </li>
                                            <li className="mb-2">
                                                Track your expenses and income in real time.
                                            </li>
                                            <li className="mb-2">
                                                Visualize your spending with charts and categories.
                                            </li>
                                            <li className="mb-2">
                                                Stay organized and make smarter financial decisions.
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="col-lg-6 text-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 600 400"
                                        width="100%"
                                        height="100%"
                                        className="text-body-emphasis"
                                    >
                                        {/* Background (subtle tint that adapts) */}
                                        <rect width="600" height="400" rx="20" fill="currentColor" opacity="0.05" />

                                        {/* Phone body */}
                                        <rect x="200" y="60" width="200" height="280" rx="25" fill="currentColor" opacity="0.15" />
                                        <rect x="220" y="80" width="160" height="240" rx="20" fill="currentColor" opacity="0.05" />

                                        {/* Chart bars */}
                                        <rect x="250" y="220" width="20" height="60" fill="currentColor" opacity="0.35" rx="4" />
                                        <rect x="280" y="190" width="20" height="90" fill="currentColor" opacity="0.45" rx="4" />
                                        <rect x="310" y="160" width="20" height="120" fill="currentColor" opacity="0.55" rx="4" />
                                        <rect x="340" y="200" width="20" height="80" fill="currentColor" opacity="0.65" rx="4" />

                                        {/* Coins */}
                                        <circle cx="430" cy="270" r="22" fill="currentColor" opacity="0.35" />
                                        <circle cx="430" cy="245" r="18" fill="currentColor" opacity="0.25" />
                                        <circle cx="430" cy="225" r="15" fill="currentColor" opacity="0.15" />

                                        {/* Wallet */}
                                        <rect x="120" y="240" width="120" height="90" rx="15" fill="currentColor" opacity="0.3" />
                                        <rect x="135" y="255" width="90" height="60" rx="10" fill="currentColor" opacity="0.1" />
                                        <circle cx="205" cy="285" r="6" fill="currentColor" opacity="0.6" />
                                    </svg>

                                </div>

                            </div>
                        </div>
                    </section>


                    {/* Features */}
                    <section id="features" className="py-5 bg-body-tertiary">
                        <div className="container">
                            <div className="text-center mb-5">
                                <h2 className="fw-bold">
                                    <i className="fa-solid fa-gear me-2"></i>Powerful Features
                                </h2>
                                <p className="text-muted">Everything you need to manage your money efficiently.</p>
                            </div>

                            <div className="row g-4">
                                {/* Dashboard Feature */}
                                <div className="col-md-4">
                                    <div className="card h100 shadow-sm border-0">
                                        <div className="card-body text-center">
                                            <i className="fa-solid fa-chart-pie fa-2x mb-3 text-primary"></i>
                                            <h5 className="card-title fw-bold">Dashboard Overview</h5>
                                            <p className="card-text">
                                                See your wallet, expenses, and income in one view — with real-time charts for monthly spending and earnings.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Transactions Feature */}
                                <div className="col-md-4">
                                    <div className="card h100 shadow-sm border-0">
                                        <div className="card-body text-center">
                                            <i className="fa-solid fa-money-check-dollar fa-2x mb-3 text-success"></i>
                                            <h5 className="card-title fw-bold">Transactions & Filters</h5>
                                            <p className="card-text">
                                                Log, filter, and export transactions easily. Built-in CSV export keeps your data portable and organized.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Settings Feature */}
                                <div className="col-md-4">
                                    <div className="card h100 shadow-sm border-0">
                                        <div className="card-body text-center">
                                            <i className="fa-solid fa-sliders fa-2x mb-3 text-warning"></i>
                                            <h5 className="card-title fw-bold">Personalized Settings</h5>
                                            <p className="card-text">
                                                Update your profile, switch themes, import/export data, and manage your account — all from one place.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>


                    {/* About */}
                    <section id="about" className="py-5">
                        <div className="container">
                            <div className="row align-items-center">

                                {/* Left Side: Text */}
                                <div className="col-lg-6 mb-4 mb-lg-0">
                                    <h2 className="fw-bold mb-3">
                                        <i className="fa-solid fa-circle-info me-2"></i>About Expense Tracker
                                    </h2>
                                    <p className="mb-3">
                                        Expense Tracker is a simple yet powerful web app designed to help you stay in control of your money.
                                        Built with <strong>Vite</strong>, <strong>Bootstrap</strong>, and <strong>Font Awesome</strong>, it delivers a fast, responsive, and intuitive experience.
                                    </p>
                                    <p className="mb-3">
                                        With <strong>Firebase Authentication</strong> and <strong>Firestore</strong> at its core, your data is securely stored in the cloud and accessible anywhere — no setup required.
                                    </p>
                                    <p className="mb-3">
                                        You can easily manage your wallet, visualize monthly spending, and analyze your income through dynamic charts and categorized transactions.
                                    </p>
                                    <p className="mb-3">
                                        Whether you’re budgeting for personal goals or tracking day-to-day expenses, Expense Tracker keeps your financial life organized and insightful.
                                    </p>
                                </div>

                                {/* Right Side: Illustration */}
                                <div className="col-lg-6 text-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 600 400"
                                        width="100%"
                                        height="100%"
                                    >
                                        <rect width="600" height="400" rx="20" fill="#0d6efd10" />

                                        {/* Wallet */}
                                        <rect x="150" y="180" width="300" height="160" rx="20" fill="#0d6efd" />
                                        <rect x="170" y="200" width="260" height="120" rx="15" fill="#ffffff" />
                                        <circle cx="380" cy="260" r="10" fill="#0d6efd" />

                                        {/* Coin stack */}
                                        <circle cx="480" cy="150" r="25" fill="#ffc107" />
                                        <circle cx="480" cy="125" r="20" fill="#ffcd39" />
                                        <circle cx="480" cy="100" r="15" fill="#ffe082" />

                                        {/* Chart bars */}
                                        <rect x="200" y="130" width="30" height="50" fill="#198754" rx="5" />
                                        <rect x="250" y="100" width="30" height="80" fill="#0dcaf0" rx="5" />
                                        <rect x="300" y="80" width="30" height="100" fill="#6610f2" rx="5" />
                                    </svg>
                                </div>

                            </div>
                        </div>
                    </section>


                    {/* Contact */}
                    <section id="contact" className="pt-5 bg-body-tertiary">
                        <div className="container">
                            <div className="row align-items-center">

                                {/* Left : Contact */}
                                <div className="col-lg-6">
                                    <div className="p-3">
                                        <h5 className="mb-3">
                                            <i className="fa-solid fa-message me-2"></i>Send Us a Message
                                        </h5>
                                        <p className="text-muted">Fill out the form below and we’ll get back to you as soon as possible.</p>
                                        <div className="mb-3 p-3">

                                            <form>

                                                <div className="mb-3">
                                                    <div className="input-group custom bg-body">
                                                        <div className="input-group-text"><i className="fa-solid fa-user"></i></div>
                                                        <input type="text" className="form-control" placeholder="Enter your name" />
                                                    </div>
                                                </div>

                                                <div className="mb-3">
                                                    <div className="input-group custom bg-body">
                                                        <div className="input-group-text"><i className="fa-solid fa-at"></i></div>
                                                        <input type="email" className="form-control" placeholder="Enter your email" />
                                                    </div>
                                                </div>

                                                <div className="mb-3">
                                                    <div className="input-group custom bg-body">
                                                        <textarea className="form-control" rows="4" placeholder="Type your message here"></textarea>
                                                    </div>
                                                </div>

                                                <button type="button" className="btn btn-primary w-100">
                                                    <i className="fa-solid fa-paper-plane me-2"></i>Send Message
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </div>

                                {/* Right : Contact */}
                                <div className="col-lg-6 text-center">
                                    <Footer />
                                </div>



                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </>);
}

export default HomePage;