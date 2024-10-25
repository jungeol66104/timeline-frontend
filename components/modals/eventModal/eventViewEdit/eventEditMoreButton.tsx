import React, {useRef, useState} from 'react';
import EventEditRelationshipMenubar from "@/components/modals/eventModal/eventViewEdit/eventEditRelationshipMenubar";

const EventEditMoreButton = () => {
    const eventEditMoreButtonRef = useRef<HTMLButtonElement>(null)
    const imageEditMenuRef = useRef<HTMLDivElement>(null)
    const [isToggle, setIsToggle] = useState(false)

    const handleClick = (e: React.MouseEvent) => {
        const eventEditMoreButton = eventEditMoreButtonRef.current
        const imageEditMenu = imageEditMenuRef.current
        if (!eventEditMoreButton || !imageEditMenu) return
        e.stopPropagation()
        setIsToggle(true)

        document.addEventListener('click', function hideMenu (e: MouseEvent) {
            if (!eventEditMoreButton.contains(e.target as Node) && !imageEditMenu.contains(e.target as Node)) {
                setIsToggle(false)
                document.removeEventListener('click', hideMenu)
            }
        })
    }

    return (
        <div className={'relative'}>
            <button ref={eventEditMoreButtonRef} onClick={handleClick} className={'material-symbols-outlined text-[22px] w-[36px] h-[36px] bg-white hover:bg-gray-100 border-[0.1px] border-gray-300 drop-shadow-sm rounded-md'}>&#xe5d3;</button>
            <div ref={imageEditMenuRef} className={`${!isToggle && 'hidden'} absolute bottom-[38px] right-0`}>
               <EventEditRelationshipMenubar/>
            </div>
        </div>

    );
};

export default EventEditMoreButton;
