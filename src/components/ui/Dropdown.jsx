const Dropdown = ({ label, children }) => {
    return (<>
        <div className="dropdown custom text-start">
            <button className="btn bg-grey rounded bg-body-tertiary btn-sm border-0 w-100 text-start" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                <div className="d-flex justify-content-between align-items-center">
                    {label}
                    <i className="fa-solid fa-caret-down text-muted"></i>
                </div>
            </button>

            <ul className="dropdown-menu fs-md w-100" aria-labelledby="dropdownMenuButton">
                {children}
            </ul>
        </div>
    </>);
}

export default Dropdown;