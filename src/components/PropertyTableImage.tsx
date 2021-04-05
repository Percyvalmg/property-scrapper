import SimpleReactLightbox, {SRLWrapper} from "simple-react-lightbox";
import React from "react";
import {PropertyEntity} from "../types";

type PropertyImageProps = { property: PropertyEntity };
export const PropertyTableImage = ({property}: PropertyImageProps) => {
    return (
        <SimpleReactLightbox>
            <SRLWrapper>
                <a href={property.image}>
                    <img
                        src={property.image}
                        style={{width: "100%", height: "100%"}}
                        alt={property.title}
                    />
                </a>
                {property.images &&
                property.images?.map((image, index) => {
                    if (index !== 0) {
                        return (
                            <a key={index} href={image} style={{display: "none"}}>
                                <img
                                    src={image}
                                    style={{width: "100px", height: "100px"}}
                                    alt={property.title}
                                />
                            </a>
                        );
                    }
                    return <></>;
                })}
            </SRLWrapper>
        </SimpleReactLightbox>
    );
};
