import React from 'react';
import Image from "next/image";
import Link from "next/link";
import {useSelector} from "react-redux";
import {selectIsMobileSize} from "@/store/slices/appearanceSlice";

const FeedbackButton = ({isMobileSize}:{isMobileSize?: boolean}) => {

    return (
        <Link href={'https://docs.google.com/forms/d/e/1FAIpQLScN4ooRXZylBgKtElHSJi7m739iHHSMNg4QfbAcDx0v0OjwnA/viewform?usp=sf_link'} target="_blank" className={'cursor-pointer'}>
            {isMobileSize
                ?   <div className={'w-[36px] h-[36px] flex items-center justify-center rounded-full bg-white hover:bg-gray-100'}><Image src={'/svg/feedback.svg'} alt={'feedback'} width={20} height={20}/></div>
                // ?   <div className={'px-2 py-1 rounded-3xl bg-white hover:bg-gray-100 text-xs font-semibold'}>Feedback</div>
                :   <div className={'px-3 py-1.5 h-[36px] rounded-3xl bg-white hover:bg-gray-100 font-semibold'}>Feedback</div>
            }
        </Link>
    );
};

export default FeedbackButton;
