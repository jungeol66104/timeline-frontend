import React, {useRef, useState} from "react";
import Link from "next/link";
import {useSelector} from "react-redux";
import {selectDemoKeyConcept, selectModalType, selectTimelineType} from "@/store/slices/appearanceSlice";
import {Contributors, selectCurrentContributors} from "@/store/slices/contentsSlice";

const ContributorsButton = ({contributors} : {contributors: Contributors}) => {
    const contributorsButtonRef = useRef<HTMLButtonElement>(null)
    const [isToggle, setIsToggle] = useState(false)
    const timelineType = useSelector(selectTimelineType)
    const modalType = useSelector(selectModalType)
    const demoKeyConcept = useSelector(selectDemoKeyConcept)
    let currentContributors = useSelector(selectCurrentContributors)
    if (timelineType === 'demo') currentContributors = ['you']

    const handleClick = async (e: React.MouseEvent) => {
        const contributorsButton = contributorsButtonRef.current
        if (!contributorsButton) return
        e.stopPropagation()
        // fetch contributors
        setIsToggle(true)

        document.addEventListener('click', function hideMenu (e: MouseEvent) {
            if (!contributorsButton.contains(e.target as Node)) {
                setIsToggle(false)
                document.removeEventListener('click', hideMenu)
            }
        })
    }

    return (
        <div className={'z-20 relative'}>
            <button ref={contributorsButtonRef} onClick={handleClick} className={`flex items-center gap-2 px-3 max-[852px]:px-2 h-[36px] ${timelineType === 'demo' && demoKeyConcept === 'contributors' && 'outline outline-2 outline-blue-700'} border-[0.1px] border-gray-300 bg-white hover:bg-gray-100 drop-shadow-sm rounded-md`}>
                <div className={'text-sm font-semibold max-[852px]:hidden'}>Contributors</div>
                <div className={'flex justify-center items-center gap-1.5'}>
                    <div className={'w-[25px] h-[25px] flex items-center justify-center bg-gray-600 text-white text-[12.5px] rounded-full shrink-0'}><div>{contributors.username.toUpperCase()}</div></div>
                    <div className={`${contributors.counts === 1 && 'hidden'} text-sm font-semibold`}>+{contributors.counts}</div>
                </div>
            </button>
            {isToggle &&
                <div className={'overflow-y-scroll absolute top-[38px] left-0 px-1.5 py-1 w-[250px] bg-white border-[1px] rounded-md shadow-md'}>
                    {currentContributors.map((contributor, i) => {
                        const initial = contributor.substring(0, 1).toUpperCase();

                        return (
                            <Link key={i} href={`/@${contributor}`} className={`${timelineType === 'demo' && 'pointer-events-none'} p-1.5 w-full flex items-center gap-2 rounded-md hover:bg-gray-100`}>
                                <div className={'w-[26px] h-[26px] rounded-full flex items-center justify-center bg-gray-600 text-white text-xs border-[1px] border-white shrink-0'}>{initial}</div>
                                <div className={'text-sm font-medium'}>{contributor}</div>
                            </Link>
                        )
                    })}
                    {timelineType === 'demo' &&
                        <div className={'mt-1 mb-0.5 p-3 w-full bg-[#F2F2F259] text-sm font-medium border-[1px] border-gray-300 rounded-lg'}>
                            &#x1F4A1; Contributor button above takes you to the profile page in practice.
                        </div>
                    }
                </div>
            }
        </div>
    )
}

export default ContributorsButton;
