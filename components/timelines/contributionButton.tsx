import React, {useRef, useState} from "react";
import Link from "next/link";

const ContributionButton = () => {
    // dummy data
    const contributors = ['Mike Tyson', 'Jake Paul', 'Joon Nam', 'Timeline Staffs', 'Donggeun Suh']

    const contributionButtonRef = useRef<HTMLButtonElement>(null)
    const [isToggle, setIsToggle] = useState(false)

    const handleClick = (e: React.MouseEvent) => {
        const profileMenuButton = contributionButtonRef.current
        if (!profileMenuButton) return
        e.stopPropagation()
        setIsToggle(true)

        document.addEventListener('click', function hideMenu (e: MouseEvent) {
            if (!profileMenuButton.contains(e.target as Node)) {
                setIsToggle(false)
                document.removeEventListener('click', hideMenu)
            }
        })
    }

    return (
        <div className={'relative'}>
            <button ref={contributionButtonRef} onClick={handleClick} className={`flex items-center px-3 h-[36px] border-[0.1px] border-gray-300 bg-white hover:bg-gray-100 drop-shadow-sm rounded-md`}>
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
            {isToggle &&
                <div className={'overflow-y-scroll absolute top-[38px] left-0 p-1.5 w-[242.88px] bg-white border-[1px] rounded-md shadow-md'}>
                    {contributors.map((contributor, i) => {
                        const initial = contributor.substring(0, 2).toUpperCase();

                        return (
                            <Link key={i} href={'/'} className={'p-1.5 flex w-full items-center gap-1.5'}>
                                <div className={'w-[26px] h-[26px] rounded-full flex items-center justify-center bg-gray-600 text-white text-xs border-[1px] border-white shrink-0'}>{initial}</div>
                                <div className={'text-sm font-medium'}>{contributor}</div>
                            </Link>
                        )
                    })}
                </div>
            }
        </div>
    )
}
export default ContributionButton;
