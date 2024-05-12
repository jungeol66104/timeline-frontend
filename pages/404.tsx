import React from 'react';
import Link from "next/link";

const Custom404 = () => {
    return (
        <div className={'w-full h-full flex flex-col items-center justify-center gap-2.5'}>
            <Link href={'/'} className={'font-black text-2xl'}>Timeline</Link>
            <div>404 Error | This URL is not valid.</div>
            <Link href={'/'} className={'underline underline-offset-4 text-gray-500 hover:text-black hover:decoration-1'}>Home</Link>
        </div>
    )
}
export default Custom404;
