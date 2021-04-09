import React from "react";
import {analytics} from "../../firebase";

type LinkProps = { href: string };
export const Link: React.FC<LinkProps> = ({children, href}) => {
    return (
        <a href={href} target={"_blank"} rel={"noreferrer noopener"}
           onClick={() => analytics.logEvent('visit_external_link', {
               url: href
           })}>
            {children}
        </a>
    );
};
