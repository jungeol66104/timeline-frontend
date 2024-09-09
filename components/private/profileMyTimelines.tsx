import React from 'react';
import {useSelector} from "react-redux";
import {selectCurrentTimelines} from "@/store/slices/contentsSlice";
import TimelinePreview from "@/components/index/timelinePreview";
import StartTimeliningButton from "@/components/about/startTimeliningButton";

const ProfileMyTimelines = () => {
    const currentTimelines = useSelector(selectCurrentTimelines)
    const isEmptyTimelines = currentTimelines.length === 0

    return (
        <div className={'w-full'}>
            {currentTimelines.map(timeline => {
                return <TimelinePreview key={timeline.id} timeline={timeline} />
            })}
            {isEmptyTimelines &&
                <div className='timeline relative py-10 px-4 w-full flex flex-col items-center justify-center gap-5'>
                    <div className={'text-center'}>
                        <h2 className={'text-xl font-semibold'}>No Timelines</h2>
                        <div>Create your first event for the timeline.</div>
                    </div>
                    <StartTimeliningButton />
                </div>
            }
        </div>
    );
};

export default ProfileMyTimelines;
