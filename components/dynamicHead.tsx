import React from 'react';
import {useSelector} from "react-redux";
import Head from 'next/head'
import {selectCurrentEvent, selectCurrentEvents, selectCurrentTimeline} from "@/store/slices/contentsSlice";
// refactoring: needed (make perfect description for the page)

const DynamicHead = ({type}: {type: string} ) => {
    const currentTimeline = useSelector(selectCurrentTimeline)
    const currentEvent = useSelector(selectCurrentEvent)
    const currentEvents = useSelector(selectCurrentEvents)
    const title = type === "timeline" ? `${currentTimeline.name} - Timeline` : type === "event" ? `${currentEvent.name} - Timeline` : "Timeline | Finanace, History, Personalities, and More"
    const description = type === "timeline" ? `Timeline about ${currentTimeline.name}. ${currentEvents.map(cEvent => cEvent.name).join(', ')}.` : type === "event" ? `${currentEvent.description}` : "\"A timeline that encompasses various topics. From the past to the present, the timeline redefines knowledge with rich content. Explore various aspects of the world, covering topics such as finance, history, personalities, and more."
    const url = type === "timeline" ? `https://timeline.vg/timelines/${currentTimeline.id}` : type === "event" ? `https://timeline.vg/events/${currentEvent.id}` : "https://timeline.vg"

    return (
        <Head>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="description" content={description} />
            <meta name="keywords" content="timeilnes, events, history, humanity, personalities" />
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
