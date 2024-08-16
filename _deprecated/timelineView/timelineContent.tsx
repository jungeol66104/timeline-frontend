// import React from 'react'
// import {useDispatch, useSelector} from "react-redux";
// import {selectCurrentTimeline, selectCurrentTimelineDraft} from "@/store/slices/contentsSlice";
// import {selectTimelineContentType, updateModalType} from "@/store/slices/appearanceSlice";
// import TimelineContentImage from "@/components/timelines/timelineView/timelineContentImage";
// import ShowMoreButton from "@/components/timelines/timelineView/showMoreButton";
//
// const TimelineContent = () => {
//     const currentTimeline = useSelector(selectCurrentTimeline)
//     const currentTimelineDraft = useSelector(selectCurrentTimelineDraft)
//     const timelineContentType = useSelector(selectTimelineContentType)
//     const isTimelineEditable = timelineContentType === 'edit' || timelineContentType === 'new'
//     const timeline = isTimelineEditable ? currentTimelineDraft : currentTimeline
//
//     return (
//         <div className={`timelineInformation`}>
//             <div className={'py-3 px-4'}>
//                 <TimelineContentImage src={timeline.image} alt={timeline.name} imageSize={timeline.imageSize}/>
//                 <div className={'h-[120px]'}>
//                     {isTimelineEditable && currentTimelineDraft.content === '' &&
//                         <p className={`text-sm line-clamp-5`}>Click &#39;Show more&#39; below to write or fix contents displayed here.</p>
//                     }
//                     <p className={`text-sm line-clamp-5`}>{timeline.content}</p>
//                     <ShowMoreButton />
//                 </div>
//             </div>
//         </div>
//     )
// }
// export default TimelineContent
