import React from 'react';
import DynamicHead from "@/components/dynamicHead";
import NewTimelineSectionPrimary from "@/components/timelines/new/newTimelineSectionPrimary";
import NewTimelineSectionSecondary from "@/components/timelines/new/newTimelineSectionSecondary";

const NewTimelinePage = () => {

    return (
        <>
            <DynamicHead type={'index'}/>
            <div className={`page`}>
                <div className={'pageWrapper w-full flex'}>
                    <NewTimelineSectionPrimary />
                    <NewTimelineSectionSecondary />
                </div>
            </div>
        </>
    )
}
export default NewTimelinePage;
