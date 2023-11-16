import {useSelector} from "react-redux";
import {selectTotalHeight} from "@/store/slices/appearanceSlice";
// refactoring: clear

const TimelineFrame = () => {
    const totalHeight = useSelector(selectTotalHeight)
    return (
        <div className={`timelineFrame absolute w-0.5 bg-gray-600 left-[6px]`} style={{height: `${totalHeight + 20}px`, transform:'translate(-50%,-0)'}}></div>
    )
}
export default TimelineFrame