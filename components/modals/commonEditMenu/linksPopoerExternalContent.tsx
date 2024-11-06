import React from 'react';
import Image from "next/image";
import {getIsBaseImage} from "@/utils/global";
import {useDispatch, useSelector} from "react-redux";
import {selectModalType} from "@/store/slices/appearanceSlice";
import {selectCurrentEventDraft, selectCurrentTimelineDraft, updateCurrentEventDraft, updateCurrentTimelineDraft} from "@/store/slices/contentsSlice";

const LinksPopoverExternalContent = ({linkObject}: {linkObject: any}) => {
    const dispatch = useDispatch();
    const modalType = useSelector(selectModalType)
    const currentTimelineDraft = useSelector(selectCurrentTimelineDraft)
    const currentEventDraft = useSelector(selectCurrentEventDraft)

    const thumbnailLink = modalType === 'information' ? currentTimelineDraft.thumbnailLink : currentEventDraft.thumbnailLink
    const isBaseImage = getIsBaseImage(linkObject.imageUrl)

    const handleClick = () => {
        dispatch(modalType === 'information' ? updateCurrentTimelineDraft({...currentTimelineDraft, thumbnailLink: linkObject.url}) : updateCurrentEventDraft({...currentEventDraft, thumbnailLink: linkObject.url}))
    }

    const title = linkObject.title.startsWith('www.') ? linkObject.title.slice(4) : linkObject.title;
    return (
        <button onClick={() => handleClick()} className={`p-1.5 w-full flex items-start gap-2.5 ${linkObject.url === thumbnailLink && 'bg-gray-200'} hover:bg-gray-100 rounded-sm`}>
            <div className={'relative shrink-0 w-[24px] h-[24px]'}>
                {isBaseImage
                    ? <>
                        <div className={'relative w-[24px] h-[24px] border-[0.1px] border-gray-300 rounded-sm flex items-center justify-center text-sm'}>
                            <span className={'absolute font-medium'}>{title.charAt(0).toUpperCase()}</span>
                        </div>
                    </>
                    : <Image className={'rounded-sm bg-gray-100'} src={linkObject.imageUrl} alt={title} fill={true} priority={true} style={{objectFit: "cover", objectPosition: "top"}}/>}
            </div>
            <div className={'min-h-[24px] flex flex-col justify-start'}>
                <div className={'w-full text-start text-sm font-medium flex-1 line-clamp-1'}>{title}</div>
                <div className={'line-clamp-1 w-full text-start text-xs text-gray-600'}>{linkObject.description}</div>
            </div>
        </button>
    );
};

export default LinksPopoverExternalContent;
