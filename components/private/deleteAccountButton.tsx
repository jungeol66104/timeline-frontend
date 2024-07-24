const DeleteAccountButton = () => {
    return (
        <button className={`px-2 flex items-center justify-center gap-1.5 h-[36px] w-fit border-[0.1px] border-gray-300 bg-white hover:bg-gray-100 drop-shadow-sm rounded-md`}>
            <div className={'material-symbols-outlined text-[18px]'}>&#xe92b;</div>
            <div className={'text-sm font-semibold'}>Delete Account</div>
        </button>
    );
};

export default DeleteAccountButton;
