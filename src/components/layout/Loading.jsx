const LoadingPage = ({color, message = '', className = ''}) => {

    return ( <>
       <div className={`w-100 h100 d-flex justify-content-center align-items-center ${className}`}>
            <div className="progress-container">
                <div className="d-block w-100">
                    <div className="text-center mb-5">
                        <i className={`fa-solid fa-wallet text-${color} opacity-50 glow fa-7x`}></i>
                    </div>
                    <div className="progress mb-3" role="progressbar" aria-label="Animated striped example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                        <div className={`progress-bar progress-bar-striped bg-${color ?? 'secondary'} opacity-50 progress-bar-animated`} style={{width: '100%'}}></div>
                    </div>

                    <div className="text-center text-secondary">{message}</div> 
                </div>
            </div>
       </div>
    </> );
}
 
export default LoadingPage;