import React from 'react';
import RemoveImageButton from "@/components/common/removeImageButton";
import ReplaceImageButton from "@/components/common/replaceImageButton";

const ImageEditButtons = () => {
    return (
        <div className={`absolute top-1 right-1 flex items-center h-[36px] border-[0.1px] border-gray-300 drop-shadow-sm rounded-md opacity-70`}>
            <ReplaceImageButton/>
            <RemoveImageButton/>
        </div>
    );
};

export default ImageEditButtons;
