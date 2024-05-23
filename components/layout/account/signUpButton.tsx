import React from 'react';
import Link from "next/link";

const SignUpButton = () => {
    return (
        <Link href={'/'} target="_blank" className={'block cursor-pointer h-[36px] w-full'}>
            <div className={'px-3 py-1.5 h-[36px] bg-white hover:bg-gray-100 font-semibold'}>Sign Up</div>
        </Link>
    );
};

export default SignUpButton;
