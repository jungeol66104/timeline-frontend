import DynamicHead from "@/components/dynamicHead";
// refactoring: clear


export default function Home() {
    return (
        <>
            <DynamicHead type={'index'}/>
            <div className={'page'}></div>
        </>
    )
}
