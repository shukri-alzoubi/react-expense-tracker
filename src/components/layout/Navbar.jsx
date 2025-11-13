import { useAuth } from "../../context/Auth.context";
import { useNotifier } from "../../context/Notifier.context";
import Loading from "../ui/Loading";
import Sidenav from "./Sidenav";

const Navbar = ({ page, isLoading = false, children, actions }) => {

    const { user, logout } = useAuth();
    const { showConfirmModal } = useNotifier();

    const handleSignOut = async () => {
        showConfirmModal({
            autoClose: true,
            title: 'Sign Out!',
            message: 'Do you want to sign out?',
            confirmColor: 'danger',
            confirmText: 'Sign Out',
            onConfirm: async () => {
                await logout();
            }
        })
    }

    return (<>
        {/* Mobile */}
        {/* ============================== */}
        <div className="d-flex flex-column d-lg-none h-100">
            <nav className="navbar bg-body">
                {user && <div className="container-fluid">
                    <button className="btn  border-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#mobile-nav">
                        <i className="fa-solid fa-bars fa-lg"></i>
                    </button>

                    <div className="ms-auto">
                        {actions}
                    </div>
                </div>}
            </nav>

            {/* Children */}
            <div className={`flex-grow-1 of-auto container-fluid py-3`}>
                {!isLoading && children}
                {isLoading && <Loading />}
            </div>

            {user && <div className="offcanvas offcanvas-start p-3" tabIndex="-1" id="mobile-nav" data-bs-backdrop="false">
                <Sidenav user={user} page={page} handleSignOut={handleSignOut} actions={<button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>} />
            </div>}

        </div>

        {/* Big screens */}
        {/* ============================== */}
        <div className="container-fluid d-none d-lg-block">
            <div className="row">

                {/* Sidenav */}
                {user && <div className="d-none d-lg-block col-12 col-lg-3 col-xl-3 h-100 p-3">
                    <div className="card border-0 shadow-sm p-3 h100">
                        <Sidenav user={user} page={page} handleSignOut={handleSignOut} />
                    </div>
                </div>}



                {/* Children */}
                <div className={`col-12 ${user ? 'col-lg-9' : 'col-lg-12'} h-100 of-auto`}>
                    {!isLoading && children}
                    {isLoading && <Loading />}
                </div>
            </div>
        </div>


    </>);
}

export default Navbar;
