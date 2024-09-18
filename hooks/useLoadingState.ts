import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import NProgress from "@/utils/nprogress";

const useLoadingState = () => {
    const [loadingState, setLoadingState] = useState('none');
    const router = useRouter();

    useEffect(() => {
        const start = () => {
            NProgress.start()
            setLoadingState('preparing');
        }
        const middle = () => {
            setLoadingState('applying');
        }
        const end = () => {
            setLoadingState('none');
            NProgress.done()
        }

        router.events.on('routeChangeStart', start);
        router.events.on('beforeHistoryChange', middle);
        router.events.on('routeChangeComplete', end);
        router.events.on('routeChangeError', end);

        return () => {
            router.events.off('routeChangeStart', start);
            router.events.off('beforeHistoryChange', middle);
            router.events.off('routeChangeComplete', end);
            router.events.off('routeChangeError', end);
        };
    }, [router.events]);

    return loadingState;
};

export default useLoadingState;
