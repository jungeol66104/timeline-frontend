import {useSelector} from "react-redux";
import TimelineHeader from "@/components/timelines/timelineHeader/timelineHeader";
import TimelineView from "@/components/timelines/timelineView/timelineView";
import TimelineHistory from "@/components/timelines/timelineHistory/timelineHistory";
import TimelineEdit from "@/components/timelines/timelineEdit/timelineEdit";
import {selectTimelineContentType} from "@/store/slices/appearanceSlice";

const TimelineSectionPrimary = () => {
    const timelineContentType = useSelector(selectTimelineContentType)

    return (
        <div className={'relative w-full max-w-[630px] min-[852px]:min-w-[500px]'}>
            <TimelineHeader />
            {timelineContentType === 'view'
                ?   <TimelineView />
                :   timelineContentType === 'history'
                    ?   <TimelineHistory />
                    :   <TimelineEdit />
            }
        </div>
    )
}
export default TimelineSectionPrimary;
