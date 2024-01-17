import Image from 'next/image'
import React from 'react';


const ShareButtonTemplate = ({svgPath, title, size = 24}: {svgPath: string, title: string, size?: number}) => {
    return (
        <div className={'flex flex-col w-fit shrink-0 gap-2.5 items-center'}>
            <button className={'w-[40px] h-[40px] border-[1px] border-gray-600 rounded-full flex justify-center items-center'}><Image src={svgPath} alt={'link copy'} width={size} height={size} /></button>
            <div className={'text-xs'}>{title}</div>
        </div>
    );
};

export default ShareButtonTemplate;
