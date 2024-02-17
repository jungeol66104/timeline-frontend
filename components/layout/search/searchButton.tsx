import React from 'react';
import Image from "next/image";
import {selectIsSearch, updateIsSearch} from "@/store/slices/searchSlice";
import {useDispatch, useSelector} from "react-redux";
import MobileSearchBar from "@/components/layout/search/MobileSearchBar";

const SearchButton = () => {
    const dispatch = useDispatch()
    const isSearch = useSelector(selectIsSearch)

    return (
        <>
            <button className={'w-[36px] h-[36px] flex items-center justify-center rounded-full bg-white hover:bg-gray-100 '}><Image onClick={() => dispatch(updateIsSearch(true))} src={'/svg/search.svg'} alt={'search'} width={24} height={24} /></button>
            {isSearch && <MobileSearchBar />}
        </>
    );
};

export default SearchButton;
