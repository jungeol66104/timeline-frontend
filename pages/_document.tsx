import React from "react";
import { Html, Head, Main, NextScript } from 'next/document'
import {GA_TRACKING_ID} from "@/utils/gtags";

export default function Document() {
  return (
    <Html lang="en">
        <Head>
            {/* google adsense */}
            <script
                async
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9076277653795477"
                crossOrigin="anonymous"
            />
            {/* google analytics */}
            <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
            />
            <script
                dangerouslySetInnerHTML={{
                    __html: `window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${GA_TRACKING_ID}', {page: window.location.pathname});`
                }}
            />
            {/* hotjar */}
            <script
                dangerouslySetInnerHTML={{
                    __html: `(function(h,o,t,j,a,r){
                    h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                    h._hjSettings={hjid:4947576,hjsv:6};
                    a=o.getElementsByTagName('head')[0];
                    r=o.createElement('script');r.async=1;
                    r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                    a.appendChild(r);
                  })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`
                }}
            />
        </Head>
        <body>
        <Main/>
        <NextScript/>
        <div id={'portal'}></div>
        </body>
    </Html>
  )
}
