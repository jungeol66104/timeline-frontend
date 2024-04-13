import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const GA_TRACKING_ID = 'G-CKYR6VZ0BJ';

export const pageview = (url: URL) => {
    window.gtag('config', GA_TRACKING_ID, {page_path: url})
}

export const event = (action: Gtag.EventNames, {event_category, event_label, value}: Gtag.EventParams,) => {
    window.gtag('event', action, {event_category, event_label, value})
}

export const useGtag = () => {
    const router = useRouter()

    useEffect(() => {
        if (process.env.NODE_ENV === 'development') return

        const handleRouteChange = (url: URL) => {pageview(url)}
        router.events.on('routeChangeComplete', handleRouteChange)
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange)
        };
    }, [router.events]);
};