import React from 'react';
import Head from 'next/head'
import {useSelector} from "react-redux";
import {selectCurrentEvent, selectCurrentTimeline} from "@/store/slices/contentsSlice";

const DynamicHead = ({type}: {type: string}) => {
    const currentTimeline = useSelector(selectCurrentTimeline)
    const currentEvent = useSelector(selectCurrentEvent)
    const title = type === "timeline" ? `${currentTimeline.name} | Timeline` : type === "event" ? `${currentEvent.name} | Timeline` : "Timeline"

    return (
        <Head>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="description" content="Discover dynamic timelines. Unveiling history and diverse subjects in a clean, interactive format. Explore past, present, and future seamlessly with our engaging timelines." />
            <meta name="keywords" content="timeilne, event, history, humanity" />
            <meta name="author" content="Project Yaha" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content="Discover dynamic timelines. Unveiling history and diverse subjects in a clean, interactive format. Explore past, present, and future seamlessly with our engaging timelines." />
            <meta property="og:url" content="https://timeline.vg" />
            <meta property="og:image" content="/ogImage.png" />
            <meta property="og:type" content="website" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content="Discover dynamic timelines. Unveiling history and diverse subjects in a clean, interactive format. Explore past, present, and future seamlessly with our engaging timelines." />
            <meta name="twitter:image" content="/twitterImage.png" />
            <link rel="canonical" href="https://timeline.vg" />
            <link rel="icon" href="/favicon.ico" type="image/x-icon" />
            <title>{title}</title>
        </Head>
    );
};

export default DynamicHead;
