import {Alert} from "react-bootstrap";
import React from "react";

type AlertProps = { onClose: () => void; variant: string; }
export const AlertDismissible: React.FC<AlertProps> = ({onClose, variant, children}) => {
    return (
        <Alert variant={variant} onClose={onClose} dismissible>
            {children}
        </Alert>
    );
}
