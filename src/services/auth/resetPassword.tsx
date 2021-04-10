import {analytics, auth} from "../../firebase";
import {Response} from '../response'
import {AuthCode} from "./index";

export const sendPasswordResetEmail = async (email: string) => {
    try {
        await auth.sendPasswordResetEmail(email);
        return Response({
            code: AuthCode.SUCCESS,
            message: 'Please check your email for instructions on how to reset your password.'
        })
    } catch (e) {
        analytics.logEvent('password_reset_error', {
            errorCode: e.code,
            errorMessage: e.message
        })
        return Response({
            code: AuthCode.ERROR,
            message: 'Something went wrong while trying to send you the reset password email, please try' +
                ' again later.'
        })
    }
}
