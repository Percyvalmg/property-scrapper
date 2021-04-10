import {Formik} from "formik";
import {Form} from "react-bootstrap";
import {useState} from "react";
import * as Yup from "yup";
import {AuthCode, AuthResponse, useAuth} from "../../services/auth";
import {analytics} from "../../firebase";
import {FormField} from "./FormField";
import {AlertDismissible} from "./Alert";
import {SubmitButton} from "./SubmitButton";
import {Link, useHistory} from "react-router-dom";

const schema = Yup.object().shape({
    email: Yup.string().email().required("required"),
});
export const ForgotPasswordForm = () => {
    const history = useHistory();
    const {sendPasswordResetEmail} = useAuth();
    const [showAlert, setShowAlert] = useState(false);
    const [authResponse, setAuthResponse] = useState<AuthResponse>();

    return (
        <Formik
            validationSchema={schema}
            onSubmit={async (values, {setSubmitting}) => {
                setSubmitting(true);
                analytics.logEvent('submit_reset_password_form', {
                    user: values.email
                })

                const response = await sendPasswordResetEmail(values.email);
                setAuthResponse(response)
                setShowAlert(true);
                setSubmitting(false);
            }}
            initialValues={{
                email: "",
            }}
        >
            {({values, handleSubmit, handleChange, errors, setSubmitting, isSubmitting, resetForm}) => (
                <Form noValidate onSubmit={handleSubmit}>
                    <FormField
                        defaultValue={values.email}
                        name={"email"}
                        placeholder={"Email"}
                        type={"email"}
                        onChangeHandler={handleChange}
                        error={errors.email}
                    />
                    {showAlert && <AlertDismissible
                        onClose={() => {
                            if (authResponse?.code === AuthCode.SUCCESS) {
                                resetForm()
                                history.push('/login');
                            }
                            setShowAlert(false);
                        }}
                        variant={authResponse?.code === AuthCode.SUCCESS ? 'success' : 'danger'}>
                        {authResponse?.message}
                    </AlertDismissible>}
                    <Form.Group className={'mt-5'}>
                        <SubmitButton
                            isSubmitting={isSubmitting}
                            label={"Send Reset Password Email"}
                            block={true}
                        />
                    </Form.Group>
                    <Form.Group>
                        <p className="mt-4 mb-0">Just remembered your password?
                            <Link to={'/login'}> Login here</Link>
                        </p>
                    </Form.Group>
                </Form>
            )}
        </Formik>
    )
}
