const Loading = () => {
    return (<>
        <div className="h100 loading-container d-flex justify-content-center align-items-center">
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    </>);
}

export default Loading;