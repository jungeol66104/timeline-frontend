import React from 'react';
import Image from "next/image";
import {getIsBaseImage, mapStrToNum} from "@/utils/global";
import {useDispatch, useSelector} from "react-redux";
import {selectModalType} from "@/store/slices/appearanceSlice";
import {selectCurrentEventDraft, selectCurrentTimelineDraft, updateCurrentEventDraft, updateCurrentTimelineDraft} from "@/store/slices/contentsSlice";

const LinksPopoverInternalContent = ({linkObject}: {linkObject: any}) => {
    const dispatch = useDispatch();
    const modalType = useSelector(selectModalType)
    const currentTimelineDraft = useSelector(selectCurrentTimelineDraft)
    const currentEventDraft = useSelector(selectCurrentEventDraft)

    const thumbnailLink = modalType === 'information' ? currentTimelineDraft.thumbnailLink : currentEventDraft.thumbnailLink
    const isBaseImage = getIsBaseImage(linkObject.imageUrl)

    const handleClick = () => {
        dispatch(modalType === 'information' ? updateCurrentTimelineDraft({...currentTimelineDraft, thumbnailLink: linkObject.url}) : updateCurrentEventDraft({...currentEventDraft, thumbnailLink: linkObject.url}))
    }

    return (
        <button onClick={() => handleClick()} className={`p-1.5 w-full flex items-center gap-2.5 ${linkObject.url === thumbnailLink && 'bg-gray-200'} hover:bg-gray-100 rounded-sm`}>
            <div className={'relative shrink-0 w-[24px] h-[24px]'}>
                {isBaseImage
                    ? <>
                        <div className={'relative w-[24px] h-[24px] rounded-sm text-white flex items-center justify-center text-sm'}>
                            <span className={'absolute'}>{linkObject.title.charAt(0).toUpperCase()}</span>
                            <Image src={`/images/base-image/base-image${mapStrToNum(linkObject.title)}.jpg`} alt={'base-image'} width={24} height={24} priority={true} className={'rounded-sm bg-gray-100'}/>
                        </div>
                    </>
                    : <Image className={'rounded-sm bg-gray-100'} src={linkObject.imageUrl} alt={linkObject.title} fill={true} priority={true} style={{objectFit: "cover", objectPosition: "top"}}/>}
            </div>
            <div className={'w-full text-start text-sm font-medium flex-1 line-clamp-1'}>{linkObject.title}</div>
        </button>
    );
};

export default LinksPopoverInternalContent;
