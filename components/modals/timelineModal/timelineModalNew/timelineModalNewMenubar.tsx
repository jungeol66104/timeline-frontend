import React from 'react';
import AddImageButton from "@/components/common/edit/addImageButton";
import {getIsBaseImage} from "@/utils/global";
import RemoveImageButtonTest from "@/components/common/edit/removeImageButtonTest";
import ReplaceImageButtonTest from "@/components/common/edit/replaceImageButtonTest";

const TimelineModalNewMenubar = ({editor, src}:{editor: any, src: string}) => {
    const isBaseImage = getIsBaseImage(src)

    return (
        <div className={'w-full flex justify-between pb-3'}>
            <div className={'flex gap-3'}>
                {isBaseImage && <AddImageButton/>}
                {!isBaseImage && <RemoveImageButtonTest/>}
                {!isBaseImage && <ReplaceImageButtonTest/>}
            </div>
        </div>
    );
};

export default TimelineModalNewMenubar;
