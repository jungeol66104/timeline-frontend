import React from 'react';
import Image from "next/image";
import Link from "next/link";
import {useSelector} from "react-redux";
import {selectIsMobileSize} from "@/store/slices/appearanceSlice";

const FeedbackButton = ({isMobileSize}:{isMobileSize?: boolean}) => {
    return (
        <Link href={'https://docs.google.com/forms/d/e/1FAIpQLScN4ooRXZylBgKtElHSJi7m739iHHSMNg4QfbAcDx0v0OjwnA/viewform?usp=sf_link'} target="_blank" className={'block cursor-pointer pr-1 h-[36px] w-[104px] max-[850px]:pr-0'}>
            <div className={'px-3 py-1.5 h-[36px] rounded-3xl bg-white hover:bg-gray-100 font-semibold max-[850px]:rounded-none'}>Feedback</div>
        </Link>
    );
};

export default FeedbackButton;
