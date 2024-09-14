import {getIsBaseImage} from "@/utils/global";
import React from 'react';
import Link from "next/link";
import Image from "next/image";
import {useSelector} from "react-redux";
import {selectDemoKeyConcept, selectTimelineType} from "@/store/slices/appearanceSlice";

const UsernameButton = ({user} : {user: any}) => {
    const {username, cdnUrl, imagePath} = user

    const timelineType = useSelector(selectTimelineType);
    const demoKeyConcept = useSelector(selectDemoKeyConcept);

    const isBaseImage = getIsBaseImage(imagePath)

    const handleClick = (e: React.MouseEvent) => {
        if (timelineType === 'demo') e.preventDefault();
    }

    return (
        <Link href={`/@${username}`} onClick={handleClick} className={`flex items-center justify-center gap-2.5 px-2 h-[36px] border-[0.1px] border-gray-300 bg-white hover:bg-gray-100 ${timelineType === 'demo' && demoKeyConcept === 'private' && 'outline outline-2 outline-blue-700'} drop-shadow-sm rounded-md`}>
            {isBaseImage && <div className={'w-[25px] h-[25px] rounded-full flex items-center justify-center bg-gray-600 text-white text-xs border-[1px] border-white shrink-0'}>{username && username[0].toUpperCase()}</div>}
            {!isBaseImage && <div className={'overflow-hidden relative w-[25px] h-[25px] rounded-full border-[1px] border-white shrink-0'}><Image className={'rounded-full'} src={cdnUrl + imagePath} alt={username} fill priority style={{objectFit: "cover", objectPosition: "top"}}/></div>}
            <span className={`max-[650px]:hidden text-sm font-semibold`}>{username}</span>
        </Link>
    );
};

export default UsernameButton;
