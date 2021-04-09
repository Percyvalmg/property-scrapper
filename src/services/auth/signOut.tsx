import {analytics, auth} from "../../firebase";
import AuthCode from "./authCode";
import {AuthResponse} from "./types";
import {Response} from "../response";

export const signOut = async (): Promise<AuthResponse> => {
    try {
        await auth.signOut()
        return Response({
            code: AuthCode.SUCCESS,
            message: "You have signed out successfully!",
        });
    } catch (e) {
        analytics.logEvent('user_sign_out_error', {
            errorMessage: e.message
        })
        return Response({code: e.code, message: e.message});
    }
}
