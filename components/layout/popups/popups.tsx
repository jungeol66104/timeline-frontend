import React from 'react';
import {useSelector} from "react-redux";
import {selectPopupType} from "@/store/slices/appearanceSlice";
import SharePopup from "@/components/layout/popups/share/sharePopup";
import SignInPopup from "@/components/layout/popups/signInPopup";
import CreatePopup from "@/components/layout/popups/createPopup";
import PublishPopup from "@/components/layout/popups/publishPopup";
import DateGuidePopup from "@/components/layout/popups/dateGuidePopup";
import DateErrorPopup from "@/components/layout/popups/dateErrorPopup";
import ProfileSettingsPopup from "@/components/layout/popups/settings/profileSettingsPopup";
import DeleteAccountPopup from "@/components/layout/popups/deleteAccountPopup";
import DetachEventPopup from "@/components/layout/popups/detachEventPopup";
import TitleErrorPopup from "@/components/layout/popups/titleErrorPopup";
import SameTitlePopup from "@/components/layout/popups/sameTitlePopup";

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
            {popupType === 'titleError' && <TitleErrorPopup />}
            {popupType === 'settings' && <ProfileSettingsPopup />}
            {popupType === 'deleteAccount' && <DeleteAccountPopup />}
            {popupType === 'detachEvent' && <DetachEventPopup />}
            {popupType === 'sameTitle' && <SameTitlePopup />}
        </>
    );
};

export default Popups;
