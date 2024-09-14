import React from 'react';
import Link from "next/link";
import Image from "next/image";
import { useRouter } from 'next/router';
import {useSelector} from "react-redux";
import {Timeline} from "@/store/slices/contentsSlice";
import {selectSession} from "@/store/slices/privateSlice";
import {getIsBaseImage, mapStrToNum, unwrapPTag} from "@/utils/global";

const TimelinePreview = ({timeline}: {timeline: Timeline}) => {
    const router = useRouter();
    const user = router.query.user as string

    const session = useSelector(selectSession);

    const href = user && user.startsWith('@') ? `/@${session.username}/timelines/${timeline.id}` : `/timelines/${timeline.id}`
    const isBaseImage = getIsBaseImage(timeline.imagePath)

    return (
        <Link key={timeline.id} href={href}>
            <div className={'py-3'}>
                <div className={'font-bold line-clamp-1'}>{timeline.title}</div>
                <div className={'w-full flex justify-between'}>
                    <div>
                        <div className={'text-sm text-gray-500 line-clamp-1'}>{timeline.description}</div>
                        <p className={'mt-1 text-sm line-clamp-3'}>{unwrapPTag(timeline.content)}</p>
                    </div>
                    <div className={'ml-1 relative w-[84px] h-[84px] shrink-0'}>
                        {isBaseImage && <Image src={`/images/base-image/base-image${mapStrToNum(timeline.title)}.jpg`} alt={'base-image'} fill priority className={'rounded-md bg-gray-100'}/>}
                        {!isBaseImage && <Image src={timeline.cdnUrl! + timeline.imagePath!} alt={timeline.title} fill={true} priority={true} style={{objectFit: "cover", objectPosition: "top"}} className={'rounded-md bg-gray-100'}/>}
                    </div>
                </div>
            </div>
            <hr className={'border-gray-200'}/>
        </Link>
    );
};

export default TimelinePreview;
