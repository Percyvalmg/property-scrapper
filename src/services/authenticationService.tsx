import {auth} from "../firebase";
import AuthCode from "./authCode";
import firebase from "firebase";

export type authProps = {
    email: string;
    password: string;
};

export type AuthResponse = {
    code: AuthCode;
    message: string;
};

function AuthPromise(authResponse: AuthResponse): Promise<AuthResponse> {
    return new Promise<AuthResponse>(function (resolve) {
        resolve(authResponse);
    });
}

export const handleLogin = async ({email, password}: authProps): Promise<AuthResponse> => {
    try {
        const response = await auth.signInWithEmailAndPassword(email, password);

        if (response.user) {
            return AuthPromise({
                code: AuthCode.SUCCESS,
                message: "You have Logged in successfully!",
            })
        }

        return AuthPromise({
            code: AuthCode.ERROR,
            message: "An error occurred while trying to log you in," +
                "please try again later",
        });
    } catch (e) {
        const errorCode = e.code;
        const errorMessage = e.message;
        switch (errorCode) {
            case "auth/wrong-password":
            case "auth/user-not-found":
            case "auth/invalid-email":
                return AuthPromise({
                    code: AuthCode.INCORRECT_CREDENTIALS,
                    message: "Sorry, one or more of your credentials are incorrect.",
                });
            case "auth/user-disabled":
                return AuthPromise({
                    code: AuthCode.ACCOUNT_LOCKED,
                    message: "Your account has been locked!",
                });
            default:
                return AuthPromise({code: AuthCode.ERROR, message: errorMessage});
        }
    }
};

export const handleRegister = async ({email, password,}: authProps): Promise<AuthResponse> => {
    try {
        const response = await auth.createUserWithEmailAndPassword(email, password)
        if (response.user) {
            return AuthPromise({
                code: AuthCode.SUCCESS,
                message: "You have registered successfully!",
            });
        }

        return AuthPromise({
            code: AuthCode.ERROR,
            message: "An error occurred while trying to log you in," +
                "please try again later",
        });
    } catch (e) {
        const errorCode = e.code;
        const errorMessage = e.message;
        switch (errorCode) {
            case "auth/email-already-in-use":
                return AuthPromise({
                    code: AuthCode.ERROR,
                    message: "Email is already taken",
                });
            case "auth/invalid-email":
                return AuthPromise({
                    code: AuthCode.ERROR,
                    message: "The email address you entered is invalid!",
                });
            case "auth/weak-password":
                return AuthPromise({
                    code: AuthCode.ERROR,
                    message: "Your password is too week try using a stronger one!",
                });
            default:
                return AuthPromise({code: AuthCode.ERROR, message: errorMessage});
        }
    }
};

export const setCurrentUser = (setUser: (data: firebase.User | null) => void, onSetCurrentUser?: () => void) => {
    const currentUser = auth.currentUser
    if (currentUser) {
        setUser(currentUser);
        if (onSetCurrentUser) {
            onSetCurrentUser()
        }
    }
}

export const handleSignOut = async (): Promise<AuthResponse> => {
    try {
        await auth.signOut()
        return AuthPromise({
            code: AuthCode.SUCCESS,
            message: "You have signed out successfully!",
        });
    } catch (e) {
        return AuthPromise({code: e.code, message: e.message});
    }

}

export const handleLoginWithGoogle = async (): Promise<AuthResponse> => {
    try {
        const provider = new firebase.auth.GoogleAuthProvider();
        await auth.signInWithRedirect(provider);
        return AuthPromise({
            code: AuthCode.SUCCESS,
            message: "You have logged in successfully!",
        });
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;

        switch (errorCode) {
            case 'auth/email-already-in-use':
                return AuthPromise({
                    code: AuthCode.ERROR,
                    message: "You already have an account with us.",
                });
            default:
                return AuthPromise({code: AuthCode.ERROR, message: errorMessage});
        }
    }
}
