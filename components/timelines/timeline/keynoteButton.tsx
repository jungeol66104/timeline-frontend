import React, {useRef, useState} from 'react';

const KeynoteDropdown = () => {
    const keynoteDropdownRef = useRef<HTMLButtonElement>(null)
    const [isToggle, setIsToggle] = useState(false)

    const handleClick = (e: React.MouseEvent) => {
        const keynoteDropdown = keynoteDropdownRef.current
        if (!keynoteDropdown) return
        e.stopPropagation()
        setIsToggle(true)

        document.addEventListener('click', function hideMenu (e: MouseEvent) {
            if (!keynoteDropdown.contains(e.target as Node)) {
                setIsToggle(false)
                document.removeEventListener('click', hideMenu)
            }
        })
    }

    return (
        <div className={'relative'}>
            <button ref={keynoteDropdownRef} onClick={handleClick} className={'pl-3 pr-1 w-[96px] h-[30px] flex items-center gap-1 bg-white border-[1px] border-gray-300 rounded-md'}>
                <span className={'text-sm font-semibold'}>Keynote</span>
                <div className={'material-symbols-outlined shrink-0 text-[20px]'}>&#xe5c5;</div>
            </button>
            {isToggle &&
                <div className={'absolute top-[32px] right-0 p-1.5 w-[96px] flex flex-col items-start bg-white border-[1px] rounded-md shadow-md'}>
                    <button className={'w-full h-[30px] flex items-center gap-1.5 pl-1.5 pr-3 py-1.5 rounded-md bg-white hover:bg-gray-100 text-left text-sm font-semibold'}>All</button>
                    <button className={'w-full h-[30px] flex items-center gap-1.5 pl-1.5 pr-3 py-1.5 rounded-md bg-white hover:bg-gray-100 text-left text-sm font-semibold'}>Keynote</button>
                </div>
                }
        </div>
    );
};

export default KeynoteDropdown;
