import {SRLWrapper} from "simple-react-lightbox";
import React from "react";

type PropertyImageProps = { image: string | undefined, images: string[] | undefined }
export const PropertyImage = ({image, images}: PropertyImageProps) => {

    return (
        <SRLWrapper>
            <a href={image}>
                <img src={image} style={{width: '100%', height: '100%'}} alt={'Property Image'}/>
            </a>
            {images &&
            images?.map((image, index) => {
                if (index != 0)
                    return <a key={index} href={image} style={{display: 'none'}}>
                        <img src={image} style={{width: '100px', height: '100px'}} alt={'Property Image'}/>
                    </a>
            })
            }
        </SRLWrapper>)
}
