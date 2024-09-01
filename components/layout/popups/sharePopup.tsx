import React from 'react';
import LinkCopyButton from "@/components/layout/popups/share/linkCopyButton";
import XButton from "@/components/layout/popups/share/xButton";
import FacebookButton from "@/components/layout/popups/share/facebookButton";
import KakaotalkButton from "@/components/layout/popups/share/kakaotalkButton";
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
