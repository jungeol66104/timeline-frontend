import {useEffect} from "react";
import exp from "constants";

const Test = () => {

    useEffect(() => {
        const container = document.querySelector('.container')
        const reference = document.querySelector('.testBox')
        if (!container || !reference) return

        const newTestBox = document.createElement('div')
        newTestBox.style.height = '100px'
        newTestBox.style.width = '100px'
        newTestBox.style.border = '2px solid black'

        setTimeout(() => {
            container.insertBefore(newTestBox , reference)
        }, 5000)
    });

    return (
        <div className={'container'}>
            {Array(100).fill(1).map((l,i) => {
                return <div key={i} className={'testBox w-[100px] h-[100px] border-black border-2'}>{i}</div>
            })}
        </div>
    )
}

export default Test