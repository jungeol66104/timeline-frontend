import React from 'react';
import Image from "next/image";

const MenuButton = () => {


    return (
        <>
            <button><Image src={'/svg/menu.svg'} alt={'menu'} width={24} height={24} /></button>

        </>
    );
};

export default MenuButton;
