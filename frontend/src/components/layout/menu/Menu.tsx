import { NavLink } from "react-router-dom";
import "./Menu.css";
import { useEffect, useState } from "react";
import { authStore } from "../../../redux/AuthState";

function Menu(): JSX.Element {

    const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);  

        useEffect(() => {
            setIsUserLoggedIn(authStore.getState().token !== '');  // true/false 
            
            const unsubscribe = authStore.subscribe(() => {
                setIsUserLoggedIn(authStore.getState().token !== '');
            })
            
            return unsubscribe;
        }, [])

    return (
        <div className="Menu">
            <div className="container">
                <nav className="navbar navbar-expand-lg bg-body-tertiary">
                    <div className="container-fluid">
                        {/* only when the user logged in he can access the vacations: */}
                        {isUserLoggedIn && <NavLink className="navbar-brand" to="/vacations">Vacations</NavLink>}
                        {isUserLoggedIn && <NavLink className="navbar-brand" to="/vacations/add">Add Vacation</NavLink>}
                        {isUserLoggedIn && <NavLink className="navbar-brand" to="/vacations/report">Report</NavLink>}
                    </div>
                </nav>
            </div>
        </div>
    );
}

export default Menu;
