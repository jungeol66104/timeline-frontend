// import {useDispatch, useSelector} from "react-redux";
// import {TimelineEvent, updateCurrentEvent, updateCurrentEventDraft} from "@/store/slices/contentsSlice";
// import {selectDemoKeyConcept, selectTimelineContentType, selectTimelineType, updateModalType} from "@/store/slices/appearanceSlice";
// import KeynoteCheckbox from "@/components/timelines/timeline/keynoteCheckbox";
// import DetachButton from "@/components/timelines/timeline/disconnectButton";
// import EventContentImage from "@/components/timelines/timeline/eventContentImage";
// import {getIsBaseImage} from "@/utils/global";
// import api from "@/pages/api/api";
//
// const EventContent = ({event} : {event: TimelineEvent}) => {
//     const dispatch = useDispatch()
//     const timelineType = useSelector(selectTimelineType);
//     const demoKeyConcept = useSelector(selectDemoKeyConcept);
//     const timelineContentType = useSelector(selectTimelineContentType)
//     const isTimelineEditable = timelineContentType === 'edit' || timelineContentType === 'new'
//     const isBaseImage = getIsBaseImage(event.image)
//
//     const handleClick = async () => {
//         try {
//             const response = await api.get(`/event/${Number(event.id)}`, {headers: {lang: 'en'}})
//             let currentEvent = response.data.data
//             if (timelineType === 'demo') currentEvent = event
//             dispatch(updateCurrentEvent(currentEvent))
//             dispatch(updateCurrentEventDraft(currentEvent))
//             dispatch(updateModalType('event'))
//             return
//         } catch (error) {
//             console.error('Error fetching data in useEffect: ', error)
//             return
//         }
//     }
//
//     return (
//         <div className={`eventContent relative w-full border-[0.1px] ${timelineType === 'demo' && demoKeyConcept === 'event' && 'outline outline-2 outline-blue-700'} border-gray-300 rounded-xl shadow-md`}>
//             <div className={`${!isTimelineEditable && 'hidden'}`}>
//                 <div className={`p-2.5 flex items-center justify-between`}>
//                     <KeynoteCheckbox event={event} />
//                     <DetachButton event={event} />
//                 </div>
//                 <hr />
//             </div>
//             <div onClick={handleClick} className={`cursor-pointer p-2.5 min-h-[112px] flex flex-col bg-white rounded-xl`}>
//                 <div className={'text-xs font-semibold text-gray-500 line-clamp-1 text-ellipsis'}>{event.date}</div>
//                 <div className={'mt-0.5 text-md font-bold'}>{event.name}</div>
//                 <div className={'mt-1 flex justify-between gap-1'}>
//                     <div className={`text-sm whitespace-pre-wrap break-words ${isBaseImage ? 'line-clamp-3' : 'line-clamp-4'}`}>{event.description}</div>
//                     <EventContentImage src={event.image} alt={event.name} />
//                 </div>
//             </div>
//         </div>
//     )
// }
//
// export default EventContent;
