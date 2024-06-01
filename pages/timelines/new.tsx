import React, {useLayoutEffect} from 'react';
import DynamicHead from "@/components/dynamicHead";
import {useSelector} from "react-redux";
import {selectCurrentTimeline} from "@/store/slices/contentsSlice";

const NewTimelinePage = () => {
    const currentTimeline = useSelector(selectCurrentTimeline)

    useLayoutEffect(() => {

    }, [])

    return (
        <>
            <DynamicHead type={'index'}/>
            <div className={`page timelinePage`}>
                <div className={'timelinePageWrapper w-full flex'}>
                    <div className={'relative px-4 pt-4 pb-0 w-full min-[852px]:min-w-[500px] max-w-[630px]'}>
                        <div>information</div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default NewTimelinePage;
