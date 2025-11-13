const NotFoundPage = () => {
    return (<>
        <div className="d-flex justify-content-center align-items-center h-100 p-4">
            <div className="pb-5 mb-5 d-flex flex-column justify-content-center">
                <p style={{fontSize: '150px'}} className="mb-0">404</p>
                <div className="mb-2"><b className="fs-5">Oooooopps</b>, The page you are looking for was not found.</div>
                <div className="d-block">
                    <a href="/" className="link-secondary">Back to home</a>
                </div>
            </div>
        </div>
    </>);
}

export default NotFoundPage;