import React from 'react';
import Link from "next/link";

const FeedbackButton = () => {
    return (
        <Link href={'https://docs.google.com/forms/d/e/1FAIpQLScN4ooRXZylBgKtElHSJi7m739iHHSMNg4QfbAcDx0v0OjwnA/viewform?usp=sf_link'} target="_blank" className={'block cursor-pointer pr-1 h-[36px] w-[104px] max-[850px]:pr-0 max-[850px]:w-full'}>
            <div className={'px-3 py-1.5 h-[36px] rounded-b-3xl rounded-t-3xl bg-white hover:bg-gray-100 font-semibold max-[850px]:rounded-b-md max-[850px]:rounded-t-none'}>Feedback</div>
        </Link>
    );
};

export default FeedbackButton;
