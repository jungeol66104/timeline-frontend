import React from 'react';
import Link from "next/link";

const FeedbackButton = () => {
    return (
        <Link href={'https://docs.google.com/forms/d/e/1FAIpQLScN4ooRXZylBgKtElHSJi7m739iHHSMNg4QfbAcDx0v0OjwnA/viewform?usp=sf_link'} target="_blank" className={'h-[36px] flex items-center gap-2 px-2.5 rounded-md bg-white hover:bg-gray-100'}>
            <div className={'material-symbols-outlined shrink-0 text-[20px]'}>&#xe89e;</div>
                <div className={'text-sm leading-3 font-semibold'}>Feedback</div>
        </Link>
    );
};

export default FeedbackButton;
