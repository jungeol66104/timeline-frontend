import React from 'react';

const PopupOverlay = () => {
    const overlay = true

    const handleClick = () => {

    }

    return (
        <div onClick={handleClick} className={`${overlay ? 'opacity-30' : 'pointer-events-none opacity-0'} absolute w-full h-full top-0 bg-black`} style={{zIndex: 5001, transition: 'opacity 0.3s'}}></div>
    )
};

export default PopupOverlay;
