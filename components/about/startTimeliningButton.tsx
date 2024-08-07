import React from 'react';
import Link from "next/link";

const StartTimeliningButton = () => {

    return (
        <Link href={'/timelines/new'} className={`px-5 h-[40px] flex justify-center items-center gap-2 font-medium text-white rounded-full border-[1px] border-black bg-black`}>Start Timelining</Link>
    );
};

export default StartTimeliningButton;
