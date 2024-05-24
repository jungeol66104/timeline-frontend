import React from 'react';
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";

const SignInButton = () => {
    const {data : session} = useSession();

    const handleClick = () => {
        if (session) signOut()
        else signIn('google')
    }

    return (
        <button onClick={handleClick} className={'h-[36px] w-full flex items-center gap-1.5 pl-1.5 pr-3 py-1.5 rounded-md bg-white hover:bg-gray-100'}>
            {session
                ?   <>
                        <div className={'w-5 shrink-0'}><Image src={'/svg/logout.svg'} alt={'createTimeline'} width={20} height={20}/></div>
                        <div className={'text-sm font-semibold'}>Sign Out</div>
                    </>
                :   <>
                        <div className={'w-5 shrink-0'}><Image src={'/svg/login.svg'} alt={'createTimeline'} width={20} height={20}/></div>
                        <div className={'text-sm font-semibold'}>Sign In</div>
                    </>
            }

        </button>
    );
};

export default SignInButton;
