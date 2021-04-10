import React from "react";
import {AuthPageLayout} from "../components/shared";
import {LoginForm} from "../components/forms";

type LoginProps = {}
const Login: React.FC<LoginProps> = ({children}) => {
    return (
        <AuthPageLayout title={'Login'}>
            <LoginForm/>
        </AuthPageLayout>
    );
};

export default Login;
