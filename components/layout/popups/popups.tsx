import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectPopupType, selectShowGallery, updateShowGallery} from "@/store/slices/appearanceSlice";
import SharePopup from "@/components/layout/popups/share/sharePopup";
import LogInPopup from "@/components/layout/popups/login/logInPopup";
import CreatePopup from "@/components/layout/popups/createPopup";
import PublishPopup from "@/components/layout/popups/publishPopup";
import DateGuidePopup from "@/components/layout/popups/dateGuidePopup";
import DateErrorPopup from "@/components/layout/popups/dateErrorPopup";
import ProfileSettingsPopup from "@/components/layout/popups/settings/profileSettingsPopup";
import DeleteAccountPopup from "@/components/layout/popups/deleteAccountPopup";
import DetachEventPopup from "@/components/layout/popups/detachEventPopup";
import TitleErrorPopup from "@/components/layout/popups/titleErrorPopup";
import SameTitlePopup from "@/components/layout/popups/sameTitlePopup";
import Gallery from "@/components/layout/popups/gallery";

const Popups = () => {
    const popupType = useSelector(selectPopupType)
    const showGallery = useSelector(selectShowGallery)

    return (
        <>
            {showGallery && <Gallery/>}
            {popupType === 'share' && <SharePopup />}
            {popupType === 'signIn' && <LogInPopup />}
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
