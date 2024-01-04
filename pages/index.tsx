// refactoring: clear

import DynamicHead from "@/components/dynamicHead";

export default function Home() {
    return (
        <>
            <DynamicHead type={'index'}/>
            <div className={'page'}></div>
        </>
    )
}
