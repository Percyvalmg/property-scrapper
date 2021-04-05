import {Formik} from "formik";
import {ButtonGroup, Form, Row} from "react-bootstrap";
import {Link, useHistory} from "react-router-dom";
import * as Yup from "yup";
import {AuthCode, handleLogin, handleRegister} from "../services";
import {FormField} from "./FormField";
import {SubmitButton} from "./SubmitButton";

const schema = Yup.object().shape({
    email: Yup.string().email().required("required"),
    password: Yup.string().required("required"),
});

type AuthFormProps = { isLoginForm: boolean };
export const AuthForm: React.FC<AuthFormProps> = ({isLoginForm}) => {
    const history = useHistory();

    return (
        <Formik
            validationSchema={schema}
            onSubmit={async (values, {setSubmitting, setErrors, resetForm}) => {
                setSubmitting(true);
                const response = isLoginForm
                    ? await handleLogin({
                        email: values.email,
                        password: values.password,
                    })
                    : await handleRegister({
                        email: values.email,
                        password: values.password,
                    });
                setSubmitting(false);
                console.log(`${isLoginForm ? "Login" : "Register"} response`, response);
                if (response.code === AuthCode.SUCCESS) {
                    resetForm();
                    history.push("/");
                } else {
                    alert(response.message);
                }
            }}
            initialValues={{
                email: "",
                password: "",
            }}
        >
            {({values, handleSubmit, handleChange, errors, isSubmitting}) => (
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

                    <Row className={"justify-content-center"}>
                        <ButtonGroup className={"p-1"}>
                            <SubmitButton
                                className={"mr-2"}
                                isSubmitting={isSubmitting}
                                label={isLoginForm ? "Login" : "Register"}
                            />

                            {isLoginForm ? (
                                <Link className={"btn btn-outline-primary"} to={"/register"}>
                                    Register
                                </Link>
                            ) : (
                                <Link className={"btn btn-outline-primary"} to={"/login"}>
                                    Login
                                </Link>
                            )}
                        </ButtonGroup>
                    </Row>
                </Form>
            )}
        </Formik>
    );
};
