import {useDispatch, useSelector} from "react-redux";
import {selectTab, updateTab} from "@/store/slices/searchSlice";
import React from "react";
// refactoring: clear

const SearchTab = () => {
    const dispatch = useDispatch()
    const tab = useSelector(selectTab)

    return (
        <div className={'h-fit flex flex-col ml-4 mr-4'}>
            <div className={'flex'}>
                <div onClick={() => dispatch(updateTab('timeline'))} className={`cursor-pointer pt-2.5 pb-2.5 w-1/2 text-center font-semibold text-[14px]`} style={{transition: 'all 0.3s', color: tab === 'timeline' ? '#475569': '#94a3b8'}}>타임라인</div>
                <div onClick={() => dispatch(updateTab('event'))} className={`cursor-pointer pt-2.5 pb-2.5 w-1/2 text-center font-semibold text-[14px]`} style={{transition: 'all 0.3s', color: tab === 'event' ? '#475569': '#94a3b8'}}>이벤트</div>
            </div>
            <div className={`h-[2px] bg-gray-500`} style={{width: '50%', transition: 'transform 0s', transform: tab === 'timeline' ? 'translateX(0)' : 'translateX(100%)'}}></div>
        </div>
    )
}
export default SearchTab