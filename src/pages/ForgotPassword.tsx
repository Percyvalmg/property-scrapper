import {AuthPageLayout} from "../components/shared";
import React from "react";
import {ForgotPasswordForm} from "../components/forms";

const ForgotPassword: React.FC = ({children}) => {
    return (
        <AuthPageLayout title={'Forgot Password'}>
            <ForgotPasswordForm/>
        </AuthPageLayout>
    )
}

export default ForgotPassword
