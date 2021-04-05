import {ChangeEvent} from "react";
import {Form} from "react-bootstrap";

type FormFieldProps = {
    name: string;
    placeholder: string;
    type: string;
    defaultValue: string;
    error: string | undefined;
    onChangeHandler: (e: ChangeEvent<any>) => void;
};
export const FormField: React.FC<FormFieldProps> = ({
                                                        name, placeholder,
                                                        type, defaultValue, error,
                                                        onChangeHandler,
                                                    }) => {
    return (
        <Form.Group controlId={`${name}FormGroup`}>
            <Form.Control
                value={defaultValue}
                name={name}
                type={type}
                onChange={onChangeHandler}
                isInvalid={!!error}
                placeholder={placeholder}
            />
            <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
        </Form.Group>
    );
};
