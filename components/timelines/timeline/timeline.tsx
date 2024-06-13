import TimelineFrame from "@/components/timelines/timeline/timelineFrame";
import TimelineEvents from "@/components/timelines/timeline/timelineEvents";
import useOperateTimeline from "@/hooks/useOperateTimeline";
import TimelineModalEvent from "@/components/modal/eventModal/timelineModalEvent";
import TimelineModalInformation from "@/components/modal/informationModal/timelineModalInformation";
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