import React, {useLayoutEffect, useRef, useState} from 'react';
import EventEditRelationshipMenubar from "@/components/modals/eventModal/eventViewEdit/editMenu/eventEditRelationshipMenubar";

const EventEditMoreButton = () => {
    const buttonRef = useRef<HTMLButtonElement>(null)
    const menuRef = useRef<HTMLDivElement>(null)
    const [isShow, setIsShow] = useState(false)

    const handleClick = (e: React.MouseEvent) => {
        const button = buttonRef.current
        const menu = menuRef.current
        if (!button || !menu) return

        e.stopPropagation()
        setIsShow(prev => !prev)

        document.addEventListener('click', function hideMenu (e: MouseEvent) {
            if (!button.contains(e.target as Node) && !menu.contains(e.target as Node)) {
                setIsShow(false)
                document.removeEventListener('click', hideMenu)
            }
        })
    }

    useLayoutEffect(() => {
        if (isShow) {
            const button = buttonRef.current
            const menu = menuRef.current
            const editMenubar = button?.closest('.editMenubar')
            if (!button || !menu || !editMenubar) return

            const buttonRect = button.getBoundingClientRect()
            const menuRect = menu.getBoundingClientRect()
            const editMenubarRect = editMenubar.getBoundingClientRect()

            if (menuRect.left - editMenubarRect.left < 0) {
                menu.style.left = '0';
                menu.style.right = 'auto';
                menu.style.transform = `translateX(${-buttonRect.left + 12}px)`;
            } else if (menuRect.right - editMenubarRect.right > 0) {
                menu.style.left = 'auto';
                menu.style.right = '0';
                menu.style.transform = `translateX(${editMenubarRect.right - buttonRect.right}px)`;
            }
        }
    }, [isShow]);

    return (
        <div className={'relative'}>
            <button ref={buttonRef} onClick={handleClick} className={'material-symbols-outlined text-[22px] w-[36px] h-[36px] bg-white hover:bg-gray-100 border-[0.1px] border-gray-300 drop-shadow-sm rounded-md'}>&#xe5d3;</button>
            <div ref={menuRef} className={`${!isShow && 'hidden'} absolute bottom-[38px]`} style={{left: '50%', transform: 'translateX(-50%)'}}>
               <EventEditRelationshipMenubar/>
            </div>
        </div>

    );
};

export default EventEditMoreButton;
