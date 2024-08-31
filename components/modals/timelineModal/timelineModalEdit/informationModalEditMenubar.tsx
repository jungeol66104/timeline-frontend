import React from 'react';
import AddImageButton from "@/components/common/addImageButton";
import ResetEditButton from "@/components/modals/resetEditButton";
import {useSelector} from "react-redux";
import {selectTimelineType} from "@/store/slices/appearanceSlice";
import {getIsBaseImage} from "@/utils/global";
import SaveInformationButton from "@/components/modals/timelineModal/timelineModalEdit/saveInformationButton";
import ImageEditButton from "@/components/common/imageEditButton";

const InformationModalEditMenubar = ({editor, src}:{editor: any, src: string}) => {
    const timelineType = useSelector(selectTimelineType)
    const isBaseImage = getIsBaseImage(src)

    return (
        <div className={'w-full flex justify-between pb-3'}>
            <div className={'flex gap-3'}>
                {isBaseImage && <AddImageButton/>}
                {!isBaseImage && <ImageEditButton/>}
                {/*{!isBaseImage && <RemoveImageButton />}*/}
                {/*{!isBaseImage && <ReplaceImageButton />}*/}
                {timelineType !== 'new' && <ResetEditButton />}
            </div>
            <div className={'flex gap-3'}>
                {timelineType !== 'new' && <SaveInformationButton/>}
            </div>
        </div>
    );
};

export default InformationModalEditMenubar;
