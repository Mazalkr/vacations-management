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
                <label className="form-label">Email:</label> 
                <input className="form-control" type="email" {...register('email')}/> 
                <label className="form-label">Password:</label> 
                <input className="form-control" type="password" {...register('password')}/> 
                <button className="btn btn-primary">Login</button>
            </form>
            <div className="navLink">
                don't have account?
                <NavLink to="/signup"> Sign Up</NavLink>
            </div>
			
        </div>
    );
}

export default Login;