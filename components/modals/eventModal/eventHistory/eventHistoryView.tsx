import React from 'react';
import Link from "next/link";
import {useSelector} from "react-redux";
import {selectCurrentEventView} from "@/store/slices/contentsSlice";
import DiffButton from "@/components/modals/diffButton";
import EventModalImage from "@/components/modals/eventModal/eventViewEdit/eventModalImage";
import {unwrapPTag} from "@/utils/global";

const EventHistoryView = () => {
    const currentEventView = useSelector(selectCurrentEventView)

    return (
        <>
            <div className={'pb-3 flex items-baseline justify-between'}>
                <span className={'text-sm'}>Revision {currentEventView.revisionNo} by <Link href={`/@${currentEventView.contributors?.username}`} className={'font-medium hover:underline'}>{currentEventView.contributors?.username}</Link></span>
                {/*<DiffButton />*/}
                <div></div>
            </div>
            <hr/>
            <div className={'pt-4'}>
                <div className={`w-fit text-md font-medium`}>{currentEventView.date}</div>
                <h1 className={`w-full text-2xl font-bold`}>{currentEventView.title}</h1>
                <div className={'w-full flex items-center justify-center'}><EventModalImage event={currentEventView}/></div>
                <p className={'pt-3'}>{unwrapPTag(currentEventView.content)}</p>
            </div>
        </>
    );
};

export default EventHistoryView;
