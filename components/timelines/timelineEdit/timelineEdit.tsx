import TimelineEditMenubar from "@/components/timelines/timelineEdit/timelineEditMenubar";
import TimelineInformation from "@/components/timelines/timelineView/timelineInformation";
import Timeline from "@/components/timelines/timeline/timeline";
import Toolbar from "@/components/timelines/timelineView/toolbar";

const TimelineEdit = () => {
    return (
        <>
            <TimelineEditMenubar />
            <hr className={'mx-4'}/>
            <TimelineInformation/>
            <hr className={'mx-4'}/>
            <Timeline/>
            <Toolbar/>
        </>
    );
};

export default TimelineEdit;
