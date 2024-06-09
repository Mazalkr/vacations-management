import axios from "axios";
import { authStore } from "../redux/AuthState";

class Interceptors {
    public create(): void {
        // in that way I ask from axios to give me this token data before you do something else.
        // we want to do that because we use multiple time with those commands.
        // its sort of hook... (but not in component).
        axios.interceptors.request.use(requestObject => {
            const token = authStore.getState().token;
            if (token) {
                requestObject.headers.Authorization = `Bearer ${token}`;
            }
            return requestObject;
        })
    }
}

const interceptors = new Interceptors();
export default interceptors;

// interceptor = מיירט.
// relevant to request or response from the server.
// before we send request or response to the server, we want to change them.
// here we add token to the user if he had one.

// interceptors.create();  // I add this command in the file 'index.tsx' because its relevant to all the requests.