import { useNavigate } from "react-router-dom";
import ThemeToggle from "../ui/ThemeToggle";
import navlist from '../../data/navlist.json';
import { useTransaction } from "../../hooks/useTransaction";
import { claculateAmounts, formatCurrency } from "../../utils/helper";
import { useMemo } from "react";

const Sidenav = ({ user, page, handleSignOut, actions }) => {
    const navigate = useNavigate();
    const { allTransactions } = useTransaction();
    const walletAmount = useMemo(() => claculateAmounts(allTransactions), [allTransactions])

    return (<div className="d-flex flex-column justify-content-between h100">
        <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="fs-5 text-body">
                <i className="fa-solid fa-wallet text-warning"></i>
                <span className="text-warning">E</span><span>Tracker</span>
            </div>

            <div className="d-flex justify-content-end align-items-center">
                {actions}
            </div>


        </div>



        <div className="flex-grow-1 of-auto mb-3">
            <ul className="list-group list-group-flush border-0 rounded-0">
                {navlist.map((link) =>
                    <li
                        key={link.key} onClick={() => navigate(link.path)}
                        className="list-group-item list-group-item-action border-0 fs-md">
                        <span className={`text-${link.key.toLowerCase() === page?.toLowerCase() ? 'body' : 'body-tertiary'}`}>
                            <i className={`${link.icon} me-2`}></i>
                            {link.key}
                        </span>

                    </li>
                )}
            </ul>

            {(user.email === 'demo@demo.com') && <>
                <hr />
                <ul className="list-group list-group-flush border-0 rounded-0">
                    <li
                        onClick={() => handleSignOut()}
                        className="list-group-item list-group-item-action border-0 fs-m">
                        <span className={`text-danger`}>
                            <i className={`fa-solid fa-close me-2`}></i>
                            Exit Demo Mode
                        </span>

                    </li>
                </ul>
            </>}

        </div>

        <div className="d-flex justify-content-between align-items-center">
            <div className="text-success fa-lg d-flex align-items-center">
                {/* <span className="me-2">Balance</span> */}
                <i className="fa-solid fa-landmark me-2 "></i>
                <span>{formatCurrency(walletAmount.wallet ?? 0)}</span>
            </div>
            <div className="d-flex">
                <div className="mx-1">
                    <ThemeToggle className='nav-link mx-2' />
                </div>

                {user && <div>
                    <button className="btn text-danger nav-link mx-2 border-0" onClick={handleSignOut}>
                        <i className="fa-solid fa-arrow-right-from-bracket fa-lg"></i>
                    </button>
                </div>}
            </div>
        </div>
    </div>)
}

export default Sidenav;