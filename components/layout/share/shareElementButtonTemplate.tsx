import Image from 'next/image'
import React, {MouseEventHandler} from 'react';


const ShareButtonTemplate = ({handleClick, svgPath, title, size = 24}: {handleClick: MouseEventHandler<HTMLDivElement>, svgPath: string, title: string, size?: number}) => {
    return (
        <div onClick={handleClick} className={'flex flex-col w-fit shrink-0 gap-2.5 items-center'}>
            <button className={'w-[40px] h-[40px] border-[1px] border-gray-600 rounded-full flex justify-center items-center'}><Image src={svgPath} alt={'link copy'} width={size} height={size} /></button>
            <div className={'text-xs'}>{title}</div>
        </div>
    );
};

export default ShareButtonTemplate;
