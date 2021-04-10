import {Button, Spinner} from "react-bootstrap";

type SubmitButtonProps = {
    isSubmitting: boolean;
    label: string;
    className?: string;
    block?: boolean;
};

export const SubmitButton: React.FC<SubmitButtonProps> = ({isSubmitting, label, className, block = false}) => {
    return (
        <Button type="submit" disabled={isSubmitting} className={className} block={block}>
            {isSubmitting ? <LoadingIndicator/> : label}
        </Button>
    );
};

export const LoadingIndicator = () => {
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
