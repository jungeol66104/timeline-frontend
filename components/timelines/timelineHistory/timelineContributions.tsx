import React from 'react';
import Contribution from "@/components/common/contribution";

const TimelineContributions = () => {


    return (
        <div className={'px-4'}>
            {Array(10).fill(null).map((_, i) => {
                return (
                    <Contribution key={i} />
                )
            })}
        </div>
    );
};

export default TimelineContributions;
