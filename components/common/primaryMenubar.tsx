import React from 'react';
import ContributorsButton from "@/components/common/contributorsButton";
import ContentTypeButton from "@/components/common/contentTypeButton";

const PrimaryMenubar = () => {
    return (
        <div className={'tiptapMenubar w-full flex justify-between z-10'}>
            <ContributorsButton/>
            <ContentTypeButton/>
        </div>
    );
};

export default PrimaryMenubar;
