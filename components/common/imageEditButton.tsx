import React, {useRef, useState} from 'react';
import RemoveImageButton from "@/components/common/removeImageButton";
import ReplaceImageButton from "@/components/common/replaceImageButton";

const ImageEditButton = () => {
    const imageEditButtonRef = useRef<HTMLButtonElement>(null)
    const imageEditMenuRef = useRef<HTMLDivElement>(null)
    const [isToggle, setIsToggle] = useState(false)

    const handleClick = (e: React.MouseEvent) => {
        const imageEditButton = imageEditButtonRef.current
        const imageEditMenu = imageEditMenuRef.current
        if (!imageEditButton || !imageEditMenu) return
        e.stopPropagation()
        setIsToggle(true)

        document.addEventListener('click', function hideMenu (e: MouseEvent) {
            if (!imageEditButton.contains(e.target as Node) && !imageEditMenu.contains(e.target as Node)) {
                setIsToggle(false)
                document.removeEventListener('click', hideMenu)
            }
        })
    }

    return (
        <div className={'z-10 relative'}>
            <button ref={imageEditButtonRef} onClick={handleClick} className={'material-symbols-outlined text-[22px] w-[36px] h-[36px] bg-white hover:bg-gray-100 border-[0.1px] border-gray-300 drop-shadow-sm rounded-md'}>&#xe3f4;</button>
            <div ref={imageEditMenuRef} className={`${!isToggle && 'hidden'} absolute top-[38px] left-0 px-1 py-1 w-[120px] bg-white border-[1px] rounded-md drop-shadow-md`}>
                <RemoveImageButton isMenu={true}/>
                <ReplaceImageButton isMenu={true} />
            </div>
        </div>
    );
};

export default ImageEditButton;
