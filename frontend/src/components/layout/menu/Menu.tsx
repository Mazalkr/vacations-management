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
            <NavLink to="/home">Home</NavLink>
            {/* only when the user logged in he can access the vacations: */}
            {isUserLoggedIn && <NavLink to="/vacations">Vacations</NavLink>}
            {/* <NavLink to="/lorem-ipsums/add">Add LoremIposum</NavLink> */}
            <NavLink to="/about">About</NavLink>
        </div>
    );
}

export default Menu;
