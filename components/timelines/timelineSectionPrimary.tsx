import TimelineMenubar from "@/components/timelines/timelineMenubar";
import InformationPreview from "@/components/timelines/informationPreview";
import RelatedTimelines from "@/components/timelines/relatedTimelines";
import Events from "@/components/timelines/events";

const TimelineSectionPrimary = () => {
    return (
        <div className={'px-2 py-3 w-full max-w-[630px] min-[852px]:min-w-[500px] flex flex-col gap-3'}>
            <TimelineMenubar />
            <InformationPreview />
            <RelatedTimelines />
            <Events />
        </div>
    )
}

export default TimelineSectionPrimary;
