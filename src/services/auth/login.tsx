import {analytics, auth} from "../../firebase";
import AuthCode from "./authCode";
import {authProps, AuthResponse} from "./types";
import {Response} from "../response";

export const login = async ({email, password}: authProps): Promise<AuthResponse> => {
    try {
        const response = await auth.signInWithEmailAndPassword(email, password);

        if (response.user) {
            analytics.logEvent('user_login_success')
            return Response({
                code: AuthCode.SUCCESS,
                message: "You have Logged in successfully!",
            })
        }

        analytics.logEvent('user_login_error', {
            errorMessage: 'unknown error'
        })
        return Response({
            code: AuthCode.ERROR,
            message: "An error occurred while trying to log you in," +
                "please try again later",
        });
    } catch (e) {
        return handleLoginErrorResponse(e.code, e.message)
    }
};

function handleLoginErrorResponse(errorCode: string, errorMessage: string) {
    analytics.logEvent('user_login_error', {
        errorMessage: errorMessage
    })
    switch (errorCode) {
        case "auth/wrong-password":
        case "auth/user-not-found":
        case "auth/invalid-email":
            return Response({
                code: AuthCode.INCORRECT_CREDENTIALS,
                message: "Sorry, one or more of your credentials are incorrect.",
            });
        case "auth/user-disabled":
            return Response({
                code: AuthCode.ACCOUNT_LOCKED,
                message: "Your account has been locked!",
            });
        default:
            return Response({code: AuthCode.ERROR, message: errorMessage});
    }
}
