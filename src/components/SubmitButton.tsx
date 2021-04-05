import {Button, Spinner} from "react-bootstrap";

type SubmitButtonProps = {
    isSubmitting: boolean;
    label: string;
    className?: string;
};

export const SubmitButton: React.FC<SubmitButtonProps> = ({isSubmitting, label, className,}) => {
    return (
        <Button type="submit" disabled={isSubmitting} className={className}>
            {isSubmitting ? <LoadingIndicator/> : label}
        </Button>
    );
};

const LoadingIndicator = () => {
    return (
        <>
            <Spinner
                as={"span"}
                animation="border"
                size={"sm"}
                role={"status"}
                aria-hidden={"true"}
            />
            <span className={"sr-only"}>Loading...</span>
        </>
    );
};
