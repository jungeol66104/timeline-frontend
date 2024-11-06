import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {selectEditPopoverType} from "@/store/slices/appearanceSlice";
import LinksPopoverInternalContent from "@/components/modals/commonEditMenu/linksPopoverInternalContent";
import LinksPopoverExternalContent from "@/components/modals/commonEditMenu/linksPopoerExternalContent";

import axios from "axios";
import {Editor} from "@tiptap/core";
import {isInternalLink, timelineDomain} from "@/utils/global";

const LinksPopover = ({editor}: { editor: Editor | null }) => {
    const [internalLinkObjects, setInternalLinkObjects] = useState<{ url: string }[]>([])
    const [externalLinkObjects, setExternalLinkObjects] = useState<{}[]>([])

    const editPopoverType = useSelector(selectEditPopoverType)

    useEffect(() => {
        if (editPopoverType !== 'links') return

        // extract links
        const htmlContent = editor?.getHTML();
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = htmlContent!;
        const anchorTags = tempDiv.querySelectorAll('a');
        const extractedLinks = Array.from(anchorTags).map((a) => a.href);

        // filter links
        let internalLinks: string[] = []
        let externalLinks: string[] = []
        extractedLinks.forEach(link => {
            if (isInternalLink(link)) internalLinks.push(link);
            else externalLinks.push(link);
        })

        // make linkObjects
        const getInternalLinkObjects = async () => {
            const internalIds = internalLinks.map(link => {
                const regex = /timelines\/(\d+)-/;
                return link.match(regex)?.[1]
            })
            try {
                const response = await axios.post(`/api/wiki/timeline/links`, {internalIds})
                const data = response.data.data

                const linkObjects = data.timelines?.map((timeline: any) => {return {url: `https://${timelineDomain}/timelines/${timeline.timelinePath}`, title: timeline.title, description: timeline.description, imageUrl: timeline.cdnUrl + timeline.imagePath}})
                setInternalLinkObjects(linkObjects || [])
            } catch (error) {console.error('Error fetching data in useEffect: ', error)}
        }
        const getExternalLinkObjects = async () => {
           const linkObjects = externalLinks.map(link => {
               const parsedUrl = new URL(link);
               return {url: link, title: parsedUrl.hostname, description: parsedUrl.pathname + parsedUrl.search + parsedUrl.hash, imageUrl: 'base-image.png'}
           })
            setExternalLinkObjects(linkObjects || [])
        };
        getInternalLinkObjects()
        getExternalLinkObjects()

    }, [editPopoverType]);

    return (
        <div id={'linksPopover'} className={`${editPopoverType !== 'links' && 'hidden'} absolute bottom-0 w-full max-w-[300px] flex flex-col border-[0.1px] border-gray-300 bg-white drop-shadow-sm rounded-md`} style={{right: 0}}>
            <div className={'overflow-x-hidden overflow-y-auto p-0.5 w-full max-h-[188px] flex flex-col gap-1.5 border-b-[0.1px] border-gray-300'}>
                {internalLinkObjects.length >= 1 &&
                    <div>
                        <div className={'p-1.5 text-xs font-semibold'}>Timelines</div>
                        {internalLinkObjects.map((linkObject, i) => {
                            return <LinksPopoverInternalContent key={i} linkObject={linkObject}/>
                        })}
                    </div>}
                {externalLinkObjects.length >= 1 &&
                    <div>
                        <div className={'p-1.5 text-xs font-semibold'}>Other Links</div>
                        {externalLinkObjects.map((linkObject, i) => {
                            return <LinksPopoverExternalContent key={i} linkObject={linkObject}/>
                        })}
                    </div>}
                {internalLinkObjects.length < 1 && externalLinkObjects.length < 1 &&
                    <div className={'py-3 px-2.5 text-center'}>
                        <div className={'font-semibold'}>No links here yet.</div>
                        <div className={'text-sm'}>Add a link to make the timeline better!</div>
                    </div>
                }
            </div>
            <div className={'py-1 w-full h-6 text-center text-xs font-semibold'}>Select a thumbnail link</div>
        </div>
    );
};

export default LinksPopover;
