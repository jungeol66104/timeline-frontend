import {useDispatch, useSelector} from "react-redux";
import {selectIsSearch, updateIsSearch} from "@/store/slices/searchSlice";
import {selectViewportHeight} from "@/store/slices/appearanceSlice";
import {RefObject, useEffect, useRef} from "react";

const SearchTest = () => {
    const searchBarInputRef: RefObject<HTMLInputElement> = useRef(null)

    const dispatch = useDispatch()
    const viewportHeight = useSelector(selectViewportHeight)
    const isSearch = useSelector(selectIsSearch)

    useEffect(() => {
        const searchBarInput = searchBarInputRef.current
        if (!searchBarInput) return;
        if(isSearch)
            searchBarInput.focus()
    }, [isSearch]);

    let searchHeight = viewportHeight === 0 ? 'calc(-100vh)': viewportHeight - 60
    return (
        <div onClick={() => dispatch(updateIsSearch())} className={'fixed flex items-center justify-center bg-gray-600 w-screen'} style={{zIndex: 9999, height: searchHeight, top: !isSearch ? -searchHeight : 60, transition: 'all 0.3s'}}>
            <input ref={searchBarInputRef}/>
        </div>
    )
}
export default SearchTest