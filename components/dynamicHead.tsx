import React from 'react';
import {useSelector} from "react-redux";
import Head from 'next/head'
import {selectCurrentEvent, selectCurrentTimeline} from "@/store/slices/contentsSlice";
// refactoring: needed (make perfect description for the page)

const DynamicHead = ({type}: {type: string} ) => {
    const currentTimeline = useSelector(selectCurrentTimeline)
    const currentEvent = useSelector(selectCurrentEvent)
    const title = type === "timeline" ? `${currentTimeline.name} | Timeline` : type === "event" ? `${currentEvent.name} | Timeline` : "타임라인 | Timeline"
    const description = type === "timeline" ? `${currentTimeline.name}에 대한 타임라인` : type === "event" ? `${currentEvent.description}` : "Discover dynamic timelines. Unveiling history and diverse subjects in a clean, interactive format. Explore past, present, and future seamlessly with our engaging timelines."
    const url = type === "timeline" ? `https://timeline.vg/timelines/${currentTimeline.id}` : type === "event" ? `https://timeline.vg/events/${currentEvent.id}` : "https://timeline.vg"

    return (
        <Head>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="description" content={description} />
            <meta name="keywords" content="timeilne, event, history, humanity" />
            <meta name="author" content="Project Yaha" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={url} />
            <meta property="og:image" content="/images/ogImage.png" />
            <meta property="og:type" content="website" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content="/images/twitterImage.png" />
            <link rel="canonical" href={url} />
            <link rel="shortcut icon" href="/images/favicon.ico" />
            <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png"/>
            <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png"/>
            <title>{title}</title>
        </Head>
    );
};
export default DynamicHead;
