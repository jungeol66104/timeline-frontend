import React from 'react';

const IndexSkeleton = () => {
    const skeletonArray = Array(10).fill(0)

    return (
        <div className={'page indexPage pt-[44px]'}>
            <div className={'animate-pulse relative h-fit w-full max-w-[600px] px-4 pt-1 pb-0'}>
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
                                            <div className={'w-full h-5'}><div className={'w-full h-4 bg-gray-100'}></div></div>
                                            <div className={'w-full h-5'}><div className={'w-full h-4 bg-gray-100'}></div></div>
                                            <div className={'w-full h-5'}><div className={'h-4 bg-gray-100'} style={{width: '80%'}}></div></div>
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
        </div>
    );
};

export default IndexSkeleton;
