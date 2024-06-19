import { createStore } from "redux";
import User from "../../src/models/User";
import { jwtDecode } from "jwt-decode";

// 1. Global State:
export class AuthState {
    public token: string = ''; // token = jwt (JSON Web Token).
    public user: User = {};
    public constructor() {
        this.token = localStorage.getItem('token') || ''; 
        if (this.token) {
            const jwtPayload = jwtDecode(this.token) 
            this.user = (jwtPayload as any).user;
        }
    }
}

// 2. Action Types:
export enum AuthActionType {
    Signup = 'Signup',
    Login = 'Login',
    Logout = 'Logout',
}

// 3. Action:
export type AuthActionPayload = string | null;
export interface AuthAction {
    type: AuthActionType,
    payload: AuthActionPayload,
}

// 4. Reducer:
export function authReducer(currentState = new AuthState(), action: AuthAction): AuthState {
    const newState = {...currentState};

    switch (action.type) {
        case AuthActionType.Signup:  
        case AuthActionType.Login: 
            newState.token = action.payload as string;
            console.log(`our jwt is ${action.payload}`);
            const jwtPayload = jwtDecode(newState.token);
            newState.user = (jwtPayload as any).user;
            localStorage.setItem('token', newState.token);
            break;
        case AuthActionType.Logout:
            newState.token = '';
            newState.user = {};
            localStorage.removeItem('token');
            break;
    }

    return newState;
}

// 5. Store:
export const authStore = createStore(authReducer);