import {useSelector} from "react-redux";
import {selectTotalHeight} from "@/store/slices/appearanceSlice";
// refactoring: clear

const TimelineFrame = () => {
    const totalHeight = useSelector(selectTotalHeight)

    return (
        <div className={`timelineFrame absolute z-10 w-0.5 bg-gray-600 left-[6px] mx-4 h-full`} style={{transform:'translate(-50%,-0)'}}></div>
    )
}
export default TimelineFrame