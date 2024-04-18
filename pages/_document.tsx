import { Html, Head, Main, NextScript } from 'next/document'
import {GA_TRACKING_ID} from "@/utils/gtags";
import HotjarScript from "@/components/hotjarScript";
import React from "react";
// refactoring: needed (look around if there is anything that I can implement)

export default function Document() {
  return (
    <Html lang="en">
      <Head>
          <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <script
              dangerouslySetInnerHTML={{
                  __html: `window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${GA_TRACKING_ID}', {
                        page: window.location.pathname
                    });`
              }}
          />
          <HotjarScript />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
