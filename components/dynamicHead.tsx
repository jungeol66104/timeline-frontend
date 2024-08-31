import React from 'react';
import {useSelector} from "react-redux";
import Head from 'next/head'
import {selectCurrentEvent, selectCurrentEvents, selectCurrentTimeline} from "@/store/slices/contentsSlice";

const DynamicHead = ({type}: {type: string} ) => {
    const currentTimeline = useSelector(selectCurrentTimeline)
    const currentEvent = useSelector(selectCurrentEvent)
    const currentEvents = useSelector(selectCurrentEvents)

    const title = type === "timeline"
        ? `History of ${currentTimeline.name} | Timeline, Key Events, Facts, Dates`
        : type === "event"
            ? `${currentEvent.name} | Detailed Event, Fact, Specific Date, History, Timeline`
            : "Timeline | History, Events, Celebrities, and More"
    const description = type === "timeline"
        ? `${currentTimeline.name} Timeline. Check out the key events with specific dates in the history of ${currentTimeline.name}. ${currentEvents.slice(0,7).map(cEvent => cEvent.date + ' ' + cEvent.name).join(', ')}.`
        : type === "event"
            ? `${currentEvent.description}`
            : "A timeline that encompasses various topics. From the past to the present, the timeline redefines knowledge with rich content. Explore various aspects of the world, covering topics such as finance, history, personalities, and more."
    const url = type === "timeline"
        ? `https://timeline.vg/timelines/${currentTimeline.id}`
        : type === "event"
            ? `https://timeline.vg/events/${currentEvent.id}`
            : "https://timeline.vg"

    return (
        <Head>
            <meta charSet="UTF-8"/>
            {/*{(type !== "index" && type !== "timeline") && <meta name="robots" content="noindex" />}*/}
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <meta name="description" content={description}/>
            <meta name="author" content="timeline"/>
            <meta property="og:title" content={title}/>
            <meta property="og:description" content={description}/>
            <meta property="og:url" content={url}/>
            <meta property="og:image" content="/images/ogImage.png"/>
            <meta property="og:type" content="website"/>
            <meta name="twitter:card" content="summary_large_image"/>
            <meta name="twitter:title" content={title}/>
            <meta name="twitter:description" content={description}/>
            <meta name="twitter:image" content="/images/twitterImage.png"/>
            <meta name="format-detection" content="telephone=no"/>
            <link rel="canonical" href={url}/>
            <link rel="shortcut icon" href="/images/favicon.ico"/>
            <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png"/>
            <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png"/>
            <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png"/>
            <title>{title}</title>
        </Head>
    );
};
export default DynamicHead;
