import React from 'react';
import {useSelector} from "react-redux";
import {selectEditPopoverType, selectEventContentType, selectInformationContentType, selectModalType} from "@/store/slices/appearanceSlice";
import {selectCurrentEventDraft, selectCurrentEvents} from "@/store/slices/contentsSlice";
import KeynoteButton from "@/components/modals/eventModal/eventViewEdit/editMenu/keynoteButton";
import DetachButton from "@/components/modals/eventModal/eventViewEdit/editMenu/detachButton";
import LinksButton from "@/components/modals/commonEditMenu/linksButton";

const EditMorePopover = () => {
    const editPopoverType = useSelector(selectEditPopoverType)
    const modalType = useSelector(selectModalType)
    const eventContentType = useSelector(selectEventContentType)
    const informationContentType = useSelector(selectInformationContentType)
    const currentEvents = useSelector(selectCurrentEvents)
    const currentEventDraft = useSelector(selectCurrentEventDraft)

    const contentType = modalType === 'information' ? informationContentType : eventContentType
    const isCreated = currentEvents.findIndex((event) => event.id === currentEventDraft.id) !== -1

    return (
        <div id={'editMorePopover'} className={`${editPopoverType !== 'editMore' && 'hidden'} absolute bottom-0 p-1.5 w-full max-w-[300px] max-h-[170px] flex flex-col gap-1.5 border-[0.1px] border-gray-300 bg-white drop-shadow-sm rounded-md`} style={{right: 0}}>
            <div className={'flex items-center justify-between gap-2'}>
                <div className={'pl-1.5 text-sm font-medium line-clamp-2'}>Select a thumbnail link</div>
                <LinksButton/>
            </div>
            {modalType === 'event' &&
                <>
                    <hr/>
                    <div className={'flex items-center justify-between gap-2'}>
                        <div className={'pl-1.5 text-sm font-medium line-clamp-2'}>Display as key event</div>
                        <KeynoteButton/>
                    </div>
                </>
            }
            {(modalType === 'event' && (contentType === 'edit' || (contentType === 'new' && isCreated))) &&
                <>
                    <hr/>
                    <div className={'flex items-center justify-between gap-2'}>
                        <div className={'pl-1.5 text-sm font-medium line-clamp-2'}>Remove from the timeline</div>
                        <DetachButton/>
                    </div>
                </>}
        </div>
    );
};

export default EditMorePopover;
