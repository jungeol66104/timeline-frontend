import React from 'react';

const KeynoteToggle = () => {
    return (
        <div className={'flex items-center justify-center gap-2'}>
            <span className={'text-sm font-semibold'}>Keynote</span>
            <input type={'checkbox'} checked className={'w-[14px]'}/>
        </div>
    );
};

export default KeynoteToggle;
