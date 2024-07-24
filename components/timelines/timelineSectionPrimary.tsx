import {useSelector} from "react-redux";
import {selectTimelineContentType} from "@/store/slices/appearanceSlice";
import TimelineHead from "@/components/timelines/timelineHead";
import TimelineView from "@/components/timelines/timelineView/timelineView";
import TimelineEdit from "@/components/timelines/timelineEdit/timelineEdit";
import TimelineHistory from "@/components/timelines/timelineHistory/timelineHistory";
import TimelineNew from "@/components/timelines/timelineNew/timelineNew";

const TimelineSectionPrimary = () => {
    const timelineContentType = useSelector(selectTimelineContentType)

    return (
        <div className={'relative w-full max-w-[630px] min-[852px]:min-w-[500px]'}>
            <TimelineHead />
            {timelineContentType === 'view' && <TimelineView />}
            {timelineContentType === 'edit' && <TimelineEdit />}
            {timelineContentType === 'history' && <TimelineHistory />}
            {timelineContentType === 'new' && <TimelineNew />}
        </div>
    )
}

export default TimelineSectionPrimary;
