import React from 'react';

const ContributionButton = () => {
    const contributors = ['Mike Tyson', 'Jake Paul', 'Joon Nam', 'Timeline Staffs', 'Donggeun Suh']

    return (
        <button className={`flex items-center px-3 h-[36px] border-[0.1px] border-gray-300 bg-white hover:bg-gray-100 drop-shadow-sm rounded-md`}>
            <div className={'text-sm font-semibold'}>Contributors</div>
            <div className={'relative h-[26px] shrink-0'} style={{width: `${Math.max(contributors.length - 1, 4)*(26 - 7) + 26 + 10}px`}}>
                {contributors.map((contributor, i) => {
                    const initial = contributor.substring(0, 2).toUpperCase();

                    return (
                        <div key={i} className={'absolute top-0 w-[26px] h-[26px] rounded-full flex items-center justify-center bg-gray-600 text-white text-xs border-[1px] border-white shrink-0'} style={{left: `${i*(26 - 7) +10}px`}}>{initial}</div>
                    )
                })}
            </div>
            <span className={'pl-1.5'}>...</span>
        </button>
    )
}
export default ContributionButton;
