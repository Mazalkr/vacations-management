import { createStore } from "redux";

// 1. Global State:
export class AuthState {
    public token: string = ''; // token = jwt (JSON Web Token).
    public constructor() {
        this.token = localStorage.getItem('token') || ''; // by using the constructor we can init this variable.
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
        // 'Signup' and 'Login' have the same commands, so we united them:
        case AuthActionType.Signup:  // payload here is the token. 
        case AuthActionType.Login: // payload here is the token.
            newState.token = action.payload as string;
            console.log(`our jwt is ${action.payload}`);
            localStorage.setItem('token', newState.token);
            break;
        case AuthActionType.Logout:
            newState.token = '';
            localStorage.removeItem('token');
            break;
    }

    return newState;
}

// 5. Store (אחסון):
export const authStore = createStore(authReducer);