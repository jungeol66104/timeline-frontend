// import {useSelector} from "react-redux";
// import {selectCurrentTimeline} from "@/store/slices/contentsSlice";
// import {selectDemoKeyConcept, selectTimelineContentType, selectTimelineType} from "@/store/slices/appearanceSlice";
// import TimelineMenubar from "@/components/timelines/timelineMenubar";
// import TimelineNameEdit from "@/components/timelines/timelineEdit/timelineNameEdit";
// // import TimelineDescriptionEdit from "@/components/timelines/timelineEdit/timelineDescriptionEdit";
//
// const TimelineHead = () => {
//     const currentTimeline = useSelector(selectCurrentTimeline)
//     const timelineContentType = useSelector(selectTimelineContentType)
//     const timelineType = useSelector(selectTimelineType);
//     const demoKeyConcept = useSelector(selectDemoKeyConcept);
//
//     const isTimelineEditable = timelineContentType === 'edit' || timelineContentType === 'new'
//     const showPrivateFlag = timelineType !== 'private' && !(timelineType === 'demo' && demoKeyConcept === 'private')
//
//     return (
//         <div className={'z-50 pt-4 px-4'}>
//             <div className={'relative'}>
//                 {timelineContentType === 'new' || (timelineType === 'private' && timelineContentType === 'edit')
//                     ?   <TimelineNameEdit />
//                     :   <h1 className={`timelineInformationName w-fit flex items-center gap-2`}>
//                             <span className={'text-2xl font-bold'}>{currentTimeline.name}</span>
//                             <span className={`px-1.5 py-1 text-[10px] text-gray-400 font-semibold border-[1px] border-gray-400 ${showPrivateFlag && 'hidden'} ${timelineType === 'demo' && demoKeyConcept === 'private' && 'outline outline-2 outline-blue-700'} rounded-full`}>PRIVATE</span>
//                         </h1>
//                 }
//                 {isTimelineEditable
//                     ?   <TimelineDescriptionEdit />
//                     :   <div className={`w-fit text-md`}>{currentTimeline.description}</div>
//                 }
//                 <div className={'my-1 text-gray-400 text-sm'}>{timelineContentType === 'new' ? 'Created:' : 'Last Updated:'} January 14, 2024</div>
//             </div>
//             <TimelineMenubar/>
//         </div>
//     )
// }
// export default TimelineHead
