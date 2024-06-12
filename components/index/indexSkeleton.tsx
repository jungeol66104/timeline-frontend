import React from 'react';
import {getTags} from "@/utils/global";
import TagButton from "@/components/layout/tagButton";

const IndexSkeleton = () => {
    const skeletonArray = Array(10).fill(0)

    return (
        <div className={'page indexPage animate-pulse'}>
            <div className={`fixed top-[60px] left-0 flex pt-2 pb-1.5 h-[46.67px] shrink-0 w-full border-b-[1px] border-gray-100 bg-white overflow-x-auto z-[4900]`}>
                <div className={'tagWrapper h-full w-full flex gap-2 px-4 text-sm overflow-hidden'}>
                    {getTags().map((tag, i) => {
                        return (
                            <div key={i} className={`h-[32px] w-fit px-3 flex items-center justify-center rounded-3xl bg-gray-100 shrink-0`}><span className={'text-gray-100'}>{tag}</span></div>
                        )
                    })}
                </div>
            </div>
            <div className={'indexPageWrapper pageWrapper w-full flex'}>
                <div className={'relative px-4 pt-1 pb-0 h-fit w-full max-w-[630px] min-[852px]:min-w-[500px]'}>
                    {skeletonArray.map((_, i) => {
                        return (
                            <div key={i} className={'h-[132.67px]'}>
                                <div className={'py-3'}>
                                    <div className={'w-full h-6 flex items-center'}>
                                        <div className={'bg-gray-100 h-[19px] rounded-md'} style={{width: '60%'}}></div>
                                    </div>
                                    <div className={'flex gap-1'}>
                                        <div className={'w-full'}>
                                            <div className={'w-full h-5 flex items-center'}>
                                                <div className={'w-full h-4 bg-gray-100 rounded-md'} style={{width: '60%'}}></div>
                                            </div>
                                            <p className={'mt-1 w-full flex flex-col'}>
                                                <div className={'w-full h-5'}>
                                                    <div className={'w-full h-4 bg-gray-100'}></div>
                                                </div>
                                                <div className={'w-full h-5'}>
                                                    <div className={'w-full h-4 bg-gray-100'}></div>
                                                </div>
                                                <div className={'w-full h-5'}>
                                                    <div className={'h-4 bg-gray-100'} style={{width: '80%'}}></div>
                                                </div>
                                            </p>
                                        </div>
                                        <div className={'relative w-[84px] h-[84px] shrink-0'}>
                                            <div className={'absolute top-0 right-0 w-[80px] h-[80px] bg-gray-100 rounded-md'}></div>
                                        </div>
                                    </div>
                                </div>
                                <hr className={'border-gray-200'}/>
                            </div>
                        )
                    })}
                </div>
                <div className={'relative ml-[20px] max-[872px]:ml-0 p-4 max-[852px]:py-0 w-full min-w-[332px] max-w-[352px] max-[852px]:hidden'}></div>
            </div>
        </div>
    );
};

export default IndexSkeleton;
