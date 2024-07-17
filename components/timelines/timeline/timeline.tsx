import TimelineFrame from "@/components/timelines/timeline/timelineFrame";
import TimelineEvents from "@/components/timelines/timeline/timelineEvents";
import useOperateTimeline from "@/hooks/useOperateTimeline";
import useOperateTimelineTest from "@/hooks/useOperateTimelineTest";

const Timeline = () => {
    // useOperateTimeline()
    useOperateTimelineTest()

    return (
        <div className='timeline relative px-4 w-full'>
            <TimelineFrame />
            <TimelineEvents />
        </div>
    )
}
export default Timeline