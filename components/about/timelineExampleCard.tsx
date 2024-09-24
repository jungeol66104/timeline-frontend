import React from 'react';
import Link from "next/link";
import Image from "next/image";
import {useSelector} from "react-redux";
import {selectCurrentTimelines} from "@/store/slices/contentsSlice";
// @ts-ignore
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {unwrapPTag} from "@/utils/global";

const TimelineExampleCard = () => {
    const currentTimelines = useSelector(selectCurrentTimelines).filter((timeline) => {
        return timeline.title !== 'Taylor Swift' && timeline.title !== 'Asian Financial Crisis'
    })

    const settings = {
        className: 'h-fit',
        arrows: false,
        dots: false,
        fade: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        pauseOnHover: true
    };

    return (
        <div className={'overflow-hidden h-[403.33px] rounded-2xl hover:shadow-md'}>
            <Slider {...settings}>
                {currentTimelines.map((timeline) => (
                    <Link key={timeline.id} href={`/timelines/${timeline.id}`} className={'relative flex flex-col bg-[#F2F2F259] border-[1px] border-[#E5E7EB] rounded-2xl'}>
                        <div className={'relative h-[250px] flex items-end rounded-2xl'}>
                            <Image className={'rounded-t-2xl'} src={timeline.cdnUrl! + timeline.imagePath!} alt={'dummy'} fill style={{objectFit: "cover", objectPosition: "top"}}/>
                            <div className={'absolute z-10 w-full h-full bg-gradient-to-b from-[rgba(255,255,255,0)_43.75%] to-[rgb(250,249,244)_94.27%] rounded-t-3xl'}></div>
                            <div className={'flex gap-2 ml-3'}>
                                <div className={`relative z-20 h-[32px] w-fit shrink-0 px-3 flex items-center justify-center rounded-3xl border-[1px] border-gray-300 bg-white text-sm font-semibold`}><span>&#x2728;  Staff Picks</span></div>
                            </div>
                        </div>
                        <div className={'px-4 py-3 h-[152px]'}>
                            <h3 className={'text-2xl font-bold line-clamp-1'}>{timeline.title}</h3>
                            <div className={'text-gray-500 line-clamp-1'}>{timeline.description}</div>
                            <div className={'mt-3 text-sm line-clamp-3'}>{unwrapPTag(timeline.content)}</div>
                        </div>
                    </Link>
                ))}
            </Slider>
        </div>
    );
};

export default TimelineExampleCard;
