import axios from "axios";
import Signup from "../models/SignupModel";
import appConfig from "../utils/AppConfig";
import { AuthAction, AuthActionType, authStore } from "../redux/AuthState";
import Login from "../models/LoginModel";

class Auth {
    public async signup(signup: Signup): Promise<string> { // it will return JWT that type of string.
        const response = await axios.post<{jwt: string}>(appConfig.signupUrl, signup);  
        const token = response.data.jwt;  //token = jwt.

        // Redux:
        // 1. create action
        const action: AuthAction = {
            type: AuthActionType.Signup,
            payload: token
        }

        // 2. dispatch
        authStore.dispatch(action); 

        return token;
    }

    public async login(login: Login): Promise<string> {
        // login actions work in HTTP POST instead of GET (explanation in file '02-login-get' (28.12.23))
        const response = await axios.post<{jwt: string}>(appConfig.loginUrl, login);
        const token = response.data.jwt;  //token = jwt.

        // Redux:
        // 1. create action
        const action: AuthAction = {
            type: AuthActionType.Login,
            payload: token
        }

        // 2. dispatch - send the action to redux:
        authStore.dispatch(action); 

        return token;
    }

    public logout() {
        const action: AuthAction = {
            type: AuthActionType.Logout,
            payload: null
        }

        authStore.dispatch(action);
    }
}

// Singleton:
const auth = new Auth();
export default auth;