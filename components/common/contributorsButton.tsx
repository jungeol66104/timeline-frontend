import {getIsBaseImage} from "@/utils/global";
import api from "@/pages/api/api";
import React, {useRef, useState} from "react";
import Link from "next/link";
import Image from "next/image";
import {useDispatch, useSelector} from "react-redux";
import {selectDemoKeyConcept, selectModalType, selectTimelineType} from "@/store/slices/appearanceSlice";
import {Contributors, selectCurrentContributors, selectCurrentEvent, selectCurrentTimeline, updateCurrentContributors} from "@/store/slices/contentsSlice";

const ContributorsButton = ({contributors} : {contributors: Contributors}) => {
    const {username, cdnUrl, imagePath, counts} = contributors

    const contributorsButtonRef = useRef<HTMLButtonElement>(null)
    const [isToggle, setIsToggle] = useState(false)
    const dispatch = useDispatch()
    const timelineType = useSelector(selectTimelineType)
    const modalType = useSelector(selectModalType)
    const demoKeyConcept = useSelector(selectDemoKeyConcept)
    let currentContributors = useSelector(selectCurrentContributors)
    const currentTimeline = useSelector(selectCurrentTimeline)
    const currentEvent = useSelector(selectCurrentEvent)

    const isBaseImage = getIsBaseImage(imagePath)

    const handleClick = async (e: React.MouseEvent) => {
        const contributorsButton = contributorsButtonRef.current
        if (!contributorsButton) return
        e.stopPropagation()

        if (timelineType === 'demo') {
            currentContributors = [{username: 'you', cdnUrl: 'https://cdn.timeline.vg/', imagePath: 'base-image.png'}]
            return
        }

        if (modalType === 'none') {
            const response = await api.get(`/timeline/${currentTimeline.id}/contributors?pageNum=1&pageSize=20`, {headers: {lang: 'en'}})
            if (response.data.code === 69999) return
            const data = response.data.data

            dispatch(updateCurrentContributors(data.contributors))
        } else if (modalType === 'information') {
            const response = await api.get(`/timeline/${currentTimeline.id}/contributors?pageNum=1&pageSize=20`, {headers: {lang: 'en'}})
            if (response.data.code === 69999) return
            const data = response.data.data

            dispatch(updateCurrentContributors(data.contributors))
        } else if (modalType === 'event') {
            const response = await api.get(`/event/${currentEvent.id}/contributors?pageNum=1&pageSize=20`, {headers: {lang: 'en'}})
            if (response.data.code === 69999) return
            const data = response.data.data

            dispatch(updateCurrentContributors(data.contributors))
        }
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
                    {isBaseImage && <div className={'w-[25px] h-[25px] rounded-full flex items-center justify-center bg-gray-600 text-white text-xs border-[1px] border-white shrink-0'}>{username && username[0].toUpperCase()}</div>}
                    {!isBaseImage && <div className={'overflow-hidden relative w-[25px] h-[25px] rounded-full border-[1px] border-white shrink-0'}><Image src={cdnUrl + imagePath} alt={username} fill priority style={{objectFit: "cover", objectPosition: "top"}}/></div>}
                    <div className={`${counts <= 1 && 'hidden'} text-sm font-semibold`}>+{counts}</div>
                </div>
            </button>
            {isToggle &&
                <div className={'overflow-y-scroll absolute top-[38px] left-0 px-1.5 py-1 w-[250px] bg-white border-[1px] rounded-md shadow-md'}>
                    {currentContributors.map((contributor, i) => {
                        const {username, cdnUrl, imagePath} = contributor
                        const isBaseImage = getIsBaseImage(imagePath)

                        return (
                            <Link key={i} href={`/@${username}`} className={`${timelineType === 'demo' && 'pointer-events-none'} p-1.5 w-full flex items-center gap-2 rounded-md hover:bg-gray-100`}>
                                {isBaseImage && <div className={'w-[25px] h-[25px] rounded-full flex items-center justify-center bg-gray-600 text-white text-xs border-[1px] border-white shrink-0'}>{username && username[0].toUpperCase()}</div>}
                                {!isBaseImage && <div className={'overflow-hidden relative w-[25px] h-[25px] rounded-full border-[1px] border-white shrink-0'}><Image src={cdnUrl + imagePath} alt={username} fill priority style={{objectFit: "cover", objectPosition: "top"}}/></div>}
                                <div className={'text-sm font-medium'}>{username}</div>
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
