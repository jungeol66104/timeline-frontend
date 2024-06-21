import React, {useRef, useState} from 'react';
import Image from "next/image";
import ShareButton from "@/components/modal/shareModal/shareButton";
import FeedbackButton from "@/components/layout/navbar/feedbackButton";
import SignInButton from "@/components/layout/personal/signInButton";
import CreateTimelineButton from "@/components/layout/navbar/createTimelineButton";
import ProfileButton from "@/components/layout/personal/profileButton";

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
        <div className={'relative mr-4 flex justify-center items-center shrink-0'}>
            <button ref={profileMenuButtonRef} onClick={handleClick}><Image className={'rounded-full'} src={'/images/profile.jpg'} alt={'profile'} width={28} height={28} /></button>
            {isToggle &&
                <div className={'absolute top-[30px] right-0 p-1.5 w-[150px] bg-white border-[1px] rounded-md shadow-md'}>
                    <ProfileButton />
                    <div className={'min-[850px]:hidden'}><CreateTimelineButton /></div>
                    <hr className={'min-[850px]:hidden my-2'}/>
                    <SignInButton />
                    <ShareButton />
                    <FeedbackButton />
                </div>
            }
        </div>
    );
};

export default ProfileMenuButton;
