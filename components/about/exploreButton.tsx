import React from 'react';
import Link from "next/link";
// reviewed: 0817

const ExploreButton = () => {
    return (
        <Link href={'/'} className={`px-5 h-[40px] flex justify-center items-center gap-2 font-semibold rounded-full border-[1px] border-black hover:bg-gray-100`}>Explore</Link>
    );
};

export default ExploreButton;
