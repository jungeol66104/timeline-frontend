import React from 'react';
import Link from "next/link";

const AboutButton = () => {
    return (
        <Link href={`/about`} className={`w-full h-[36px] flex items-center gap-2 px-2.5 rounded-md bg-white hover:bg-gray-100 text-left`}>
            <div className={'material-symbols-outlined shrink-0 text-[20px]'}>&#xeaf5;</div>
            <div className={'text-sm font-semibold'}>About Timeline</div>
        </Link>
    );
};

export default AboutButton;
