import React from 'react';
import {useSelector} from "react-redux";
import {selectModalType} from "@/store/slices/appearanceSlice";
import AddImageButton from "@/components/common/addImageButton";
import CreateEventButton from "@/components/modal/eventModal/eventNew/createEventButton";

const EditMenubar = ({editor, src}:{editor: any, src: string}) => {
    const modalType = useSelector(selectModalType)

    return (
        <div className={'w-full flex justify-between pb-3'}>
            <AddImageButton src={src} />
            {modalType === 'event' && <CreateEventButton/>}
        </div>
    );
};

export default EditMenubar;