import React, {useRef} from 'react';
import SwiperCard from "@/_deprecated/swiperCard";
import SwiperPagination from "@/_deprecated/swiperPagination";
import MoreButton from "@/_deprecated/moreButton";
import {Series} from "@/store/slices/contentsSlice";


const Swiper = ({series}: {series: Series}) => {
    const showMoreButton = series.hasMore
    const swiperContainerRef = useRef<HTMLDivElement>(null)

    const handleHover = (isHover: boolean) => {
        const swiperContainer = swiperContainerRef.current
        if (!swiperContainer) return
        if (navigator.userAgent.indexOf('Mac') !== -1) return

        if (isHover) swiperContainer.classList.remove('hideScrollbar')
        else swiperContainer.classList.add('hideScrollbar')
    }

    return (
        <div className={'swiper w-full max-w-[996px]'}>
            <div className={'swiperHeader w-full pl-4'}>
                <div className={'text-sm text-gray-500'}>{series.description}</div>
                <div className={'flex items-end justify-between'} style={{width: `calc(100% - 20px)`}}>
                    <div className={'text-2xl font-bold'}>{series.name}</div>
                    <div className={'flex gap-5 h-8 max-[525px]:h-6'}>
                        {showMoreButton && <MoreButton series={series} />}
                        <SwiperPagination swiperContainerRef={swiperContainerRef} />
                    </div>
                </div>
            </div>
            <div ref={swiperContainerRef} onMouseOver={() => handleHover(true)} onMouseLeave={() => handleHover(false)} className={'swiperContainer hideScrollbar w-full flex pb-2.5 mt-2.5 overflow-x-scroll'}>
                {series["timelines"].slice(0,10).map((timeline, i) => {
                    return (
                        <React.Fragment key={i}>
                            <div className={'swiperGap w-4 bg-white shrink-0 z-30'}></div>
                            <SwiperCard timeline={timeline}/>
                        </React.Fragment>
                    )
                })}
                <div key={100} className={'swiperGap w-4 bg-white shrink-0 z-30'}></div>
            </div>
        </div>
    );
};
export default Swiper;