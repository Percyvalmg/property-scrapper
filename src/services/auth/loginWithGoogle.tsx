import firebase from "firebase";
import {auth} from "../../firebase";
import AuthCode from "./authCode";
import {AuthResponse} from "./types";
import {Response} from "../response";

export const loginWithGoogle = async (): Promise<AuthResponse> => {
    try {
        const provider = new firebase.auth.GoogleAuthProvider();
        await auth.signInWithRedirect(provider);
        return Response({
            code: AuthCode.SUCCESS,
            message: "You have logged in successfully!",
        });
    } catch (error) {
        return handleLoginWithGoogleErrorResponse(error.code, error.message)
    }
}

function handleLoginWithGoogleErrorResponse(errorCode: string, errorMessage: string) {
    switch (errorCode) {
        case 'auth/email-already-in-use':
            return Response({
                code: AuthCode.ERROR,
                message: "You already have an account with us.",
            });
        default:
            return Response({code: AuthCode.ERROR, message: errorMessage});
    }
}
