import { useState } from "react";
import Navbar from "../../components/layout/Navbar";
import LoginForm from "../../components/forms/Login.form";
import SignUpForm from "../../components/forms/SignUp.form";
import { useAuth } from "../../context/Auth.context";
import { useNotifier } from "../../context/Notifier.context";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {

    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const [activeForm, setActiveForm] = useState('login');
    const [error, setError] = useState('');

    const { login, signUp, googleSignIn, sendPasswordReset } = useAuth();
    const { showTextModal, showToast, showLoadingModal } = useNotifier();

    // Toggle Active Form
    const toggleActiveForm = () => setActiveForm((prev) => prev === 'login' ? 'signUp' : 'login');

    // Demo Mode Sign In
    const handleDemoMode = async ()=>{
        setLoading(true);
        try {
            await login('demo@demo.com', 'Demo1234');
        } catch (error) {
            setError(error.message);
        }
        setLoading(false);
    }

    // Login Using Firebase Auth
    const handleLogin = async (data) => {
        setLoading(true);
        try {
            await login(data.email, data.password);
        } catch (error) {
            setError(error.message);
        }
        setLoading(false);
    }

    // Create A New User Using Firebase Auth
    const handleSignUp = async (data) => {
        setLoading(true);
        try {
            await signUp(data.email, data.password);
        } catch (error) {
            setError(error.message);
        }
        setLoading(false);
    }

    // Handle Form And Register Errors
    const handleError = (error) => {
        setError(error ?? '')
    }

    // Send A Password Reset Lisk To Email
    const handleForgetPassword = () => {
        showTextModal({
            autoClose: true,
            title: 'Forget Password!',
            placeholder: 'Enter your email address',
            confirmText: 'Reset',
            attributes: { required: true, type: 'email' },
            icon: (<i className="fa-solid fa-envelope"></i>),
            onConfirm: async (value) => {
                await showLoadingModal(true);
                try {
                    await sendPasswordReset(value);
                    showToast({ message: 'A password rest link was sent to your email address', color: 'success' });
                } catch (error) {
                    showToast({ message: 'Something went wrong, try again later.', color: 'danger' });
                }
                await showLoadingModal(false);
            }
        })
    }

    // Login or Sign Up With Google Credentials
    const handleGoogleSignIn = async () => {
        try {
            await googleSignIn();
        } catch (error) {
            setError('something went wrong');
        }
    }

    return (<>
        <Navbar isLoading={isLoading}>
            <div className="h100 d-flex flex-column justify-content-center align-items-center">
                <div className="card shadow-sm p-3" style={{ width: '400px' }}>

                    <div className="d-flex justify-content-between align-items-center mb-5 ">
                        <div className="fs-5 fw-semibold">{activeForm === 'login' ? 'Login' : 'Sign Up'}</div>
                        <div><i onClick={() => navigate('/')} className="fa-solid fa-home fa-lg pointer"></i></div>
                    </div>

                    {activeForm === 'login' && <LoginForm onSubmit={handleLogin} onError={handleError} onForgetPassword={handleForgetPassword} />}
                    {activeForm === 'signUp' && <SignUpForm onSubmit={handleSignUp} onError={handleError} />}

                    <div className="form-text text-center text-danger">{error}</div>

                    <hr />



                    <div className="text-center fw-300 mb-4 fa-sm">
                        {activeForm === 'login' ? <span>Don't Have An Account?</span> : <span>Already Have An Account?</span>}
                        <span
                            onClick={toggleActiveForm}
                            className="link-primary text-decoration-none fw-bold ms-1 pointer">
                            {activeForm === 'login' ? 'Sign Up' : 'Login'}
                        </span>
                    </div>

                    <div className="text-center">
                        <button type="button" className="btn border-0" onClick={handleGoogleSignIn}>
                            <i className="fa-brands fa-google-plus-g text-danger fa-xl"></i>
                        </button>
                    </div>
                </div>
                <div className="text-center">
                    <button type="button" className="btn link-primary border-0  fs-sm" onClick={handleDemoMode}>
                        Demo Mode
                    </button>
                </div>
            </div>
        </Navbar>
    </>);
}

export default RegisterPage;