const Search = ({handleIsSearch}: {handleIsSearch: () => void}) => {
    return (
        <div>
            <div onClick={handleIsSearch} className={'absolute top-0 left-0 h-screen w-screen bg-black animate-fadeInForSearch z-30'}></div>
            <div className={'absolute bg-white h-[98vh] bottom-0 w-screen z-30 rounded-t-xl'}>
                <div className={'text-center p-3 font-black border-b-[1px]'}>전쟁</div>
                <div className={''}></div>
                <div className={''}></div>
            </div>
        </div>
    )
}

export default Search