import React from "react";

type LinkProps = { href: string };
export const Link: React.FC<LinkProps> = ({children, href}) => {
    return (
        <a href={href} target={"_blank"} rel={"noreferrer noopener"}>
            {children}
        </a>
    );
};
