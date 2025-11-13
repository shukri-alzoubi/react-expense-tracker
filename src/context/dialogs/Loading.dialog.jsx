export const LoadingDialog = ({color = 'primary'}) => {
    return (<div className="d-flex justify-content-center align-items-center w-100">
        <div className="card aspect-1 p-4 opacity-75">
            <div className={`spinner-border text-${color} custom-spinner`} role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    </div>)
}