import {useRouter} from 'next/router'

const eventPage = () => {
    const router = useRouter()
    // should fetch info from db by sending query
    return (
        <div className={'page'}>
            <div className={'mt-5 mb-5 z-40 flex flex-col gap-10'}>
                <div className={'flex flex-col gap-2.5'}>
                    <h1 className={'text-2xl font-black'}>{router.query.event}</h1>
                    <p>1950년 6월 25일, 북한의 무차별적인 군사침공으로 한반도에 전쟁의 불씨가 튀었습니다. 침공에 대한 남한과 유엔군의 대응은 한국 전쟁의 시작을 알렸습니다. 이 전쟁은 냉전 시대의 심각한 국제 갈등의 결과로, 많은 희생과 파괴를 남긴 충돌로서 역사에 남았습니다.</p>
                </div>
                <div className={'flex flex-col gap-2.5'}>
                    <h2 className={'text-lg font-semibold'}>연관된 타임라인</h2>
                    <div className={'flex gap-2.5 text-gray-500'}>
                        <span>#전쟁</span>
                        <span>#한국전쟁</span>
                        <span>#냉전</span>
                        <span>#한국전쟁사</span>
                        <span>#미국전쟁사</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default eventPage