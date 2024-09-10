import React, {useRef, useState} from 'react';
import Image from "next/image";
import {useSelector} from "react-redux";
import {selectIsSession, selectSession} from "@/store/slices/privateSlice";
import ShareButton from "@/components/layout/menu/shareButton";
import FeedbackButton from "@/components/layout/menu/feedbackButton";
import SignInOutButton from "@/components/layout/menu/signInOutButton";
import CreateTimelineButton from "@/components/layout/menu/createTimelineButton";
import ProfileButton from "@/components/layout/menu/profileButton";
import AboutButton from "@/components/layout/menu/aboutButton";
import HistoriesButton from "@/components/layout/menu/historiesButton";
import {getIsBaseImage} from "@/utils/global";

const ProfileMenuButton = () => {
    const profileMenuButtonRef = useRef<HTMLButtonElement>(null)
    const [isToggle, setIsToggle] = useState(false)

    const session = useSelector(selectSession)
    const isSession = useSelector(selectIsSession)

    const handleClick = (e: React.MouseEvent) => {
        const profileMenuButton = profileMenuButtonRef.current
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
        <div className={'relative mr-4'}>
            <button ref={profileMenuButtonRef} onClick={handleClick} className={`pl-2.5 pr-1.5 h-[40px] flex justify-center items-center gap-2 rounded-full border-[1px] border-gray-300 hover:shadow-md`}>
                <div className={'material-symbols-outlined shrink-0 text-[20px]'}>&#xe5d2;</div>
                {!session.username && <div className={'relative h-[28px] w-[28px]'}><Image className={'border-[0.1px] border-gray-300 rounded-full'} src={'/images/profileTest.jpg'} alt={'profile'} fill priority/></div>}
                {session.username && getIsBaseImage(session.imagePath) && <div className={'w-[28px] h-[28px] rounded-full flex items-center justify-center bg-gray-600 text-white text-xs border-[0.1px] border-gray-300 shrink-0'}>{session.username.slice(0, 2).toUpperCase()}</div>}
                {session.username && !getIsBaseImage(session.imagePath) && <div className={'overflow-hidden relative h-[28px] w-[28px] border-[0.1px] border-gray-300 rounded-full'}><Image src={session.cdnUrl + session.imagePath} alt={'profile'} fill priority style={{objectFit: "cover", objectPosition: "top"}}/></div>}
            </button>
            {isToggle &&
                <div className={'absolute top-[42px] right-0 px-1.5 py-1 w-[230px] bg-white border-[1px] rounded-2xl shadow-md'}>
                    <div className={'min-[850px]:hidden'}><CreateTimelineButton /></div>
                    <hr className={'min-[850px]:hidden my-1'}/>
                    {isSession && <ProfileButton/>}
                    <SignInOutButton />
                    <hr className={'my-1'}/>
                    <AboutButton />
                    <HistoriesButton />
                    <hr className={'my-1'}/>
                    <ShareButton />
                    <FeedbackButton />
                </div>
            }
        </div>
    );
};

export default ProfileMenuButton;
