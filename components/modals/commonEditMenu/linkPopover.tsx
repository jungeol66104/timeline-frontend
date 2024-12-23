import React, {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectEditPopoverType, updateEditPopoverType} from "@/store/slices/appearanceSlice";
import {selectSearchedTimelines, selectSearchValue, updateSearchValue} from "@/store/slices/searchSlice";
import LinkPopoverSearchContent from "@/components/modals/commonEditMenu/linkPopoverSearchContent";
import useSearch from "@/hooks/useSearch";
import {Editor} from "@tiptap/core";

const LinkPopover = ({editor}: {editor: Editor | null}) => {
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

    const handleClick = (type: string, url: string, title?: string) => {
       if (editor?.state.selection.empty) {
           const text = type === 'timeline' ? title : url
           editor.chain().focus().insertContent(`<a href="${url}" target="_blank" rel="noopener noreferrer nofollow">${text}</a>`).run();
       }

        editor?.commands.setLink({href: url})
        dispatch(updateSearchValue(''))
        dispatch(updateEditPopoverType('none'))
    }

    return (
        <div id={'linkPopover'} className={`${editPopoverType !== 'link' && 'hidden'} absolute bottom-0 w-full max-w-[300px] flex flex-col border-[0.1px] border-gray-300 bg-white drop-shadow-sm rounded-md`} style={{left: 0}}>
            <div className={'overflow-y-auto p-0.5 w-full max-h-[170px] flex flex-col-reverse border-b-[0.1px] border-gray-300'}>
                {searchedTimelines.length < 1 && searchValue === '' && <div className={'py-1 w-full'}></div>}
                {searchValue !== '' &&
                    <button onClick={() => handleClick('url', searchValue)} className={'p-1.5 w-full flex items-center gap-2.5 hover:text-blue-700 hover:bg-gray-100 rounded-sm'}>
                        <div className={'shrink-0 material-symbols-outlined pt-[0.5px] w-6 text-[22px] '}>&#xe178;</div>
                        <div className={'w-full text-start text-sm font-medium flex-1 line-clamp-1'}>Link to the URL</div>
                    </button>
                }
                {searchedTimelines.map((timeline, i) => {
                    return <LinkPopoverSearchContent handleClick={handleClick} key={i} searchResult={timeline}/>
                })}
            </div>
            <div className={'px-2 w-full h-9 flex items-center'}><input ref={inputRef} className={'w-full'} onChange={(e) => dispatch(updateSearchValue(e.target.value))} value={searchValue} placeholder={'Paste link or search timelines'} style={{outline: 'none', transform: 'scale(0.875)', transformOrigin: 'top left'}}/></div>
        </div>
    );
};

export default LinkPopover;
