import React from 'react';
import Link from "next/link";
import Image from "next/image";

const FeedbackButton = () => {
    return (
        <Link href={'https://docs.google.com/forms/d/e/1FAIpQLScN4ooRXZylBgKtElHSJi7m739iHHSMNg4QfbAcDx0v0OjwnA/viewform?usp=sf_link'} target="_blank" className={'h-[36px] w-[122px] flex items-center gap-1.5 pl-1.5 pr-3 py-1.5 rounded-md bg-white hover:bg-gray-100'}>
            <div className={'w-5'}><Image src={'/svg/feedback.svg'} alt={'feedback'} width={20} height={20}/></div>
                <div className={'text-sm leading-3 font-semibold'}>Feedback</div>
        </Link>
    );
};

export default FeedbackButton;
