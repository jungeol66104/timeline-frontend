import React from 'react';
import {useSelector} from "react-redux";
import {selectCurrentTimelineView} from "@/store/slices/contentsSlice";
import DiffButton from "@/components/modals/diffButton";
import Link from "next/link";
import InformationModalImage from "@/components/modals/informationModal/informationView/informationModalImage";

const InformationHistoryView = () => {
    const currentTimelineView = useSelector(selectCurrentTimelineView);

    return (
        <>
            <div className={'pb-3 flex items-baseline justify-between'}>
                <span className={'text-sm'}>Revision {currentTimelineView.revisionNo} by <Link href={`/@${currentTimelineView.contributors?.username}`} className={'font-medium hover:underline'}>{currentTimelineView.contributors?.username}</Link></span>
                <DiffButton />
            </div>
            <hr/>
            <div className={'pt-4'}>
                <h1 className={`w-full text-2xl font-bold`}>{currentTimelineView.title}</h1>
                <div className={`w-fit text-md`}>{currentTimelineView.description}</div>
                <div className={'w-full flex items-center justify-center'}><InformationModalImage information={currentTimelineView}/></div>
                <p className={'pt-3'}>{currentTimelineView.content}</p>
            </div>
        </>
    );
};

export default InformationHistoryView;
