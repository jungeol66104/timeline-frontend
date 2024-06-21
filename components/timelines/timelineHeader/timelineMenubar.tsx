import React from 'react';
import ContributorsButton from "@/components/common/contributorsButton";
import ContentTypeButton from "@/components/common/contentTypeButton";

const TimelineMenubar = () => {
    return (
        <div className={'relative pt-3 w-full flex justify-between bg-white'} style={{zIndex: 50}}>
            <ContributorsButton/>
            <ContentTypeButton />
        </div>
    )
}
export default TimelineMenubar
