import React from 'react';
import {useSelector} from "react-redux";
import {selectCurrentTimeline} from "@/store/slices/contentsSlice";
import EditButton from "@/components/personal/editButton";
import ContributorsButton from "@/components/common/contributorsButton";
import ContentTypeButton from "@/components/common/contentTypeButton";

const InformationView = () => {
    const currentTimeline = useSelector(selectCurrentTimeline)

    return (
        <div>
            <div className={'viewMenubar sticky top-3 w-full flex justify-between py-3'}>
                <ContributorsButton/>
                <ContentTypeButton />
            </div>
            <hr/>
            <p className={'mt-3'}>{currentTimeline.content}</p>
        </div>
    );
};

export default InformationView;
