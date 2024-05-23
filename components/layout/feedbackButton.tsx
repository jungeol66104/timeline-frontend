import React from 'react';
import Link from "next/link";

const FeedbackButton = () => {
    return (
        <Link href={'https://docs.google.com/forms/d/e/1FAIpQLScN4ooRXZylBgKtElHSJi7m739iHHSMNg4QfbAcDx0v0OjwnA/viewform?usp=sf_link'} target="_blank" className={'block cursor-pointer h-[36px] w-full'}>
            <div className={'px-3 py-1.5 h-[36px] rounded-b-md bg-white hover:bg-gray-100 font-semibold'}>Feedback</div>
        </Link>
    );
};

export default FeedbackButton;
