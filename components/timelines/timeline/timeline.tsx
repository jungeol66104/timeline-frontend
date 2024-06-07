import TimelineFrame from "@/components/timelines/timeline/timelineFrame";
import TimelineEvents from "@/components/timelines/timeline/timelineEvents";
import useOperateTimeline from "@/hooks/useOperateTimeline";
import TimelineModalEvent from "@/components/timelines/timelineModal/timelineModalEvent";
import TimelineModalInformation from "@/components/timelines/timelineModal/timelineModalInformation";
import {useDisableScroll} from "@/hooks/useScroll";

const Timeline = () => {
    useOperateTimeline()
    useDisableScroll()

    return (
        <div className='timeline relative w-full'>
            <TimelineFrame />
            <TimelineEvents />
            <TimelineModalInformation />
            <TimelineModalEvent />
        </div>
    )
}
export default Timeline