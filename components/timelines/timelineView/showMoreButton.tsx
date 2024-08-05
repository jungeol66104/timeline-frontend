import React from 'react';
import {selectDemoKeyConcept, selectTimelineType, updateModalType} from "@/store/slices/appearanceSlice";
import {useDispatch, useSelector} from "react-redux";

const ShowMoreButton = () => {
    const dispatch = useDispatch()
    const timelineType = useSelector(selectTimelineType);
    const demoKeyConcept = useSelector(selectDemoKeyConcept);

    const handleClick = async () => {
        try {
            dispatch(updateModalType('information'))
            return
        } catch (error) {
            console.error('Error fetching data in useEffect: ', error)
            return
        }
    }

    return (
        <button onClick={handleClick} className={`text-sm text-blue-700 hover:underline ${timelineType === 'demo' && demoKeyConcept === 'showMore' && 'font-bold'}`}>Show more</button>
    );
};

export default ShowMoreButton;
