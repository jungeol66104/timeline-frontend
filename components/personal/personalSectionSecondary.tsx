import React from 'react'

const PersonalSectionSecondary = () => {
    return (
        <div className={`relative my-3 ml-[20px] max-[872px]:ml-0 py-3 px-4 flex flex-col gap-3 w-full min-w-[332px] max-w-[352px] max-[852px]:max-w-[630px] border-[0.1px] border-gray-300 bg-white drop-shadow-sm rounded-xl`}>
            <div className={'w-[104px] h-[104px] rounded-full bg-gray-600'}></div>
            <div>
                <div className={'text-[20px] font-bold'}>Admin</div>
                <div>admin@gmail.com</div>
            </div>
            <button className={`pl-1.5 pr-2.5 flex items-center justify-center gap-1.5 h-[36px] w-fit border-[0.1px] border-gray-300 bg-white hover:bg-gray-100 drop-shadow-sm rounded-md`}>
                <div className={'material-symbols-outlined text-[18px]'}>&#xe92b;</div>
                <div className={'text-sm font-semibold'}>Delete Account</div>
            </button>
        </div>
    )
}
export default PersonalSectionSecondary
