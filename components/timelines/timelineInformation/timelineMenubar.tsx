import React from 'react';
import ContributionButton from "@/components/timelines/timelineModal/contributionButton";
import EditTimelineButton from "@/components/timelines/timelineInformation/editTimelineButton";
import {useSelector} from "react-redux";
import {selectIsEdit} from "@/store/slices/appearanceSlice";
import CompleteButton from "@/components/timelines/timelineInformation/completeButton";
import AddEventButton from "@/components/timelines/timelineInformation/addEventButton";

const TimelineMenubar = () => {
    const isEdit = useSelector(selectIsEdit)


    return (
        // <div className={'sticky top-[90px] py-3 w-full flex justify-between bg-white'}>
        <div className={' py-3 w-full flex justify-between bg-white'}>
            {isEdit
                ?   <>
                        <AddEventButton />
                        <CompleteButton />
                    </>
                :   <>
                        <ContributionButton/>
                        <EditTimelineButton/>
                    </>
            }
        </div>
    );
};

export default TimelineMenubar;
