import crypto from 'crypto'

// math
export const sum = (array: number[]) => {
    let sum = 0
    array.forEach(l => sum += l)
    return sum
}

// timeline
// check if the device is mobile or PC
export const getClickOrTouch = () => {
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
    const scrollWrapper: HTMLDivElement | null = typeof window !== 'undefined' ? document.querySelector('.page') : null
    return scrollWrapper
}

export const getTimeline = () => {
    const timeline: HTMLDivElement | null = typeof window !== 'undefined' ? document.querySelector('.timeline') : null
    return timeline
}

export const getFirstEventBox = () => {
    const eventBox: HTMLDivElement | null = typeof window !== 'undefined' ? document.querySelector('.eventBox') : null
    return eventBox
}

export const getIsBaseImage = (url: string | null | undefined) => {
    if (typeof url !== "string") return true
    return url.includes("https://cdn.timeline.vg/base-image.png")
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

export const ratioToImageSizeType = (imageSize: {width: number, height: number}) => {
    const ratio = imageSize.width / imageSize.height
    return ratio === 1 ? 'square' : ratio > 1 ? 'horizontal' : 'vertical'
}

export const getDateToday = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`
}

