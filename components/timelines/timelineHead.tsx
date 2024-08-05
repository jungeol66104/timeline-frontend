import {useSelector} from "react-redux";
import {selectCurrentTimeline} from "@/store/slices/contentsSlice";
import {selectTimelineContentType} from "@/store/slices/appearanceSlice";
import TimelineMenubar from "@/components/timelines/timelineMenubar";
import TimelineNameEdit from "@/components/timelines/timelineEdit/timelineNameEdit";
import TimelineDescriptionEdit from "@/components/timelines/timelineEdit/timelineDescriptionEdit";

const TimelineHead = () => {
    const currentTimeline = useSelector(selectCurrentTimeline)
    const timelineContentType = useSelector(selectTimelineContentType)
    const isTimelineEditable = timelineContentType === 'edit' || timelineContentType === 'new'

    return (
        <div className={'pt-4 px-4 z-50'}>
            <div className={'relative'}>
                {isTimelineEditable
                    ?   <TimelineNameEdit />
                    :   <h1 className={`timelineInformationName w-fit text-2xl font-bold`}>{currentTimeline.name}</h1>
                }
                {isTimelineEditable
                    ?   <TimelineDescriptionEdit />
                    :   <div className={`w-fit text-md`}>{currentTimeline.description}</div>
                }
                <div className={'my-1 flex gap-1 text-gray-400 text-sm'}>{timelineContentType === 'new' ? 'Created:' : 'Last Updated:'} January 14, 2024</div>
            </div>
            <TimelineMenubar/>
        </div>
    )
}
export default TimelineHead
