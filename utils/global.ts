import crypto from 'crypto'

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

export const getBody  = () => {
    const body: HTMLElement | null = typeof window !== 'undefined' ? document.body : null
    return body
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

export const validateDate = (date: string) => {
    const pattern = /^(\d{1,4})(-\d{1,2})?(-\d{1,2})?( (BCE|BC|CE|AD))?$/;
    return pattern.test(date);
}

export const transformDate = (date: string) => {
    let month = '01';
    let day = '01';
    let era = 'AD';

    const parts = date.split(' ');

    if (parts.length > 1) {
        date = parts[0];
        era = parts[1];
        if (era === 'CE') era = 'AD';
        else if (era === 'BCE') era = 'BC';
    }

    const dateParts = date.split('-');
    const year = dateParts[0];
    if (dateParts.length > 1) month = dateParts[1].padStart(2, '0');
    if (dateParts.length > 2) day = dateParts[2].padStart(2, '0');

    return `${year} ${era} ${month}-${day} 00:00`;
}