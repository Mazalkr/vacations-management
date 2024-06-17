import { useForm } from "react-hook-form";
import "./Signup.css";
import SignupModel from "../../../models/SignupModel";
import notify from "../../../services/Notify";
import auth from "../../../services/Auth";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { authStore } from "../../../redux/AuthState";

function Signup(): JSX.Element {

    const { register, handleSubmit } = useForm<SignupModel>();

    const navigate = useNavigate();

    async function submitUserData(signupModel: SignupModel): Promise<void> {
        try {
            // service:
            await auth.signup(signupModel);
            notify.success('You have been successfully signed up');
            navigate('/vacations');
        } catch (err) {
            notify.error(err);
        }
    }

    useEffect(() => {
        const token = authStore.getState().token;
        if(token) {
            notify.error('You are already signed up');  // to show ' inside a string --> add before \
            navigate('/');
        }
    }, [])
    
    return (
        <div className="Signup">
            <h2>Signup:</h2>
            <form onSubmit={handleSubmit(submitUserData)}>
                <label className="form-label">First name:</label> 
                <input className="form-control" type="text" {...register('firstName')}/> 
                <label className="form-label">Last name:</label> 
                <input className="form-control" type="text" {...register('lastName')}/> 
                <label className="form-label">Email:</label> 
                <input className="form-control" type="email" {...register('email')}/> 
                <label className="form-label">Password:</label> 
                <input className="form-control" type="password" {...register('password')}/> 
                <button className="btn btn-primary">Sign Up</button>
            </form>
            <div className="navLink">
                already a member?
                <NavLink to="/login"> Login</NavLink>
            </div>
			
        </div>
    );
}

export default Signup;