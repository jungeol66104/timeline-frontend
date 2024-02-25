import TimelineHeader from "@/components/timeline/timeilneHeader";
// refactoring: clear

const TimelineEventsEdge = ({type, isEnd} : {type: string, isEnd: boolean}) => {
    return (
        <div className={'timelineEventsEdge relative flex items-center justify-center bg-white h-[60px]'} style={{padding: type === 'top' && isEnd ? '0 0 0 0' : type === 'bottom' ? '0 0 10px 22px' : '10px 0 0 22px', justifyContent: type === 'top' && isEnd ? 'left' : "center", zIndex: type === 'top' && isEnd ? 4999 : 0, margin: type === 'top' ? '0 0 10px 0': '10px 0 0 0'}}>
            { !isEnd
                ? <div className={'h-[15px] w-[15px] rounded-full border-gray-600 border-l-white border-2 animate-spin'}></div>
                : type === 'top'
                    ?  <TimelineHeader />
                    :  <></>
            }
        </div>
    )
}
export default TimelineEventsEdge