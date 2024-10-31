import {useEffect, useLayoutEffect} from "react";
import axios from "axios";
import crypto from 'crypto'
import DOMPurify from 'dompurify';

export const capitalize = (string: string) => {
    if (!string) return string;
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const getClickOrTouch = () => {
    // check if the device is mobile or PC
    let clickOrTouchend = 'click'
    if (navigator.maxTouchPoints || 'ontouchstart' in document.documentElement) clickOrTouchend = 'touchend'
    return clickOrTouchend
}

export const getIsTouchable = () => {
    let isTouchable = false
    if (navigator.maxTouchPoints || 'ontouchstart' in document.documentElement) isTouchable = true
    return isTouchable
}

export const getScrollWrapper = () => {
    const scrollWrapper: Element | null = typeof window !== 'undefined' ? document.documentElement : null
    return scrollWrapper
}

export const getModalScrollWrappers = () => {
    return typeof window !== 'undefined' ? document.querySelectorAll('.modalScrollWrapper') : null
}

export const getIsBaseImage = (url: string | null | undefined) => {
    if (typeof url !== "string") return true
    return url.includes("base-image.png")
}

let timeoutId: any
export const debounce = (callback: any, delay: number) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(callback, delay);
}

export const formatDate = (date: string | undefined) => {
    if (!date) return
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    const [datePart, timePart] = date.split(" ");
    const [year, month, day] = datePart.split("-");
    const formattedMonth = months[parseInt(month, 10) - 1];

    return `${formattedMonth} ${parseInt(day, 10)}, ${year}`;
}

export const mapStrToNum = (inputString : string) => {
    const hash1 = crypto.createHash('sha256').update(inputString).digest('hex');
    const hash2 = crypto.createHash('md5').update(inputString).digest('hex');
    const combinedHash = hash1 + hash2;
    let hashedNumber = BigInt('0x' + combinedHash); // Use BigInt to handle large numbers
    return Number((hashedNumber % BigInt(4)) + BigInt(1));
}

export const formatArticleDate = (articleDate: string) => {
    const date = new Date(articleDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`
}

export const getTags = () => {
    return ["Recently Added", "Popular", "Hot", "Staff Picks", "Politics", "Biography", "History", "Sports", "Movies", "Music", "Company", "Institution", "Finance", "Business", "Economics", "Technology", "Science", "Health"]
}

export const getCurrentTag = (tagNum: number) => {
    const index = tagNum - 1
    const tags = getTags()
    return tags[index]
}

export const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed in JS
    const day = String(today.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

export const transformDate = (date: string) => {
    let parts = date.split(' ');
    if (parts.length > 3) parts = parts.slice(0, 3)
    const era = parts.findIndex(part => part === 'BCE') !== -1 ? 'BC' : 'AD'
    if (era === 'BC') parts = parts.filter(part => part !== 'BCE')

    const datePart = parts[0];
    const dateParts = datePart.split('-')
    const year = dateParts[0]
    const month = dateParts[1] || '01'
    const day = dateParts[2] || '01'

    let hour = '00'
    let minute = '00'
    let second = '00'
    if (parts.length === 2) {
        const timePart = parts[1];
        const timeParts = timePart.split(':')
        hour = timeParts[0]
        minute = timeParts[1] || minute
        second = timeParts[2] || second
    }

    return `${year} ${era} ${month}-${day} ${hour}:${minute}:${second}`;
}

export const getIsTimelinePath = (path: string) => {
    const timelineRegex = /^\/timelines\/[^\/]+$/;
    const privateTimelineRegex = /^\/[^\/]+\/timelines\/[^\/]+$/;
    return timelineRegex.test(path) || privateTimelineRegex.test(path);
}

export const getSession = async () => {
    try {
        const response = await axios.get('/api/user/session')
        return response.data
    } catch (error) {
        console.error('Error fetching data in useEffect: ', error)
        return
    }
}

export const wrapPTag = (string: string) => {
    const isWrapped = /^<p>.*<\/p>$/.test(string);
    return isWrapped ? string : `<p>${string}</p>`
}

export const unwrapPTag = (string: string) => {
    return string.replace(/^<p>(.*)<\/p>$/, '$1');
}

export const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export const getPlainText = (htmlContent: string) => {
    let plainText;
    if (typeof window === 'undefined') {
        const { JSDOM } = require('jsdom');
        const createDOMPurify = require('dompurify');

        const dom = new JSDOM('');
        const DOMPurify = createDOMPurify(dom.window);
        const sanitizedContent = DOMPurify.sanitize(htmlContent);

        const tempDiv = dom.window.document.createElement("div");
        tempDiv.innerHTML = sanitizedContent;
        const paragraphs = Array.from(tempDiv.getElementsByTagName("p"));
        plainText = paragraphs.map((p: any) => p.textContent.trim()).filter(p => p.length > 0).join(' '); // Use a single space
    } else {
        const sanitizedContent = DOMPurify.sanitize(htmlContent);

        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = sanitizedContent;
        const paragraphs = Array.from(tempDiv.getElementsByTagName("p"));
        plainText = paragraphs.map((p: any) => p.textContent.trim()).filter(p => p.length > 0).join(' '); // Use a single space
    }
    return plainText;
}

export const escapeXML = (value: string) => {
    return value.replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
}