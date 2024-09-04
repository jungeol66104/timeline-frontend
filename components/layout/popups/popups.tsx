import React from 'react';
import {useSelector} from "react-redux";
import {selectPopupType} from "@/store/slices/appearanceSlice";
import SharePopup from "@/components/layout/popups/sharePopup";
import SignInPopup from "@/components/layout/popups/signInPopup";
import CreatePopup from "@/components/layout/popups/createPopup";
import PublishPopup from "@/components/layout/popups/publishPopup";
import DateGuidePopup from "@/components/layout/popups/dateGuidePopup";
import DateErrorPopup from "@/components/layout/popups/dateErrorPopup";

const Popups = () => {
    const popupType = useSelector(selectPopupType)

    return (
        <>
            {popupType === 'share' && <SharePopup />}
            {popupType === 'signIn' && <SignInPopup />}
            {popupType === 'create' && <CreatePopup />}
            {popupType === 'publish' && <PublishPopup />}
            {popupType === 'dateGuide' && <DateGuidePopup />}
            {popupType === 'dateError' && <DateErrorPopup />}
        </>
    );
};

export default Popups;
