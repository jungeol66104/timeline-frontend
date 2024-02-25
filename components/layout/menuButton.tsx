import React, {useRef, useState} from 'react';
import Image from "next/image";
import ShareButton from "@/components/layout/share/shareButton";
import FeedbackButton from "@/components/layout/feedbackButton";

const MenuButton = () => {
    const menuButtonRef = useRef<HTMLButtonElement>(null)
    const [isToggle, setIsToggle] = useState(false)

    const handleClick = (e: React.MouseEvent) => {
        const menuButton = menuButtonRef.current
        if (!menuButton) return
        e.stopPropagation()
        setIsToggle(true)

        document.addEventListener('click', function hideMenu (e: MouseEvent) {
            if (!menuButton.contains(e.target as Node)) {
                setIsToggle(false)
                document.removeEventListener('click', hideMenu)
            }
        })
    }


    return (
        <div className={'relative mr-4 flex justify-center items-center'}>
            <button ref={menuButtonRef} onClick={handleClick}><Image src={'/svg/menu.svg'} alt={'menu'} width={24} height={24} /></button>
            {isToggle &&
                <div className={'absolute top-6 right-0 w-[110px] bg-white border-[1px] rounded-md shadow-md'}>
                    <ShareButton />
                    <FeedbackButton />
                </div>
            }
        </div>
    );
};

export default MenuButton;
