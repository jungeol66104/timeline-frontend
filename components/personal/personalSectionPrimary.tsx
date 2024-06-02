import React from 'react';
import Link from "next/link";
import Image from "next/image";
import {mapStrToNum} from "@/utils/global";

const PersonalSectionPrimary = () => {
    const contributions = []
    const isBaseImage = true

    return (
        <div className={'relative px-4 pt-4 pb-0 max-[852px]:py-0 flex flex-col gap-3 w-full min-h-full min-[852px]:min-w-[500px] max-w-[630px]'}>
            <div className={`px-4 py-3 flex gap-10 w-fit`}>
                <div className={'w-[104px] h-[104px] rounded-full bg-gray-600'}></div>
                <div className={'flex flex-col justify-between'}>
                    <div>
                        <div className={'text-[20px] font-bold'}>Admin</div>
                        <div>admin@gmail.com</div>
                    </div>
                    <button className={`pl-1.5 pr-2.5 pb-[1px] flex items-center justify-center gap-1.5 h-[36px] w-fit border-[0.1px] border-gray-300 bg-white hover:bg-gray-100 drop-shadow-sm rounded-md`}>
                        <div className={'material-symbols-outlined text-[18px]'}>&#xe92b;</div>
                        <div className={'text-sm font-semibold'}>Delete Account</div>
                    </button>
                </div>
            </div>
            <div>
                <div className={'text-2xl font-bold pb-3'}>Contribution</div>
                <hr/>
                <div className={'w-full'}>
                    <Link href={`/`} className={'w-full'}>
                        <div className={'py-3'}>
                            <div className={'flex items-center justify-between'}>
                                <div className={'font-bold line-clamp-1'}>title</div>
                                <div className={'text-xs font-semibold text-gray-500'}>Event</div>
                            </div>
                            <div className={'flex gap-1 justify-between'}>
                                <div>
                                    <div className={'text-sm text-gray-500 line-clamp-1'}>description</div>
                                    <p className={'mt-1 text-sm line-clamp-3'}>content</p>
                                </div>
                                <div className={'relative w-[84px] h-[84px] shrink-0'}>
                                    {isBaseImage
                                        ? <>
                                            <div className={'absolute bottom-[1px] right-0 w-[80px] h-[80px] rounded-md text-white flex items-center justify-center'}>
                                                {/*<span className={'absolute'}>{timeline.name.charAt(0).toUpperCase()}</span>*/}
                                                <Image src={`/images/base-image/base-image${mapStrToNum('khkhk')}.jpg`} alt={'base-image'} fill={true} priority={true} className={'rounded-md bg-gray-100'}/>
                                            </div>
                                        </>
                                        // : <Image src={timeline.image} alt={timeline.name} fill={true} priority={true} style={{objectFit: "cover", objectPosition: "top"}} className={'rounded-md bg-gray-100'}/>
                                        : <></>
                                    }
                                </div>
                            </div>
                        </div>
                        <hr className={'border-gray-200'}/>
                    </Link>
                </div>
            </div>
        </div>
    )
}
export default PersonalSectionPrimary;
