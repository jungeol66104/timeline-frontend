import React from 'react';
import ContributorsButton from "@/components/common/contributorsButton";
import ContentTypeButton from "@/components/common/contentTypeButton";

const TimelineMenubar = () => {
    return (
        <div className={'tiptapMenubar sticky top-3 w-full flex justify-between'}>
            <ContributorsButton/>
            <ContentTypeButton/>
        </div>
    );
};

export default TimelineMenubar;
