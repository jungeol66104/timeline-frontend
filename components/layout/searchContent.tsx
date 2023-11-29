import {TimelineEvent} from "@/store/slices/contentsSlice";
import Link from "next/link";
import Image from "next/image";
import NorthwestSVG from "@/public/svg/northwest.svg";
import React from "react";
// refactoring: clear

const SearchContent = ({timeline, event}: {timeline?: any,event?: TimelineEvent}) => {
    return (
        <Link href={ timeline ? `/timelines/${timeline.id}` : `/events/${event?.id}`}>
            <div className={'flex items-center pt-[12px] pb-[12px] gap-2.5'}>
                <div><Image src={NorthwestSVG} alt={'northwest'} width={20} height={20} /></div>
                <div className={'font-black flex-1 line-clamp-1'} >{event ? event.name : timeline.name }</div>
                <div className={'text-sm text-gray-500'}>{event ? event.date :`#`}</div>
            </div>
        </Link>
    )
}
export default SearchContent