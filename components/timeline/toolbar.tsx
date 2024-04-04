import React from 'react';
import {useSelector} from "react-redux";
import Image from "next/image";
import NorthSVG from "@/public/svg/north.svg";
import {selectCurrentDepth, selectMaxDepth} from "@/store/slices/appearanceSlice";

const Toolbar = () => {
    const maxDepth = useSelector(selectMaxDepth)
    const currentDepth = useSelector(selectCurrentDepth)
    const isSmallToolbar = maxDepth === 0

    return (
        <div className={`sticky bottom-[18px] w-full`} style={{zIndex: 4998}}>
            {isSmallToolbar
                ? <div className={'toolbar absolute right-0 bottom-0 flex border-[0.1px] border-gray-300 rounded-lg bg-white drop-shadow-md h-[40px] w-[40px]'}>
                    <button className={'toolbarButton uppermost flex items-center justify-center w-[40px]'}>
                        <div><Image src={NorthSVG} alt={'uppermost'} height={20} width={20}/></div>
                    </button>
                </div>
                : <div className={'toolbar absolute right-0 bottom-0 flex border-[0.1px] border-gray-300 rounded-lg bg-white drop-shadow-md h-[40px] w-[120px]'}>
                    {currentDepth === maxDepth
                        ?   <button className={'toolbarButton summary flex items-center justify-center text-sm font-medium w-[80px]'}>Summary</button>
                            :   <button className={'toolbarButton showAll flex items-center justify-center text-sm font-medium w-[80px]'}>Show All</button>
                        }
                        <div className={'border-r-[1px]'}></div>
                        <button className={'toolbarButton uppermost flex items-center justify-center w-[40px]'}>
                            <div><Image src={NorthSVG} alt={'uppermost'} height={20} width={20}/></div>
                        </button>
                    </div>
            }
        </div>
    );
};
export default Toolbar;
