import React from 'react';
import InformationTiptap from "@/components/timelines/timelineModal/informationTiptap";
import {useSelector} from "react-redux";
import {selectCurrentTimeline} from "@/store/slices/contentsSlice";
import EditButton from "@/components/timelines/timelineModal/editButton";
import ContributionButton from "@/components/timelines/timelineModal/contributionButton";

const InformationView = () => {
    const currentTimeline = useSelector(selectCurrentTimeline)

    return (
        <div>
            <div className={'tiptapMenubar sticky top-3 w-full flex justify-between py-3'}>
                <ContributionButton/>
                <EditButton/>
            </div>
            <hr/>
            <p className={'mt-3'}>{currentTimeline.content}</p>
        </div>
    );
};

export default InformationView;
