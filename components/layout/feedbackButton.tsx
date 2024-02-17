import React from 'react';
import Image from "next/image";
import Link from "next/link";

const FeedbackButton = () => {
    return (
        <Link href={'https://docs.google.com/forms/d/e/1FAIpQLScN4ooRXZylBgKtElHSJi7m739iHHSMNg4QfbAcDx0v0OjwnA/viewform?usp=sf_link'} target="_blank" className={'cursor-pointer flex items-center pr-[6px] h-[24px] mb-[0.5px] rounded-sm bg-white border-[0.1px] shadow-[0_2px_3px_rgba(0,0,0,0.07)]'}>
            <div className={'flex w-[24px] h-[24px] items-center justify-center'}>
                <Image src={'/svg/feedback.svg'} alt={'feedback'} width={14} height={14}/>
            </div>
            <div className={'text-xs font-semibold'}>Feedback</div>
        </Link>
    );
};

export default FeedbackButton;
