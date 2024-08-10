import React from 'react';
import {useSelector} from "react-redux";
import {selectModalType} from "@/store/slices/appearanceSlice";
import AddImageButton from "@/components/common/edit/addImageButton";
import CreateEventButton from "@/components/modals/eventModal/eventNew/createEventButton";
import {getIsBaseImage} from "@/utils/global";
import RemoveImageButtonTest from "@/components/common/edit/removeImageButtonTest";
import ReplaceImageButtonTest from "@/components/common/edit/replaceImageButtonTest";

const EventModalNewMenubar = ({editor, src}:{editor: any, src: string}) => {
    const isBaseImage = getIsBaseImage(src)

    return (
        <div className={'w-full flex justify-between pb-3'}>
            <div className={'flex gap-3'}>
                {isBaseImage && <AddImageButton/>}
                {!isBaseImage && <RemoveImageButtonTest/>}
                {!isBaseImage && <ReplaceImageButtonTest/>}
            </div>
            <CreateEventButton/>
        </div>
    );
};

export default EventModalNewMenubar;
