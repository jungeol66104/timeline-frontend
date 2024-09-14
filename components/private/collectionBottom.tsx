import React from 'react';
import {useSelector} from "react-redux";
import {selectIsBottomEnd} from "@/store/slices/appearanceSlice";
import {selectProfileType} from "@/store/slices/privateSlice";

const CollectionBottom = () => {
    const profileType = useSelector(selectProfileType);
    const isBottomEnd = useSelector(selectIsBottomEnd)

    const currentCollection = profileType === 'contributions' ? 'Contributions' : 'My Timelines'

    return (
        <div className={`${!isBottomEnd && 'invisible'} w-full h-[70px] flex items-center justify-center text-sm italic`}>
            <span className={'text-center'}>End of the Collection<br/><b>{currentCollection.charAt(0).toUpperCase() + currentCollection.slice(1)}</b></span>
        </div>
    );
};

export default CollectionBottom;
