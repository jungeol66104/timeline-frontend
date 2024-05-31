import React from 'react';
import {updateIsEdit} from "@/store/slices/appearanceSlice";
import Image from "next/image";

const ContributionButton = () => {
    const contributors = ['Mike Tyson', 'Jake Paul', 'Joon Nam', 'Timeline Staffs', 'Donggeun Suh']

    return (
        <button className={`flex items-center gap-2.5 px-3 h-[36px] border-[0.1px] border-gray-300 bg-white hover:bg-gray-100 drop-shadow-sm rounded-md`}>
            <div className={'text-sm font-semibold'}>Contributors</div>
            <div className={'flex gap-1 shrink-0'}>
                {contributors.map((contributor, i) => {
                    const initial = contributor.substring(0, 2).toUpperCase();

                    return (
                        <div key={i} className={'w-[24px] h-[24px] rounded-full flex items-center justify-center bg-gray-600 text-white text-xs'}>{initial}</div>
                    )
                })}
                <span className={'pl-1.5'}>...</span>
            </div>
        </button>
    )
}
export default ContributionButton;
