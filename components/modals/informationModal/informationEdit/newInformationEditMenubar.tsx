import React from 'react';
import SaveInformationButton from "@/components/modals/informationModal/informationEdit/saveInformationButton";

const NewInformationEditMenubar = () => {
    return (
        <div className={'sticky bottom-3 w-full h-[40px] flex items-center justify-between'}>
            <div className={'p-0.5 flex items-center gap-0.5 h-[40px] border-[0.1px] border-gray-300 bg-white drop-shadow-sm rounded-md'}>
                <button className={`material-symbols-outlined text-[20px] w-9 h-9 rounded-md hover:bg-gray-100`}>&#xe43e;</button>
                <button className={`material-symbols-outlined text-[20px] w-9 h-9 rounded-md hover:bg-gray-100`}>&#xf85a;</button>

                <button className={`material-symbols-outlined text-[25px] w-9 h-9 rounded-md hover:bg-gray-100`}>&#xf018;</button>
                <button className={`material-symbols-outlined text-[20px] w-9 h-9 rounded-md hover:bg-gray-100`}>&#xf191;</button>
                <button className={`material-symbols-outlined text-[20px] w-9 h-9 rounded-md hover:bg-gray-100`}>&#xe241;</button>

                <button className={`material-symbols-outlined text-[22px] w-9 h-9 rounded-md hover:bg-gray-100`}>&#xe178;</button>
                {/*<button className={`material-symbols-outlined text-[22px] w-9 h-9 rounded-md hover:bg-gray-100`}>&#xe238;</button>*/}
                {/*<button className={`material-symbols-outlined text-[20px] w-9 h-9 rounded-md hover:bg-gray-100`}>&#xe257;</button>*/}
            </div>
            <SaveInformationButton/>
        </div>
    );
};

export default NewInformationEditMenubar;