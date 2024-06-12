import { useForm } from "react-hook-form";
import "./Login.css";
import { NavLink, useNavigate } from "react-router-dom";
import LoginModel from "../../../models/LoginModel";
import notify from "../../../services/Notify";
import auth from "../../../services/Auth";
import { useEffect } from "react";
import { authStore } from "../../../redux/AuthState";

function Login(): JSX.Element {

    const { register, handleSubmit } = useForm<LoginModel>();

    const navigate = useNavigate();

    async function submitLoginData(loginModel: LoginModel): Promise<void> {
        try {
            await auth.login(loginModel);
            notify.success('You have been successfully logged in');
            navigate('/vacations');
        } catch (err) {
            notify.error(err);
        }
    }

    // Limit from the user to login again:
    useEffect(() => {
        const token = authStore.getState().token;
        if(token) {
            notify.error('You are already logged in');  
            navigate('/vacations');
        }
    }, [])

    return (
        <div className="Login">
            <h2>Login:</h2>
            <form onSubmit={handleSubmit(submitLoginData)}>
                <label>Email:</label> 
                <input type="email" {...register('email')}/> 
                <label>Password:</label> 
                <input type="password" {...register('password')}/> 
                <button>Login</button>
            </form>
            <div>
                don't have account?
                <NavLink to="/signup">Sign Up</NavLink>
            </div>
			
        </div>
    );
}

export default Login;
