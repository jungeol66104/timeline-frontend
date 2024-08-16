import React, {useEffect, useState} from 'react';
import Image from "next/image";
import {getIsBaseImage} from "@/utils/global";
import {Timeline} from "@/store/slices/contentsSlice";

const InformationPreviewImage = ({information}: {information: Timeline}) => {

    const src = information.image
    const alt = information.name
    const imageSize = information.imageSize || {width: 100, height: 100};

    const [innerWidth, setInnerWidth] = useState(window.innerWidth);

    const isBaseImage = getIsBaseImage(src)
    const ratio = imageSize.width / imageSize.height
    let width;
    if (typeof window !== 'undefined') {
        if (innerWidth <= 630) width = ratio <= 1 ? 80 : ratio <= 1.25 ? ratio * 80 : 100
        else width = ratio <= 1 ? 108 : ratio <= 1.25 ? ratio * 108 : 135
    }

    useEffect(() => {
        const handleResize = () => setInnerWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className={`${isBaseImage && 'hidden'} float-right relative ml-2 h-[108px] max-[630px]:h-[80px]`} style={{width: width}}>
            <Image className={'rounded-md bg-gray-100'} src={src} alt={alt} fill priority style={{objectFit: "cover", objectPosition: "top"}}/>
        </div>
    );
};

export default InformationPreviewImage;
