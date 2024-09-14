const UndoButton = () => {
    return (
        <button className={`p-3 flex items-center justify-center gap-1.5 h-[36px] border-[0.1px] border-gray-300 bg-white hover:bg-gray-100 drop-shadow-sm rounded-md`}>
            <div className={'text-sm font-semibold'}>Undo</div>
        </button>
    )
}
export default UndoButton;