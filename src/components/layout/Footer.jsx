import socialLinks from '../../data/social_links.json'

const Footer = () => {
    return (<>
        {/* Social Links */}
        <div className="text-center mt-5 pb-4">
            <h6 className="fw-bold mb-3">Connect With Us</h6>
            <div className="d-flex justify-content-center gap-4">
                {socialLinks.map((link) => 
                <a key={link.key} href={link.path}
                    className={`text-decoration-none text-body-emphasis ${link.color}`}
                    target="_blank"
                    rel="noopener noreferrer">
                    <i className={`${link.icon} fa-lg`}></i>
                </a>)}
            </div>
            <p className="text-muted small mt-3 mb-0">
                © {new Date().getFullYear()} Expense Tracker. All rights reserved.
            </p>
        </div>
    </>);
}

export default Footer;