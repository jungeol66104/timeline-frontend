import React from 'react';
import TimelineListPopular from "@/components/timeline/timelineListPopular";
import TimelineListRecentlyAdded from "@/components/timeline/timelineListRecentlyAdded";
import {useSelector} from "react-redux";
import {selectIsBottomEnd} from "@/store/slices/appearanceSlice";

const TimelineSectionSecondary = () => {
    const isBottomEnd = useSelector(selectIsBottomEnd)

    return (
        <div className={`w-full min-w-[300px] max-w-[350px] ml-2 p-4 max-[908px]:max-w-[600px] max-[908px]:ml-0 max-[908px]:py-0 ${!isBottomEnd && 'max-[908px]:hidden'}`}>
            <hr/>
            <TimelineListPopular />
            <hr/>
            <TimelineListRecentlyAdded />
            <hr/>
        </div>
    );
};

export default TimelineSectionSecondary;
