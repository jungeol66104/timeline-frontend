import React from 'react';
import {selectIsSearch, updateIsSearch} from "@/store/slices/searchSlice";
import {useDispatch, useSelector} from "react-redux";
import MobileSearchBar from "@/components/layout/search/MobileSearchBar";

const SearchButton = () => {
    const dispatch = useDispatch()
    const isSearch = useSelector(selectIsSearch)

    return (
        <div className={'justify-center items-center mr-4 hidden max-[850px]:flex'}>
            <button onClick={() => dispatch(updateIsSearch(true))} className={'material-symbols-outlined w-[24px] h-[24px] flex items-center justify-center rounded-full bg-white'}>&#xe8b6;</button>
            {isSearch && <MobileSearchBar />}
        </div>
    );
};

export default SearchButton;
