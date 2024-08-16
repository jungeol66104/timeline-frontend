import React, {useRef, useState} from 'react';
import DiscussionButton from "@/components/common/more/discussionButton";
import HistoryButton from "@/components/common/more/historyButton";
import RemoveImageButtonTest from "@/components/common/edit/removeImageButtonTest";
import ReplaceImageButtonTest from "@/components/common/edit/replaceImageButtonTest";

const ImageEditButton = () => {
    const imageEditButtonRef = useRef<HTMLButtonElement>(null)
    const [isToggle, setIsToggle] = useState(false)

    const handleClick = (e: React.MouseEvent) => {
        const imageEditButton = imageEditButtonRef.current
        if (!imageEditButton) return
        e.stopPropagation()
        setIsToggle(true)

        document.addEventListener('click', function hideMenu (e: MouseEvent) {
            if (!imageEditButton.contains(e.target as Node)) {
                setIsToggle(false)
                document.removeEventListener('click', hideMenu)
            }
        })
    }

    return (
        <div className={'absolute top-1 right-1'}>
            <button ref={imageEditButtonRef} onClick={handleClick} className={'material-symbols-outlined text-[22px] w-[36px] h-[36px] hover:bg-gray-100 border-[0.1px] border-gray-300 drop-shadow-sm rounded-md bg-white opacity-70'}>&#xe3f4;</button>
            {isToggle &&
                <div className={'absolute top-[38px] right-0 px-1.5 py-1 w-[156.33px] bg-white border-[1px] rounded-md drop-shadow-md'}>
                    <RemoveImageButtonTest />
                    <ReplaceImageButtonTest />
                </div>
            }
        </div>
    );
};

export default ImageEditButton;
