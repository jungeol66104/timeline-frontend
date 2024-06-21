import React from 'react';
import ShareButtonTemplate from "@/components/modal/shareModal/shareElementButtonTemplate";

const FacebookButton = () => {
    const handleClick = () => {
        window.open(`http://www.facebook.com/sharer/sharer.php?u=${window.location.href}`, '_blank', `width=488, height=${window.screen.height}, top=0, left=${window.screen.width/2 - 244}, scrollbars=yes`);

    }

    return (
        <ShareButtonTemplate handleClick={handleClick} svgPath={'/svg/facebook.svg'} title={'Facebook'} />
    );
};

export default FacebookButton;
