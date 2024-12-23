import React from 'react';
import Head from 'next/head'
import {useRouter} from "next/router";
import {useSelector} from "react-redux";
import {selectCurrentTimeline} from "@/store/slices/contentsSlice";
import {selectProfile} from "@/store/slices/privateSlice";

const DynamicHead = ({type}: {type: string}) => {
    const router = useRouter();

    const profile = useSelector(selectProfile)
    const currentTimeline = useSelector(selectCurrentTimeline)

    const baseUrl = 'https://timeline.vg'
    const pathname = router.asPath;
    const url = baseUrl + pathname

    let title, description;

    switch (type) {
        case "publicTimeline":
            title = `History of ${currentTimeline.title} - Wiki, Key events, Facts, Dates | Timeline`;
            description = `Explore the complete timeline of ${currentTimeline.title} in timeline wiki, showcasing key events, facts, and milestones that shaped its journey. Dive into history and uncover everything in one simple, engaging view.`
            break;
        case "newTimeline":
            title = 'New timeline | Timeline'
            description = `Create your own timeline effortlessly. Organize events, facts, and key moments with our easy-to-use timeline maker. Start building a timeline that brings your story to life today!`
            break
        case "profile":
            title = `Profile of ${profile.username} | Timeline`
            description = `Profile of ${profile.username}. View their contributions, created timelines, favorite timelines, and discover their unique interests and insights.`
            break
        case "privateTimeline":
            title = `History of ${currentTimeline.title} - By ${profile.username} | Timeline`;
            description = `Explore the complete timeline of ${currentTimeline.title} in timeline wiki, showcasing key events, facts, and milestones that shaped its journey. Dive into history and uncover everything in one simple, engaging view.`
            break
        case "about":
            title = 'Capture and share your interest - Free online timeline maker & Timeline wiki | Timeline'
            description = `Capture and share your passions like never before with our ultimate timeline maker! Easily create and customize timelines for any topic, from personal milestones to historical events. Join our community, explore timelines, and start sharing your unique stories today!`
            break
        case "histories":
            title = `Histories of all timelines | Timeline`
            description = `View the complete histories of all edited timelines. This page aggregates all changes and updates made to each timeline, providing a comprehensive record of contributions and revisions.`
            break
        case "privacy":
            title = `Privacy policy | Timeline`
            description = `Our Privacy policy outlines how we collect, use, and protect your personal information. Learn about your rights and how we handle your data to ensure your privacy while using our services.`
            break
        case "terms":
            title = `Terms of use | Timeline`
            description = `The Terms of use detail the rules and guidelines for using our website and services. By accessing our platform, you agree to comply with these terms, ensuring a safe and fair environment for all users.`
            break
        case "maintenance":
            title = `Maintenance | Timeline`
            description = `We're currently performing maintenance to enhance your experience. Please check back soon, and thank you for your patience as we work to improve our services.`
            break
        default:
            title = "Timeline | Free online timeline maker & Timeline wiki";
            description = `Create stunning timelines effortlessly with our free online timeline maker! Organize your events, milestones, and stories in a visually engaging format. Explore our Timeline Wiki for inspiration and join a community of creators sharing their unique timelines. Start crafting your timeline today and bring your history to life!`
    }

    return (
        <Head>
            <meta charSet="UTF-8"/>
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

            <title>{title}</title>

            <link rel="canonical" href={url}/>

            <link rel="shortcut icon" href="/favicon.ico"/>
            <link rel="icon" type="image/x-icon" href="/favicon.ico"/>
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
            <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png"/>
            <link rel="icon" type="image/png" sizes="64x64" href="/favicon-64x64.png"/>
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
            <link rel="apple-touch-icon" sizes="120x120" href="/apple-touch-icon-120x120.png"/>
            <link rel="apple-touch-icon" sizes="152x152" href="/apple-touch-icon-152x152.png"/>
            <link rel="apple-touch-icon" sizes="167x167" href="/apple-touch-icon-167x167.png"/>
            <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png"/>
            <link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png"/>
            <link rel="manifest" href="/site.webmanifest"/>
        </Head>
    );
};
export default DynamicHead;
