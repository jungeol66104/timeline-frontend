import React from 'react';
import {useSelector} from "react-redux";
import {selectCurrentSerieses, SeriesTimeline} from "@/store/slices/contentsSlice";
import Image from "next/image";
import {getIsBaseImage, mapStrToNum} from "@/utils/global";

const TimelineListTrending = () => {
    const serieses = useSelector(selectCurrentSerieses)
    const nl: SeriesTimeline[] = serieses[2]["timelines"].slice(5,)

    return (
        <div>
            <h3 className={'text-[20px] font-bold py-3'}>Recently Added</h3>
            {nl.map((timeline, i) => {
                const isBaseImage = getIsBaseImage(timeline.image)

                return (
                    <div key={i} className={'cursor-pointer py-2 flex justify-between hover:underline'}>
                        <div>
                            <div className={'font-medium line-clamp-1'}>{timeline.name}</div>
                            <div className={'line-clamp-1 text-sm text-gray-500'}>{timeline.description}</div>
                        </div>
                        <div className={'w-[44px] h-[44px] top-0 right-0 mb-[0.5px] shrink-0'}>
                            {isBaseImage
                                ? <>
                                    <div
                                        className={'relative w-full h-full rounded-md bg-gray-500 text-white flex items-center justify-center text-lg font-medium'}>
                                        <span className={'absolute'}>{timeline.name.charAt(0).toUpperCase()}</span>
                                        <Image src={`/images/base-image/base-image${mapStrToNum(timeline.name)}.jpg`}
                                               alt={'base-image'} width={44} height={44} priority={true}
                                               className={'rounded-md'}/>
                                    </div>
                                </>
                                : <Image className={'rounded-md'} src={timeline.image} alt={timeline.name} width={44}
                                         height={44}/>
                            }
                        </div>
                    </div>
                )
            })
            }
            <button className={'text-sm text-blue-700 hover:underline py-2'}>Show more</button>
        </div>
    );
};

export default TimelineListTrending;
