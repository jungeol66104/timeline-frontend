import React, {useRef, useState} from 'react';
import Image from "next/image";
import ShareButton from "@/components/layout/share/shareButton";
import FeedbackButton from "@/components/layout/feedbackButton";

const ProfileButton = () => {
    const profileButtonRef = useRef<HTMLButtonElement>(null)
    const [isToggle, setIsToggle] = useState(false)

    const handleClick = (e: React.MouseEvent) => {
        const profileButton = profileButtonRef.current
        if (!profileButton) return
        e.stopPropagation()
        setIsToggle(true)

        document.addEventListener('click', function hideMenu (e: MouseEvent) {
            if (!profileButton.contains(e.target as Node)) {
                setIsToggle(false)
                document.removeEventListener('click', hideMenu)
            }
        })
    }


    return (
        <div className={'relative mr-4 flex justify-center items-center shrink-0'}>
            {/*<button ref={profileButtonRef} onClick={handleClick}><Image src={'/svg/menu.svg'} alt={'menu'} width={24} height={24} /></button>*/}
            <button ref={profileButtonRef} onClick={handleClick}><Image className={'rounded-full'} src={'/images/profile.jpg'} alt={'profile'} width={30} height={30} /></button>
            {isToggle &&
                <div className={'absolute top-6 right-0 w-[110px] bg-white border-[1px] rounded-md shadow-md'}>
                    <ShareButton />
                    <FeedbackButton />
                </div>
            }
        </div>
    );
};

export default ProfileButton;
