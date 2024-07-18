import React, {useRef, useState} from "react";
import Link from "next/link";

const ContributorsButton = () => {
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
            <button ref={contributionButtonRef} onClick={handleClick} className={`flex items-center gap-2.5 px-3 max-[852px]:px-2 h-[36px] border-[0.1px] border-gray-300 bg-white hover:bg-gray-100 drop-shadow-sm rounded-md`}>
                <div className={'text-sm font-semibold max-[852px]:hidden'}>Contributors</div>
                <div className={'flex gap-1.5 justify-center items-center'}>
                    <div className={'w-[26px] h-[26px] rounded-full flex items-center justify-center bg-gray-600 text-white text-xs border-[1px] border-white shrink-0'}>{contributors[0].substring(0, 2).toUpperCase()}</div>
                    <span className={'text-sm font-semibold'}>+4</span>
                </div>
            </button>
            {isToggle &&
                <div className={'overflow-y-scroll absolute top-[38px] left-0 p-1.5 w-[250px] bg-white border-[1px] rounded-md shadow-md'}>
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
export default ContributorsButton;
