import React from 'react';
import SaveInformationButton from "@/components/modals/informationModal/informationEdit/saveInformationButton";

const NewInformationEditMenubar = () => {
    return (
        <div className={'sticky bottom-3 w-full h-[36px] flex justify-between'}>
            <div className={'p-0.5 flex items-center gap-0.5 h-[36px] border-[0.1px] border-gray-300 bg-white drop-shadow-sm rounded-md'}>
                <button className={`material-symbols-outlined text-[20px] w-8 h-8 rounded-md hover:bg-gray-100`}>&#xe43e;</button>
                <button className={`material-symbols-outlined text-[20px] w-8 h-8 rounded-md hover:bg-gray-100`}>&#xf85a;</button>

                <button className={`material-symbols-outlined text-[25px] w-8 h-8 rounded-md hover:bg-gray-100`}>&#xf018;</button>
                <button className={`material-symbols-outlined text-[20px] w-8 h-8 rounded-md hover:bg-gray-100`}>&#xf191;</button>
                <button className={`material-symbols-outlined text-[20px] w-8 h-8 rounded-md hover:bg-gray-100`}>&#xe241;</button>

                <button className={`material-symbols-outlined text-[22px] w-8 h-8 rounded-md hover:bg-gray-100`}>&#xe178;</button>
                <button className={`material-symbols-outlined text-[22px] w-8 h-8 rounded-md hover:bg-gray-100`}>&#xe238;</button>
                <button className={`material-symbols-outlined text-[20px] w-8 h-8 rounded-md hover:bg-gray-100`}>&#xe257;</button>
            </div>
            <SaveInformationButton/>
        </div>
    );
};

export default NewInformationEditMenubar;

{/*<button className={`px-2.5 w-[55px] h-8 text-sm rounded-md ${contentType === 'view' ? 'border-[0.1px] border-gray-300 bg-gray-600 text-white font-medium drop-shadow-sm' : 'hover:bg-gray-100 font-semibold'}`}>View</button>*/}
{/*    <div className={'material-symbols-outlined text-[20px]'}>&#xe145;</div>*/}
{/*    <div className={'text-sm font-semibold'}>Add Event</div>*/}
