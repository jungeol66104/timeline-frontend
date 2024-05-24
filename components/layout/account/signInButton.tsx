import React from 'react';
import Link from "next/link";
import Image from "next/image";

const SignInButton = () => {
    return (
        <Link href={'/'} target="_blank" className={'h-[36px] w-full flex items-center gap-1.5 pl-1.5 pr-3 py-1.5 rounded-md bg-white hover:bg-gray-100'}>
            <Image src={'/svg/login.svg'} alt={'createTimeline'} width={20} height={20} />
            <div className={'text-sm font-semibold'}>Sign In</div>
        </Link>
    );
};

export default SignInButton;
