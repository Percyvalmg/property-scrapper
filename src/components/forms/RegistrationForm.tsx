import {Formik} from "formik";
import {Button, Form} from "react-bootstrap";
import {Link, useHistory} from "react-router-dom";
import * as Yup from "yup";
import {FormField} from "./FormField";
import {LoadingIndicator, SubmitButton} from "./SubmitButton";
import {AlertDismissible} from "./Alert";
import {useState} from "react";
import {AuthCode, AuthResponse, useAuth} from "../../services/auth";
import {analytics} from "../../firebase";

const schema = Yup.object().shape({
    email: Yup.string().email().required("required"),
    password: Yup.string().required("required"),
    confirmPassword: Yup.string()
    .required("required")
});

type RegistrationFormProps = {};
export const RegistrationForm: React.FC<RegistrationFormProps> = () => {
    const history = useHistory();
    const {handleRegister, handleLoginWithGoogle} = useAuth();
    const [showAlert, setShowAlert] = useState(false);
    const [authResponse, setAuthResponse] = useState<AuthResponse>();

    return (
        <Formik
            validationSchema={schema}
            onSubmit={async (values, {setSubmitting, setErrors}) => {
                setSubmitting(true);
                if (values.password !== values.confirmPassword) {
                    setErrors({confirmPassword: 'passwords are not the same!'})
                    return;
                }

                analytics.logEvent('submit_register_form', {
                    user: values.email
                })

                const response = await handleRegister({
                    email: values.email,
                    password: values.password,
                });

                setSubmitting(false);
                setAuthResponse(response);
                setShowAlert(true);
            }}
            initialValues={{
                email: "",
                password: "",
                confirmPassword: ""
            }}
        >
            {({values, isValid, handleSubmit, handleChange, errors, setSubmitting, isSubmitting}) => (
                <Form noValidate onSubmit={handleSubmit}>
                    <FormField
                        defaultValue={values.email}
                        name={"email"}
                        placeholder={"Email"}
                        type={"email"}
                        onChangeHandler={handleChange}
                        error={errors.email}
                    />
                    <FormField
                        defaultValue={values.password}
                        name={"password"}
                        placeholder={"Password"}
                        type={"password"}
                        onChangeHandler={handleChange}
                        error={errors.password}
                    />
                    <FormField
                        defaultValue={values.confirmPassword}
                        name={"confirmPassword"}
                        placeholder={"Confirm Password"}
                        type={"password"}
                        onChangeHandler={handleChange}
                        error={errors.confirmPassword}
                    />

                    {showAlert && <AlertDismissible
                        onClose={() => {
                            if (authResponse?.code === AuthCode.SUCCESS) {
                                history.push("/");
                            }
                            setShowAlert(false);
                        }}
                        variant={authResponse?.code === AuthCode.SUCCESS ? 'success' : 'danger'}>
                        {authResponse?.message}
                    </AlertDismissible>}

                    <Form.Group className={"mt-5"}>
                        <SubmitButton
                            isSubmitting={isSubmitting}
                            label={"Register"}
                            block={true}
                        />
                    </Form.Group>
                    <div className={'mb-4'}>
                        <hr className="hr-or" color={'white'}/>
                        <span className="span-or">or</span>
                    </div>
                    <Form.Group>
                        <Button variant={'outline-danger'} disabled={isSubmitting}
                                onClick={async () => {
                                    setSubmitting(true);
                                    const response = await handleLoginWithGoogle();
                                    setSubmitting(false);
                                    setAuthResponse(response);
                                    setShowAlert(true);
                                }} block={true}>{isSubmitting ?
                            <LoadingIndicator/> : 'Signup using Google'}</Button>
                    </Form.Group>
                    <Form.Group>
                        <p className="mt-4 mb-0">Already have account?
                            <Link to={'/login'}> Login here</Link>
                        </p>
                    </Form.Group>
                </Form>
            )}
        </Formik>
    );
};
