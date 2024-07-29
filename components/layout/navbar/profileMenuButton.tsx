import React, {useRef, useState} from 'react';
import Image from "next/image";
import ShareButton from "@/components/layout/navbar/shareButton";
import FeedbackButton from "@/components/layout/navbar/feedbackButton";
import SignInAndOutButton from "@/components/layout/navbar/signInAndOutButton";
import CreateTimelineButton from "@/components/layout/navbar/createTimelineButton";
import ProfileButton from "@/components/layout/navbar/profileButton";

const ProfileMenuButton = () => {
    const profileMenuButtonRef = useRef<HTMLButtonElement>(null)
    const [isToggle, setIsToggle] = useState(false)

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
                <div className={'h-[28px] w-[28px]'}>
                    <Image className={'rounded-full'} src={'/images/profile.jpg'} alt={'profile'} width={28} height={28}/>
                </div>
            </button>
            {isToggle &&
                <div className={'absolute top-[42px] right-0 px-1.5 py-1 w-[230px] bg-white border-[1px] rounded-2xl shadow-md'}>
                    <div className={'min-[850px]:hidden'}><CreateTimelineButton /></div>
                    <hr className={'min-[850px]:hidden my-1'}/>
                    <ProfileButton />
                    <SignInAndOutButton />
                    <hr className={'min-[850px]:hidden my-1'}/>
                    <ShareButton />
                    <FeedbackButton />
                </div>
            }
        </div>
    );
};

export default ProfileMenuButton;