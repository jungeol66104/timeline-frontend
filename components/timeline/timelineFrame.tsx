import {useSelector} from "react-redux";
import {selectTotalHeight} from "@/store/slices/effectsSlice";

const TimelineFrame = () => {
    const totalHeight = useSelector(selectTotalHeight)

    return <div className={`timelineFrame w-3 h-[10px] relative animate-fadeIn`}><div className={`absolute w-0.5 bg-gray-600 left-1/2`} style={{height: `${totalHeight + 20}px`, transform:'translate(-50%,-0)'}}></div></div>
}

export default TimelineFrame