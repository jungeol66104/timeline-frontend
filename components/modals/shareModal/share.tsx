import React from 'react';
import {useSelector} from "react-redux";
import {selectIsShare} from "@/store/slices/appearanceSlice";
import LinkCopyButton from "@/components/modals/shareModal/linkCopyButton";
import KakaotalkButton from "@/components/modals/shareModal/kakaotalkButton";
import XButton from "@/components/modals/shareModal/xButton";
import FacebookButton from "@/components/modals/shareModal/facebookButton";


const Share = () => {
    const isShare = useSelector(selectIsShare)

    const bottom = isShare ? 0 : -150
    return (
        <>
            <div className={'share fixed w-full max-w-lg h-[150px] left-1/2 transform -translate-x-1/2 bg-white rounded-t-2xl flex flex-col items-center'} style={{zIndex:5002, bottom: bottom,  transition: 'bottom 0.3s'}}>
                <h2 className={'font-semibold text-md py-2.5 border-b-[1px] w-full text-center'}>Share</h2>
                <div className={'w-full px-5 shrink-0 flex gap-[30px] py-5 overflow-x-auto'}>
                    <LinkCopyButton />
                    <XButton />
                    <FacebookButton />
                    <KakaotalkButton />
                </div>
            </div>
        </>

);
};

export default Share;