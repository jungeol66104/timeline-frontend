/// <reference types="gtag.js" />

declare module 'gtag.js';

declare global {
    interface Window {
        Kakao: any;
    }
}