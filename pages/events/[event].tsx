import {useRouter} from 'next/router'

const eventPage = () => {
    const router = useRouter()
    return (
        <>
            <div className={'h-[70px]'}></div>
            <div>{router.query.event}</div>
        </>
    )
}

export default eventPage