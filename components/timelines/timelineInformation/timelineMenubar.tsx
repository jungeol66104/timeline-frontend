import React from 'react';
import ContributorsButton from "@/components/common/contributorsButton";
import EditTimelineButton from "@/components/timelines/timelineInformation/editTimelineButton";
import {useSelector} from "react-redux";
import {selectIsTimelineEdit} from "@/store/slices/appearanceSlice";
import CompleteButton from "@/components/timelines/timelineInformation/completeButton";
import AddEventButton from "@/components/timelines/timelineInformation/addEventButton";

const TimelineMenubar = () => {
    const isTimelineEdit = useSelector(selectIsTimelineEdit)

    return (
        // <div className={'sticky top-[90px] py-3 w-full flex justify-between bg-white'}>
        <div className={'relative py-3 w-full flex justify-between bg-white'} style={{zIndex: 50}}>
            {isTimelineEdit
                ?   <>
                        <AddEventButton />
                        <CompleteButton />
                    </>
                :   <>
                        <ContributorsButton/>
                        <EditTimelineButton/>
                    </>
            }
        </div>
    )
}
export default TimelineMenubar
