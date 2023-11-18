import {useRouter} from "next/router";
import {useEffect} from "react";
// refactoring: clear

export default function Home() {
    const router = useRouter()
    useEffect(() => {
        router.push(`/timelines/11`)
    }, []);
    return <div className={'page'}></div>
}
