import React from 'react';
import RemoveImageButton from "@/components/common/removeImageButton";
import ReplaceImageButton from "@/components/common/replaceImageButton";
import {useSelector} from "react-redux";
import {selectModalType} from "@/store/slices/appearanceSlice";

const ImageEditButtons = () => {
    const modalType = useSelector(selectModalType);

    return (
        <div className={`absolute ${modalType === 'none' ? 'top-1 right-1' : 'top-4 right-4'} flex items-center h-[36px] border-[0.1px] border-gray-300 drop-shadow-sm rounded-md opacity-70`}>
            <ReplaceImageButton/>
            <RemoveImageButton/>
        </div>
    );
};

export default ImageEditButtons;
