import React from 'react'
import TimelineInformation from "@/components/timeline/timelineInformation";
import Timeline from "@/components/timeline/timeline";
import Toolbar from "@/components/timeline/toolbar";
import TimelineListRelated from "@/components/timeline/timelineListRelated";
import {useSelector} from "react-redux";
import {selectIsTopEnd} from "@/store/slices/appearanceSlice";
// timelineInformation, timeline, toolbar, relatedTimelines

const TimelineSectionPrimary = () => {
    const isTopEnd = useSelector(selectIsTopEnd)

    return (
        <div className={'relative w-full max-w-[600px] p-4 max-[908px]:pb-0'}>
            {isTopEnd
                ?   <>
                        <TimelineInformation />
                        <hr/>
                        <TimelineListRelated />
                        <hr/>
                    </>
                :   <></>
            }
            <Timeline />
            <Toolbar />
        </div>
    );
};

export default TimelineSectionPrimary;
