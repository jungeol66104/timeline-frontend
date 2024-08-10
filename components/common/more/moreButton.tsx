import React, {useRef, useState} from 'react';
import DiscussionButton from "@/components/common/more/discussionButton";
import HistoryButton from "@/components/common/more/historyButton";

const MoreButton = () => {
    const moreButtonRef = useRef<HTMLButtonElement>(null)
    const [isToggle, setIsToggle] = useState(false)

    const handleClick = (e: React.MouseEvent) => {
        const moreButton = moreButtonRef.current
        if (!moreButton) return
        e.stopPropagation()
        setIsToggle(true)

        document.addEventListener('click', function hideMenu (e: MouseEvent) {
            if (!moreButton.contains(e.target as Node)) {
                setIsToggle(false)
                document.removeEventListener('click', hideMenu)
            }
        })
    }

    return (
        <div className={'relative'}>
            <button ref={moreButtonRef} onClick={handleClick} className={'material-symbols-outlined text-[22px] w-[36px] h-[36px] hover:bg-gray-100 border-[0.1px] border-gray-300 drop-shadow-sm rounded-md'}>&#xe5d3;</button>
            {isToggle &&
                <div className={'absolute top-[38px] right-0 px-1.5 py-1 w-[156.33px] bg-white border-[1px] rounded-md drop-shadow-md'}>
                    <DiscussionButton />
                    <HistoryButton />
                </div>
            }
        </div>
    );
};

export default MoreButton;