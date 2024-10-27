import {getIsBaseImage} from "@/utils/global";
import React from 'react';
import {useSelector} from "react-redux";
import {selectTimelineType} from "@/store/slices/appearanceSlice";
import AddImageButton from "@/components/common/addImageButton";
import ImageEditButton from "@/components/common/imageEditButton";
import ResetEditButton from "@/components/modals/resetEditButton";
import SaveInformationButton from "@/components/modals/informationModal/informationViewEdit/saveInformationButton";

const InformationModalEditMenubar = ({editor, imagePath}:{editor: any, imagePath: string}) => {
    const timelineType = useSelector(selectTimelineType)
    const isBaseImage = getIsBaseImage(imagePath)

    return (
        <div className={'w-full flex justify-between pb-3'}>
            <div className={'flex gap-3'}>
                {isBaseImage && <AddImageButton/>}
                {!isBaseImage && <ImageEditButton/>}
                {timelineType !== 'new' && <ResetEditButton />}
            </div>
            <div className={'flex gap-3'}>
                {timelineType !== 'new' && <SaveInformationButton/>}
            </div>
        </div>
    );
};

export default InformationModalEditMenubar;
