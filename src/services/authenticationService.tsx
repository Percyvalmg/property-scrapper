import firebase from "firebase";
import AuthCode from "./authCode";

type authProps = {
    email: string;
    password: string;
};

type AuthResponse = {
    code: AuthCode;
    message: string;
};

export const handleLogin = async ({email, password}: authProps): Promise<AuthResponse> => {
    try {
        const response = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);

        if (response.user) {
            return new Promise<AuthResponse>(function (resolve, reject) {
                resolve({
                    code: AuthCode.SUCCESS,
                    message: "You have Logged in successfully!",
                });
            });
        }

        return new Promise<AuthResponse>(function (resolve, reject) {
            resolve({
                code: AuthCode.ERROR,
                message: "An error occurred while trying to log you in," +
                    "please try again later",
            });
        });
    } catch (e) {
        const errorCode = e.code;
        const errorMessage = e.message;
        switch (errorCode) {
            case "auth/wrong-password":
            case "auth/user-not-found":
            case "auth/invalid-email":
                return new Promise<AuthResponse>(function (resolve, reject) {
                    resolve({
                        code: AuthCode.INCORRECT_CREDENTIALS,
                        message: "One or two of your credentials is/are incorrect!",
                    });
                });
            case "auth/user-disabled":
                return new Promise<AuthResponse>(function (resolve, reject) {
                    resolve({
                        code: AuthCode.ACCOUNT_LOCKED,
                        message: "Your account has been locked!",
                    });
                });
            default:
                return new Promise<AuthResponse>(function (resolve, reject) {
                    resolve({code: AuthCode.ERROR, message: errorMessage});
                });
        }
    }
};

export const handleRegister = async ({email, password,}: authProps): Promise<AuthResponse> => {
    try {
        const response = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        if (response.user) {
            return new Promise<AuthResponse>(function (resolve, reject) {
                resolve({
                    code: AuthCode.SUCCESS,
                    message: "You have registered successfully!",
                });
            });
        }

        return new Promise<AuthResponse>(function (resolve, reject) {
            resolve({
                code: AuthCode.ERROR,
                message: "An error occurred while trying to log you in," +
                    "please try again later",
            });
        });
    } catch (e) {
        const errorCode = e.code;
        const errorMessage = e.message;
        switch (errorCode) {
            case "auth/email-already-in-use":
                return new Promise<AuthResponse>(function (resolve, reject) {
                    resolve({
                        code: AuthCode.ERROR,
                        message: "Email is already taken",
                    });
                });
            case "auth/invalid-email":
                return new Promise<AuthResponse>(function (resolve, reject) {
                    resolve({
                        code: AuthCode.ERROR,
                        message: "The email address you entered is invalid!",
                    });
                });
            case "auth/weak-password":
                return new Promise<AuthResponse>(function (resolve, reject) {
                    resolve({
                        code: AuthCode.ERROR,
                        message: "Your password is too week try using a stronger one!",
                    });
                });
            default:
                return new Promise<AuthResponse>(function (resolve, reject) {
                    resolve({code: AuthCode.ERROR, message: errorMessage});
                });
        }
    }
};
