import AuthCode from "./authCode";
import {auth} from "../../firebase";
import {authProps, AuthResponse} from "./types";
import {Response} from "../response";

export const register = async ({email, password,}: authProps): Promise<AuthResponse> => {
    try {
        const response = await auth.createUserWithEmailAndPassword(email, password);
        if (response.user) {
            return Response({
                code: AuthCode.SUCCESS,
                message: "You have registered successfully",
            });
        }

        return Response({
            code: AuthCode.ERROR,
            message: "An error occurred while trying to register your account," +
                "please try again later",
        });
    } catch (e) {
        return handleRegisterErrorResponse(e.code, e.message);
    }
};

function handleRegisterErrorResponse(errorCode: string, errorMessage: string) {
    switch (errorCode) {
        case "auth/email-already-in-use":
            return Response({
                code: AuthCode.ERROR,
                message: "Email is already taken",
            });
        case "auth/invalid-email":
            return Response({
                code: AuthCode.ERROR,
                message: "The email address you entered is invalid!",
            });
        case "auth/weak-password":
            return Response({
                code: AuthCode.ERROR,
                message: "Your password is too week try using a stronger one!",
            });
        default:
            return Response({code: AuthCode.ERROR, message: errorMessage});
    }
}
