import React from 'react';
import EventListTemplate from "@/components/index/eventListTemplate";
import {useSelector} from "react-redux";
import {selectIsBottomEnd} from "@/store/slices/appearanceSlice";

const IndexSectionSecondary = () => {
    const isBottomEnd = useSelector(selectIsBottomEnd)

    return (
        <div className={`relative w-full min-w-[300px] max-w-[350px] max-[928px]:max-w-[600px] ${!isBottomEnd && 'max-[928px]:hidden'} ml-2 max-[928px]:ml-0`}>
            <div className={'secondaryWrapper relative w-full h-fit min-w-[300px] max-w-[350px] p-4 max-[928px]:max-w-[600px] max-[928px]:py-0'}>
                <hr/>
                <EventListTemplate />
                <hr/>
            </div>
        </div>
    );
};

export default IndexSectionSecondary;
