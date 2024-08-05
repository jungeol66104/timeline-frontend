import React from 'react';
import Link from "next/link";
import Image from "next/image";

const AboutSectionSecondary = () => {
    return (
        <div className={`ml-[20px] max-[872px]:ml-0 p-4 w-full min-w-[332px] max-w-[352px] max-[852px]:max-w-[630px] flex flex-col gap-4`}>
            <Link href={'/'} className={'relative flex flex-col bg-[#F2F2F259] border-[1px] border-[#E5E7EB] rounded-2xl hover:shadow-md'}>
                <div className={'relative h-[250px] flex items-end rounded-2xl'}>
                    <Image className={'rounded-t-2xl'} src={'/images/IBM.jpg'} alt={'dummy'} fill style={{objectFit: "cover", objectPosition: "top"}}/>
                    <div className={'absolute z-10 w-full h-full bg-gradient-to-b from-[rgba(255,255,255,0)_43.75%] to-[rgb(250,249,244)_94.27%] rounded-t-3xl'}></div>
                    <div className={'flex gap-2 ml-3'}>
                        <div className={`relative z-20 h-[32px] w-fit shrink-0 px-3 flex items-center justify-center rounded-3xl border-[1px] border-gray-300 bg-white text-sm font-semibold`}><span>&#x2728;  Staff Picks</span></div>
                        <div className={`relative z-20 h-[32px] w-fit shrink-0 px-3 flex items-center justify-center rounded-3xl border-[1px] border-gray-300 bg-white text-sm font-semibold`}><span>Technology</span></div>
                    </div>
                </div>
                <div className={'px-4 py-3'}>
                    <h3 className={'text-2xl font-bold'}>IBM</h3>
                    <div className={'text-gray-500'}>American multinational technology company</div>
                    <div className={'mt-3 text-sm line-clamp-3'}>
                        IBM, founded in 1911, is a leading technology company known for its innovations in computer systems and software. With a rich history
                        of technological advancements, IBM has made significant contributions to various fields such as computing, data infrastructure, and artificial intelligence. Despite facing
                        challenges in the PC market, IBM remains a prominent player in the technology industry, with a strong focus on computer services, supercomputers, and scientific research.
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default AboutSectionSecondary;
