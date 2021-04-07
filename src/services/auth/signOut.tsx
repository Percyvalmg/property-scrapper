import {auth} from "../../firebase";
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
        return Response({code: e.code, message: e.message});
    }
}
