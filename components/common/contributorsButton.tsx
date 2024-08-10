import React, {useRef, useState} from "react";
import Link from "next/link";
import {useSelector} from "react-redux";
import {selectDemoKeyConcept, selectTimelineType} from "@/store/slices/appearanceSlice";

const ContributorsButton = () => {
    const contributors = ['Mike Tyson', 'Jake Paul', 'Joon Nam', 'Timeline Staffs', 'Donggeun Suh']

    const contributorsButtonRef = useRef<HTMLButtonElement>(null)
    const [isToggle, setIsToggle] = useState(false)

    const timelineType = useSelector(selectTimelineType);
    const demoKeyConcept = useSelector(selectDemoKeyConcept);

    const handleClick = (e: React.MouseEvent) => {
        const contributorsButton = contributorsButtonRef.current
        if (!contributorsButton) return
        e.stopPropagation()
        setIsToggle(true)

        document.addEventListener('click', function hideMenu (e: MouseEvent) {
            if (!contributorsButton.contains(e.target as Node)) {
                setIsToggle(false)
                document.removeEventListener('click', hideMenu)
            }
        })
    }

    return (
        <div className={'relative'}>
            <button ref={contributorsButtonRef} onClick={handleClick} className={`flex items-center gap-2.5 px-3 max-[852px]:px-2 h-[36px] border-[0.1px] border-gray-300 ${timelineType === 'demo' && demoKeyConcept === 'contributors' && 'outline outline-2 outline-blue-700'} bg-white hover:bg-gray-100 drop-shadow-sm rounded-md`}>
                <div className={'text-sm font-semibold max-[852px]:hidden'}>Contributors</div>
                <div className={'flex gap-1.5 justify-center items-center'}>
                    <div className={'w-[26px] h-[26px] rounded-full flex items-center justify-center bg-gray-600 text-white text-xs border-[1px] border-white shrink-0'}>{contributors[0].substring(0, 2).toUpperCase()}</div>
                    <span className={'text-sm font-semibold'}>+4</span>
                </div>
            </button>
            {isToggle &&
                <div className={'overflow-y-scroll absolute top-[38px] left-0 px-1.5 py-1 w-[250px] bg-white border-[1px] rounded-md shadow-md'}>
                    {contributors.map((contributor, i) => {
                        const initial = contributor.substring(0, 2).toUpperCase();

                        return (
                            <Link key={i} href={`/@${contributor}`} className={'p-1.5 w-full flex items-center gap-2 rounded-md hover:bg-gray-100'}>
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
