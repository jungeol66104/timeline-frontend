import {useSelector} from "react-redux";
import {selectCurrentEventsDraft} from "@/store/slices/contentsSlice";
import TimelineInformation from "@/components/timelines/timelineView/timelineInformation";
import Timeline from "@/components/timelines/timeline/timeline";
import EmptyTimeline from "@/components/timelines/timelineNew/emptyTimeline";
import Toolbar from "@/components/timelines/toolbar";
import TimelineNewMenubar from "@/components/timelines/timelineNew/timelineNewMenubar";

const TimelineNew = () => {
    const currentEventsDraft = useSelector(selectCurrentEventsDraft)

    return (
        <div>
            <TimelineNewMenubar />
            <hr className={'mx-4'}/>
            <TimelineInformation/>
            <hr className={'mx-4'}/>
            {currentEventsDraft.length > 0
                ?   <Timeline/>
                :   <EmptyTimeline />
            }
            {currentEventsDraft.length > 0 && <Toolbar/>}
        </div>
    );
};

export default TimelineNew;
