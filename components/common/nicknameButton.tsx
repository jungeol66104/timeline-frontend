import React from 'react';
import Link from "next/link";
import {useSelector} from "react-redux";
import {selectDemoKeyConcept, selectTimelineType} from "@/store/slices/appearanceSlice";

const NicknameButton = ({name} : {name: string}) => {
    const timelineType = useSelector(selectTimelineType);
    const demoKeyConcept = useSelector(selectDemoKeyConcept);

    return (
        <Link href={'/'} className={`flex items-center justify-center gap-2.5 px-2 h-[36px] border-[0.1px] border-gray-300 bg-white hover:bg-gray-100 ${timelineType === 'demo' && demoKeyConcept === 'private' && 'outline outline-2 outline-blue-700'} drop-shadow-sm rounded-md`}>
                <div className={'w-[26px] h-[26px] rounded-full flex items-center justify-center bg-gray-600 text-white text-xs border-[1px] border-white shrink-0'}>{name.slice(0,2).toUpperCase()}</div>
                <span className={`max-[650px]:hidden text-sm font-semibold`}>{name}</span>
        </Link>
    );
};

export default NicknameButton;
