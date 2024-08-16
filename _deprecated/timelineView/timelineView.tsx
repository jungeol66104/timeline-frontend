// import React from 'react';
// import RelatedTimelines from "@/components/timelines/relatedTimelines";
// import Timeline from "@/components/timelines/timeline/timeline";
// import Toolbar from "@/components/timelines/toolbar";
// import TimelineContent from "@/components/timelines/timelineView/timelineContent";
// import {useSelector} from "react-redux";
// import {selectTimelineType} from "@/store/slices/appearanceSlice";
//
// const TimelineView = () => {
//     const timelineType = useSelector(selectTimelineType)
//
//     return (
//         <div>
//             <hr className={'mt-3 mx-4'}/>
//             <TimelineContent/>
//             <hr className={`mx-4 ${(timelineType === 'demo' || timelineType === 'private') && 'hidden'}`}/>
//             <RelatedTimelines/>
//             <hr className={'mx-4'}/>
//             <Timeline/>
//             <Toolbar/>
//         </div>
//     );
// };
//
// export default TimelineView;
