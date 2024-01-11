import React from 'react';
import Image from "next/image";
import SwiperCard from "@/components/swiperCard";

const Swiper = () => {
    return (
        <div className={'my-[20px]'}>
            <div className={'pl-5'}>
                <div className={'text-sm text-gray-500'}>되풀이되는 금융의 역사를 보고싶다면</div>
                <div className={'text-2xl font-bold'}>금융 위기</div>
            </div>
            <div className={'swiperContainer flex px-5 w-full mt-2.5 overflow-x-scroll'}>
                <SwiperCard />
                <SwiperCard />
                <SwiperCard />
                <SwiperCard />
            </div>
        </div>
    );
};

export default Swiper;
