import React from 'react';
import {useSelector} from "react-redux";
import {selectCurrentTimelines} from "@/store/slices/contentsSlice";
import {getIsBaseImage, mapStrToNum} from "@/utils/global";
import Link from "next/link";
import Image from "next/image";
import IndexBottom from "@/components/index/indexBottom";

const IndexSectionPrimary = () => {
    const currentTimelines = useSelector(selectCurrentTimelines)

    return (
        <div className={'relative px-4 pt-1 pb-0 h-fit w-full max-w-[630px] min-[852px]:min-w-[500px]'}>
            {currentTimelines.map(timeline => {
                const isBaseImage = getIsBaseImage(timeline.image)

                return (
                    <Link key={timeline.id} href={`/timelines/${timeline.id}`}>
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
                                                {/*<span className={'absolute'}>{timeline.name.charAt(0).toUpperCase()}</span>*/}
                                                <Image src={`/images/base-image/base-image${mapStrToNum(timeline.name)}.jpg`} alt={'base-image'} fill={true} priority={true} className={'rounded-md bg-gray-100'}/>
                                            </div>
                                        </>
                                        : <Image src={timeline.image} alt={timeline.name} fill={true} priority={true} style={{objectFit: "cover", objectPosition: "top"}} className={'rounded-md bg-gray-100'}/>
                                    }
                                </div>
                            </div>
                        </div>
                        <hr className={'border-gray-200'}/>
                    </Link>
                )
            })}
            <IndexBottom/>
        </div>
    );
};

export default IndexSectionPrimary;
