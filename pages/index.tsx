import {useRouter} from "next/router";
import {useEffect} from "react";
// refactoring: clear

export default function Home() {
    const router = useRouter()
    useEffect(() => {
        router.push('/timelines/전쟁')
    }, []);
    
    return <></>
}
