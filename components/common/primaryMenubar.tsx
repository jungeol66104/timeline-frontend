import React from 'react';
import ContributorsButton from "@/components/common/contributorsButton";
import ModalContentTypeButton from "@/components/modal/modalContentTypeButton";

const PrimaryMenubar = () => {
    return (
        <div className={'tiptapMenubar w-full flex justify-between z-10'}>
            <ContributorsButton/>
            <ModalContentTypeButton/>
        </div>
    );
};

export default PrimaryMenubar;
