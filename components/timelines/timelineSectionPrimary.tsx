import {useSelector} from "react-redux";
import {selectTimelineContentType} from "@/store/slices/appearanceSlice";
import TimelineHead from "@/components/timelines/timelineHead";
import TimelineView from "@/components/timelines/timelineView/timelineView";
import TimelineEdit from "@/components/timelines/timelineEdit/timelineEdit";
import TimelineHistory from "@/components/timelines/timelineHistory/timelineHistory";
import TimelineNew from "@/components/timelines/timelineNew/timelineNew";
import TimelineMenubar from "@/components/timelines/timelineMenubar";
import InformationPreview from "@/components/timelines/informationPreview";
import Events from "@/components/timelines/events";
import RelatedTimelines from "@/components/timelines/timelineView/relatedTimelines";

const TimelineSectionPrimary = () => {
    const timelineContentType = useSelector(selectTimelineContentType)

    return (
        <div className={'p-4 w-full max-w-[630px] min-[852px]:min-w-[500px] flex flex-col gap-3'}>
            <TimelineMenubar />
            <InformationPreview />
            <RelatedTimelines />
            <Events />
        </div>
    )
}

export default TimelineSectionPrimary;
