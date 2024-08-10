import React from 'react';
import Link from "next/link";
import Image from "next/image";
import {Timeline} from "@/store/slices/contentsSlice";
import {getIsBaseImage, mapStrToNum} from "@/utils/global";
import {useSelector} from "react-redux";
import {selectTimelineType} from "@/store/slices/appearanceSlice";
import {selectSession} from "@/store/slices/privateSlice";

const TimelinePreview = ({timeline}: {timeline: Timeline}) => {
    const session = useSelector(selectSession);
    const timelineType = useSelector(selectTimelineType)
    const href = timelineType === 'private' ? `/${session.nickName}/timelines/${timeline.id}` : `/timelines/${timeline.id}`
    const isBaseImage = getIsBaseImage(timeline.image)

    return (
        <Link key={timeline.id} href={href}>
            <div className={'py-3'}>
                <div className={'font-bold line-clamp-1'}>{timeline.name}</div>
                <div className={'flex gap-1'}>
                    <div>
                        <div className={'text-sm text-gray-500 line-clamp-1'}>{timeline.description}</div>
                        <p className={'mt-1 text-sm line-clamp-3'}>{timeline.content}</p>
                    </div>
                    <div className={'relative w-[84px] h-[84px] shrink-0'}>
                        {isBaseImage
                            ? <>
                                <div className={'absolute bottom-[1px] right-0 w-[80px] h-[80px] rounded-md text-white flex items-center justify-center'}>
                                    <Image src={`/images/base-image/base-image${mapStrToNum(timeline.name)}.jpg`} alt={'base-image'} fill priority className={'rounded-md bg-gray-100'}/>
                                </div>
                            </>
                            : <Image src={timeline.image} alt={timeline.name} fill={true} priority={true} style={{objectFit: "cover", objectPosition: "top"}} className={'rounded-md bg-gray-100'}/>
                        }
                    </div>
                </div>
            </div>
            <hr className={'border-gray-200'}/>
        </Link>
    );
};

export default TimelinePreview;
