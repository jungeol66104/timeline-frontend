import React from 'react';
import ShareButtonTemplate from "@/components/layout/modals/shareModal/shareElementButtonTemplate";
import Script from "next/script";

const KakaotalkButton = () => {

    const handleClick = () => {
        if (window.Kakao !== undefined && !window.Kakao.isInitialized()) {
            window.Kakao.init("9920475ee7f2f862e178e2a155b855c5");
        }
        if (window.Kakao.Share !== undefined) {
            window.Kakao.Share.sendScrap({requestUrl: window.location.href})
        }
    }

    return (
        <>
            <ShareButtonTemplate handleClick={handleClick} svgPath={'/svg/kakaotalk.svg'} title={'KakaoTalk'} />
            <Script src="https://t1.kakaocdn.net/kakao_js_sdk/2.6.0/kakao.min.js" integrity="sha384-6MFdIr0zOira1CHQkedUqJVql0YtcZA1P0nbPrQYJXVJZUkTk/oX4U9GhUIs3/z8" crossOrigin="anonymous" strategy='lazyOnload'/>
        </>
    );
};
export default KakaotalkButton;