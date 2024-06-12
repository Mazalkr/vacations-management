import { useEffect, useState } from "react";
import "./AuthMenu.css";
import { authStore } from "../../../redux/AuthState";
import { NavLink, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import auth from "../../../services/Auth";
import notify from "../../../services/Notify";
import User from "../../../models/User";

function AuthMenu(): JSX.Element {

    // type User = {
    //     firstName: string,
    //     lastName: string
    // };

    const [user, setUser] = useState<User>();
    // const [token, setToken] = useState<string>('');

    const navigate = useNavigate();

    useEffect(() => {
        // INIT the token the 1st time the component is mounted:
        const token = authStore.getState().token;
        if(token) {
            // console.log(token);
            const user = jwtDecode<{user: User}>(token).user; 
            console.log(`user with token: ${user}`); 
            // 'jwtDecode' decode the JWT (token) and extract the User details: firstName & lastName.
            // decode all the object user and extract just the 'user'.
            setUser(user);
        }

        // SUBSCRIBE the changes:
        const unsubscribe = authStore.subscribe(() => {
            const token = authStore.getState().token;
            if(token) {
                const user = jwtDecode<{user: User}>(token).user; 
                console.log(`user with token: ${{ user }}`);
                console.log(`token: ${token}`);
                // setToken(token);
                setUser(user);
            } else {
                // if we logout so we need to reset the user data:
                setUser(undefined);
            }
        });

        return unsubscribe;
    }, []);

    function logout() {
        auth.logout();
        notify.success('logged out successfully');
    }

    return (
        <div className="AuthMenu">
            {!user &&
                <div>
                    <span>Hello Guest | </span>
                    <NavLink to="/signup">Sign Up</NavLink>
                    <span> | </span>
                    <NavLink to="/login">Login</NavLink>
                </div>
            }
            {user &&
                <div>
                    <span>Hello {user.firstName} | </span>
                    <NavLink to="/home" onClick={logout}>Logout</NavLink>
                </div>
            }
			
        </div>
    );
}

export default AuthMenu;
