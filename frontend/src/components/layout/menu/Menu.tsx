import { NavLink } from "react-router-dom";
import "./Menu.css";
import { useEffect, useState } from "react";
import { authStore } from "../../../redux/AuthState";

function Menu(): JSX.Element {

    const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);  // we init this in false
        // because we want to forbidden access to everything accept login/signup if the user hasn't logged in.

        useEffect(() => {
            setIsUserLoggedIn(authStore.getState().token !== '');  // true/false 
            // other way:
            // const flag: boolean = authStore.getState().token !== ''; // true/false
            // setIsUserLoggedIn(flag);  

            const unsubscribe = authStore.subscribe(() => {
                setIsUserLoggedIn(authStore.getState().token !== '');
            })
            
            return unsubscribe;
        }, [])

    return (
        <div className="Menu">
            {/* <NavLink className="navBar" to="/home">Home</NavLink> */}
            {/* only when the user logged in he can access the vacations: */}
            {/* {isUserLoggedIn && <NavLink to="/vacations">Vacations</NavLink>} */}
            {/* <NavLink className="navBar" to="/vacations">Vacations</NavLink> */}
            {/* <NavLink className="navBar" to="/vacations/add">Add Vacation</NavLink> */}
            {/* <NavLink className="navBar" to="/vacations/report">Report</NavLink> */}
            {/* <NavLink className="navBar" to="/about">About</NavLink> */}
            <div className="container">
                <nav className="navbar navbar-expand-lg bg-body-tertiary">
                    <div className="container-fluid">
                        <NavLink className="navbar-brand" to="/home">Home</NavLink>
                        <NavLink className="navbar-brand active" to="/vacations">Vacations</NavLink>
                        <NavLink className="navbar-brand" to="/vacations/add">Add Vacation</NavLink>
                        <NavLink className="navbar-brand" to="/vacations/report">Report</NavLink>
                        <NavLink className="navbar-brand" to="/about">About</NavLink>
                    </div>
                </nav>
            </div>
        </div>
    );
}

export default Menu;
