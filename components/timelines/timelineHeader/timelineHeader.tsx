import {useSelector} from "react-redux";
import {selectCurrentTimeline} from "@/store/slices/contentsSlice";
import TimelineMenubar from "@/components/timelines/timelineHeader/timelineMenubar";

const TimelineHeader = () => {
    const currentTimeline = useSelector(selectCurrentTimeline)

    return (
        <div className={'pt-4 px-4 z-50'}>
            <div>
                <h1 className={'timelineInformationName text-2xl font-bold'}>{currentTimeline.name}</h1>
                <div className={'text-md'}>{currentTimeline.description}</div>
                <div className={'my-1 flex gap-1 text-gray-400 text-sm'}>Last Updated: January 14, 2024</div>
            </div>
            <TimelineMenubar/>
        </div>
    )
}
export default TimelineHeader
