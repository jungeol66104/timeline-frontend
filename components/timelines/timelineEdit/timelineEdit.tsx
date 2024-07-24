import TimelineEditMenubar from "@/components/timelines/timelineEdit/timelineEditMenubar";
import TimelineContent from "@/components/timelines/timelineView/timelineContent";
import Timeline from "@/components/timelines/timeline/timeline";
import Toolbar from "@/components/timelines/toolbar";

const TimelineEdit = () => {
    return (
        <div>
            <TimelineEditMenubar />
            <hr className={'mx-4'}/>
            <TimelineContent/>
            <hr className={'mx-4'}/>
            <Timeline/>
            <Toolbar/>
        </div>
    );
};

export default TimelineEdit;
