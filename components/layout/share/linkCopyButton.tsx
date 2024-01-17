import React from 'react';
import ShareButtonTemplate from "@/components/layout/share/shareButtonTemplate";

const LinkCopyButton = () => {
    return (
        <ShareButtonTemplate svgPath={'/svg/link.svg'} title={'링크 복사'} />
    );
};

export default LinkCopyButton;
