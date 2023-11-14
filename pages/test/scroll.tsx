import {RefObject, useEffect, useRef} from "react";

const Scroll = () => {

    useEffect(() => {
        const scrollWrapper: HTMLDivElement | null = typeof window !== 'undefined' ? document.querySelector('.page') : null
        if (!scrollWrapper) return
        scrollWrapper.scrollTop = 2000
    })

    return (
        <div className={'page'}>
            {Array(100).fill(1).map((_,i) => {
               return <div key={i} className={'w-[100px] h-[100px] border-2 border-black'}>{i}</div>
            })}
        </div>
    )
}

export default Scroll