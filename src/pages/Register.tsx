import React from "react";
import {AuthPageLayout} from "../components/shared";
import {RegistrationForm} from "../components/forms";

type RegisterProps = {}
const Register: React.FC<RegisterProps> = ({children}) => {
    return (
        <AuthPageLayout title={'Register'}>
            <RegistrationForm/>
        </AuthPageLayout>
    );
};

export default Register;
