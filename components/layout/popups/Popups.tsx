import React from 'react';
import {useSelector} from "react-redux";
import {selectPopupType} from "@/store/slices/appearanceSlice";
import SharePopup from "@/components/layout/popups/sharePopup";
import SignInPopup from "@/components/layout/popups/signInPopup";

const Popups = () => {
    const popupType = useSelector(selectPopupType)

    return (
        <>
            {popupType === 'share' && <SharePopup />}
            {popupType === 'signIn' && <SignInPopup />}
        </>
    );
};

export default Popups;
