import React from 'react';
import ShareButtonTemplate from "@/components/modal/shareModal/shareElementButtonTemplate";

const XButton = () => {
    const handleClick = () => {
        window.open(`https://twitter.com/intent/tweet?text=${document.title}&url=${window.location.href}`, '_blank', `width=488, height=${window.screen.height}, top=0, left=${window.screen.width/2 - 244}, scrollbars=yes`);
    }

    return (
        <ShareButtonTemplate handleClick={handleClick} svgPath={'/svg/x.svg'} title={'X'} size={18}/>
    );
};

export default XButton;
