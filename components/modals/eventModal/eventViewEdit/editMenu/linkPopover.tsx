import React, {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectEditPopoverType} from "@/store/slices/appearanceSlice";
import {selectSearchedTimelines, selectSearchValue, updateSearchValue} from "@/store/slices/searchSlice";
import LinkPopoverSearchContent from "@/components/modals/eventModal/eventViewEdit/editMenu/linkPopoverSearchContent";
import useSearch from "@/hooks/useSearch";
import Image from "next/image";
import {mapStrToNum} from "@/utils/global";

const LinkPopover = () => {
    const inputRef = useRef<HTMLInputElement>(null)

    const dispatch = useDispatch()
    const editPopoverType = useSelector(selectEditPopoverType)
    const searchValue = useSelector(selectSearchValue)
    const searchedTimelines = useSelector(selectSearchedTimelines).slice(0, 10)

    useEffect(() => {
        const searchInput = inputRef.current
        if (!searchInput) return

        if (editPopoverType === 'link') searchInput.focus()
    }, [editPopoverType]);

   useSearch()

    return (
        <div className={`${editPopoverType !== 'link' && 'hidden'} absolute bottom-0 w-[250px] flex flex-col border-[0.1px] border-gray-300 bg-white drop-shadow-sm rounded-md`} style={{left: 0}}>
            <div className={'py-0.5 w-full border-b-[1px] border-gray-300'}>
                <div className={'overflow-y-auto px-0.5 w-full max-h-[150px] flex flex-col-reverse'}>
                    {searchedTimelines.length < 1 && searchValue === '' && <div className={'py-1 w-full'}></div>}
                    {searchValue !== '' &&
                        <button className={'p-1.5 w-full flex items-center gap-2.5 hover:text-blue-700 hover:bg-gray-100 rounded-sm'}>
                            <div className={'shrink-0 material-symbols-outlined pt-[0.5px] w-6 text-[22px] '}>&#xe178;</div>
                            <div className={'w-full text-start text-sm font-medium flex-1 line-clamp-1'}>Link to the URL</div>
                        </button>
                    }
                    {searchedTimelines.map((timeline, i) => {
                        return <LinkPopoverSearchContent searchResult={timeline} key={i}/>
                    })}
                </div>
            </div>
            <div className={'px-2 w-full h-9 flex items-center gap-3'}>
                <input ref={inputRef} className={'w-full'} onChange={(e) => dispatch(updateSearchValue(e.target.value))} value={searchValue} placeholder={'Paste link or search timelines'} style={{outline: 'none', transform: 'scale(0.875)', transformOrigin: 'top left'}}/>
                {/*<button className={'shrink-0 material-symbols-outlined text-[22px] w-9 h-8 rounded-md hover:bg-gray-100'}>&#xe178;</button>*/}
            </div>
        </div>
    );
};

export default LinkPopover;

// useLayoutEffect(() => {
//     if (editPopoverType === 'link') {
//         const button = buttonRef.current
//         const menu = menuRef.current
//         const editMenubar = button?.closest('.editMenubar')
//         if (!button || !menu || !editMenubar) return
//
//         const buttonRect = button.getBoundingClientRect()
//         const menuRect = menu.getBoundingClientRect()
//         const editMenubarRect = editMenubar.getBoundingClientRect()
//
//         if (menuRect.left - editMenubarRect.left < 0) {
//             menu.style.left = '0';
//             menu.style.right = 'auto';
//             menu.style.transform = `translateX(${-buttonRect.left}px)`;
//         } else if (menuRect.right - editMenubarRect.right > 0) {
//             menu.style.left = 'auto';
//             menu.style.right = '0';
//             menu.style.transform = `translateX(${editMenubarRect.right - buttonRect.right}px)`;
//         }
//     }
// }, [isShow]);