import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";

const ContactPage = () => {
    return (<Navbar page='contact'>
        <div className="container py-5">
            <div className="text-center mb-4">
                <h2 className="fw-bold"><i className="fa-solid fa-envelope-open me-2"></i>Contact Us</h2>
                <p className="text-muted">We’re here to help. Reach out anytime.</p>
            </div>

            {/* Contact Information */}
            <div className="border-bottom p-3 mb-4">
                <h5 className="mb-3">
                    <i className="fa-solid fa-address-card me-2 text-primary"></i>Contact Information
                </h5>
                <p className="mb-1">
                    If you have questions, feedback, or need support with your Expense Tracker account, feel free to contact us.
                </p>
                <div className="p-3">
                    <ul className="list-unstyled mt-3">
                        <li className="mb-2">
                            <i className="fa-solid fa-envelope me-2 text-secondary"></i>
                            <strong>Email:</strong>{" "}
                            <a href="mailto:support@expensetracker.com">support@expensetracker.com</a>
                        </li>

                        <li className="mb-2">
                            <i className="fa-solid fa-globe me-2 text-success"></i>
                            <strong>Website:</strong>{" "}
                            <a href="https://expensetracker.com" target="_blank" rel="noopener noreferrer">
                                expensetracker.com
                            </a>
                        </li>

                        <li className="mb-2">
                            <i className="fa-solid fa-clock me-2 text-warning"></i>
                            <strong>Response Time:</strong> Within 24–48 hours
                        </li>
                    </ul>
                </div>
            </div>

            {/* Contact Form (Non-functional placeholder — optional) */}
            <div className="p-3 mb-4">
                <h5 className="mb-3">
                    <i className="fa-solid fa-message me-2 text-info"></i>Send Us a Message
                </h5>
                <p className="text-muted">Fill out the form below and we’ll get back to you as soon as possible.</p>
                <div className="col-12 col-lg-6 mb-3 p-3">

                    <form>

                        <div className="mb-3">
                            <div className="input-group custom bg-body-tertiary">
                                <div className="input-group-text"><i className="fa-solid fa-user"></i></div>
                                <input type="text" className="form-control" placeholder="Enter your name" />
                            </div>
                        </div>

                        <div className="mb-3">
                            <div className="input-group custom bg-body-tertiary">
                                <div className="input-group-text"><i className="fa-solid fa-at"></i></div>
                                <input type="email" className="form-control" placeholder="Enter your email" />
                            </div>
                        </div>

                        <div className="mb-3">
                            <div className="input-group custom bg-body-tertiary">
                                <textarea className="form-control" rows="4" placeholder="Type your message here"></textarea>
                            </div>
                        </div>

                        <button type="button" className="btn btn-primary w-100">
                            <i className="fa-solid fa-paper-plane me-2"></i>Send Message
                        </button>
                    </form>
                </div>
            </div>

            <Footer />
        </div>
    </Navbar>);
}

export default ContactPage;