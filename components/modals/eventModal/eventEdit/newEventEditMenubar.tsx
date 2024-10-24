import React from 'react';
import SaveEventButton from "@/components/modals/eventModal/eventEdit/saveEventButton";
import KeynoteButton from "@/components/modals/eventModal/eventEdit/keynoteButton";

const NewEventEditMenubar = () => {
    return (
        <div className={'sticky bottom-3 w-full h-[36px] flex items-center justify-between'}>
            <div className={'p-0.5 flex items-center gap-0.5 h-[36px] border-[0.1px] border-gray-300 bg-white drop-shadow-sm rounded-md'}>
                <button className={`material-symbols-outlined text-[20px] w-9 h-8 rounded-md hover:bg-gray-100`}>&#xe43e;</button>
                <button className={`pt-[1px] material-symbols-outlined text-[20px] w-9 h-8 rounded-md hover:bg-gray-100`}>&#xf85a;</button>

                <button className={`material-symbols-outlined text-[25px] w-9 h-8 rounded-md hover:bg-gray-100`}>&#xf018;</button>
                <button className={`material-symbols-outlined text-[20px] w-9 h-8 rounded-md hover:bg-gray-100`}>&#xf191;</button>
                <button className={`material-symbols-outlined text-[20px] w-9 h-8 rounded-md hover:bg-gray-100`}>&#xe241;</button>

                <button className={`material-symbols-outlined text-[22px] w-9 h-8 rounded-md hover:bg-gray-100`}>&#xe178;</button>
                <button className={`material-symbols-outlined text-[22px] w-9 h-9 rounded-md hover:bg-gray-100`}>&#xe238;</button>
                <button className={`material-symbols-outlined text-[20px] w-9 h-9 rounded-md hover:bg-gray-100`}>&#xe257;</button>
            </div>
            <div className={'flex gap-3'}>
                <div className={'p-0.5 flex items-center gap-0.5 h-[36px] border-[0.1px] border-gray-300 bg-white drop-shadow-sm rounded-md'}>
                    <KeynoteButton />
                    <button className={`px-2.5 h-8 text-sm rounded-md hover:bg-gray-100 font-semibold`}>Connect</button>
                    <button className={`px-2.5 h-8 text-sm text-red-700 rounded-md hover:bg-gray-100 font-semibold`}>Detach</button>
                </div>
                <SaveEventButton/>
            </div>
        </div>
    );
};

export default NewEventEditMenubar;