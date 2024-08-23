import React from 'react';
import LinkCopyButton from "@/components/modals/shareModal/linkCopyButton";
import XButton from "@/components/modals/shareModal/xButton";
import FacebookButton from "@/components/modals/shareModal/facebookButton";
import KakaotalkButton from "@/components/modals/shareModal/kakaotalkButton";
import Popup from "@/components/layout/popups/popup";

const SharePopup = () => {
    return (
        <Popup title={'Share'}>
            <div className={'flex flex-col gap-5 font-medium'}>
                <div className={'w-full px-5 shrink-0 flex gap-[30px] py-5 overflow-x-auto'}>
                    <LinkCopyButton/>
                    <XButton/>
                    <FacebookButton/>
                    <KakaotalkButton/>
                </div>
            </div>
        </Popup>
    );
};

export default SharePopup;
