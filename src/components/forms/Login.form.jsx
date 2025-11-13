import { useState } from "react";
import { useForm } from "react-hook-form";

const LoginForm = ({ onSubmit, onForgetPassword, onError, }) => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [showPassword, setShowPassword] = useState(false);

    const { register, handleSubmit } = useForm();

    // Show/Hide Password
    const togglePassword = () => {
        setShowPassword((prev) => !prev);
    }

    // Handle Input Fields Errors
    const handleError = (errors)=>{
        onError(errors.email?.message ?? errors.password?.message)
    }

    return (<>

        <form onSubmit={handleSubmit(onSubmit, handleError)}>

            {/* Email */}
            <div className="input-group border-bottom mb-3">
                <div className="input-group-text bg-body border-0"><i className="fa-solid fa-at"></i></div>

                {/* Email Input */}
                <input
                    className="form-control border-0 shadow-none rounded-0"
                    value={email} onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    {...register("email", {
                        required: "Email is required",
                        pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email" },
                    })}
                />
            </div>

            {/* Password */}
            <div className="input-group border-bottom mb-2">
                <div className="input-group-text bg-body border-0"><i className="fa-solid fa-lock"></i></div>

                {/* Passowrd Input */}
                <input
                    type={showPassword ? "text" : 'password'}
                    value={password} onChange={(e) => setPassword(e.target.value)}
                    className="form-control border-0 shadow-none rounded-0"
                    placeholder="Password"
                    {...register("password", {
                        required: "Password is required",
                        minLength: { value: 6, message: "Password needs at least 6 characters" },
                    })} />

                <div className="input-group-text bg-body border-0 pointer" onClick={togglePassword}>
                    {!showPassword && <i className="fa-solid fa-eye"></i>}
                    {showPassword && <i className="fa-solid fa-eye-slash"></i>}
                </div>
            </div>

            {/* Forget PAssword Button */}
            <div className="text-end mb-3">
                <button type="button" className="btn border-0 link-primary fa-sm" onClick={onForgetPassword}>Forget Password!</button>
            </div>

            {/* Submit Form Button */}
            <button className="btn btn-sm btn-primary mb-3 w-100" type="submit">Login</button>
        </form>
    </>);
}

export default LoginForm;