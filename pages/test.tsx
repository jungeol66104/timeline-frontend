import {useEffect} from "react";

const Test = () => {
    useEffect(() => {
        const scrollWrapper: HTMLDivElement | null = typeof window !== 'undefined' ? document.querySelector('.page') : null
        if (!scrollWrapper) return

        const handleScroll = ()=> {
            console.log('hi')
            if (scrollWrapper.scrollTop > 4000) {
                console.log('hi')
                scrollWrapper.scrollTop = 500
            }
        }

        scrollWrapper.addEventListener('scroll', handleScroll)
        return () => {
            scrollWrapper.removeEventListener('scroll', handleScroll)
        }
    });

    return (
        <div className={'page h-full overflow-auto relative'}>
            <TestWrapper />
        </div>
    )
}

export default Test

const TestWrapper = () => {
    return (
        <div className={'absolute top-0 w-full'}>
            <div className={'container w-full flex flex-col'}>
                {Array(100).fill(1).map((l,i) => {
                    return <div key={i} className={'relative flex flex-shrink-0 testBox w-[100px] h-[100px] border-black border-2'}>{i}</div>
                })}
            </div>
        </div>
    )
}