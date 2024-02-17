import React from 'react';

const Footer = () => {
    return (
        <footer className={'px-5 py-2.5 border-t-[1px] flex justify-between text-sm'}>
            <span>© 2024 Timeline</span>
            <div className={'flex gap-4 hidden'}>
                <span>Terms</span>
                <span>Privacy</span>
            </div>
        </footer>
    );
};

export default Footer;
