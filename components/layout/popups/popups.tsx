import React from 'react';
import {useSelector} from "react-redux";
import {selectPopupType} from "@/store/slices/appearanceSlice";
import SharePopup from "@/components/layout/popups/sharePopup";
import SignInPopup from "@/components/layout/popups/signInPopup";
import CreatePopup from "@/components/layout/popups/createPopup";
import PublishPopup from "@/components/layout/popups/publishPopup";

const Popups = () => {
    const popupType = useSelector(selectPopupType)

    return (
        <>
            {popupType === 'share' && <SharePopup />}
            {popupType === 'signIn' && <SignInPopup />}
            {popupType === 'create' && <CreatePopup />}
            {popupType === 'publish' && <PublishPopup />}
        </>
    );
};

export default Popups;
