import {useSelector} from "react-redux";
import {selectCurrentEventsDraft} from "@/store/slices/contentsSlice";
import TimelineEditMenubar from "@/components/timelines/timelineEdit/timelineEditMenubar";
import TimelineContent from "@/components/timelines/timelineView/timelineContent";
import Timeline from "@/components/timelines/timeline/timeline";
import Toolbar from "@/components/timelines/toolbar";
import EmptyTimeline from "@/components/timelines/timelineEdit/emptyTimeline";

const TimelineEdit = () => {
    const currentEventsDraft = useSelector(selectCurrentEventsDraft);

    return (
        <div>
            <TimelineEditMenubar />
            <hr className={'mx-4'}/>
            <TimelineContent/>
            <hr className={'mx-4'}/>
            {currentEventsDraft.length > 0
                ?   <Timeline/>
                :   <EmptyTimeline />
            }
            {currentEventsDraft.length > 0 && <Toolbar/>}
        </div>
    );
};

export default TimelineEdit;
