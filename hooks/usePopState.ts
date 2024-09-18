import {useRouter} from "next/router";
import {useEffect} from "react";

const usePopState = () => {
    const router = useRouter();

    useEffect(() => {
        const handlePopState = (event: PopStateEvent) => {
            if (event.state && event.state.url) router.push(event.state.url)
        }

        window.addEventListener('popstate', handlePopState);
        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [router]);
}

export default usePopState;