import React from 'react';
import ShareButtonTemplate from "@/components/layout/share/shareButtonTemplate";

const FacebookButton = () => {
    return (
        <ShareButtonTemplate svgPath={'/svg/facebook.svg'} title={'facebook'} />
    );
};

export default FacebookButton;
