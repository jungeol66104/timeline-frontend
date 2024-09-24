import React from 'react';
import Link from "next/link";
import DynamicHead from "@/components/dynamicHead";

const PrivacyPage = () => {
    return (
        <>
            <DynamicHead type={'privacy'}/>
            <div className={'page'}>
                <div className={'pageWrapper w-full flex'}>
                    {/* Section Primary */}
                    <div className={'relative h-fit w-full max-w-[630px] px-4 py-10 flex flex-col gap-10 text-lg font-medium'}>
                        <div className={'flex flex-col gap-10'}>
                            <h1 className={'text-6xl  max-[450px]:text-5xl font-bold'}>Privacy policy</h1>
                            <div className={'text-[16px] font-normal'}>
                                <p>Last Updated: August 23, 2024</p>
                                <p>Effective: August 23, 2024</p>
                            </div>
                        </div>
                        <div className={'flex flex-col gap-8'}>
                            <p>
                                Welcome to Timeline(&quot;service&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;).
                                We value your privacy and are committed to protecting your personal information.
                                This Privacy policy explains how we collect, use, disclose, and safeguard your information when you visit and use our service.
                            </p>
                        </div>

                        {/* Collecting information */}
                        <div className={'flex flex-col gap-10'}>
                            <h2 className={'text-4xl font-bold'}>Collecting information</h2>
                            <div className={'flex flex-col gap-8'}>
                                <p>We may collect information about you in various ways, including:</p>
                                <ul className={'px-4 flex flex-col gap-2 list-disc'}>
                                    <li><b>Personal information.</b> We currently only support google sign in. We collect personal information such as your username, email address, profile image from google.</li>
                                    <li><b>Usage data.</b> We may collect non-personal information about your interactions with the service, such as your IP address, browser type, operating system, and access times.</li>
                                    <li><b>Cookies.</b> We use cookies and similar tracking technologies to track the activity on our service and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our service.</li>
                                </ul>
                            </div>
                        </div>

                        {/* Using information */}
                        <div className={'flex flex-col gap-10'}>
                            <h2 className={'text-4xl font-bold'}>Using information</h2>
                            <div className={'flex flex-col gap-8'}>
                                <p>We may use the information we collect to:</p>
                                <ul className={'px-4 flex flex-col gap-2 list-disc'}>
                                    <li>Provide, maintain, and improve the service.</li>
                                    <li>Enable you to create, share, and edit timelines.</li>
                                    <li>Communicate with you regarding your account, contributions, and any changes to our policies.</li>
                                    <li>Protect the service from fraudulent activity and ensure its security.</li>
                                </ul>
                            </div>
                        </div>

                        {/* Sharing information */}
                        <div className={'flex flex-col gap-10'}>
                            <h2 className={'text-4xl font-bold'}>Sharing information</h2>
                            <div className={'flex flex-col gap-8'}>
                                <p>We do not sell, trade, or otherwise transfer your personal information to outside parties, except as described below:</p>
                                <ul className={'px-4 flex flex-col gap-2 list-disc'}>
                                    <li><b>Service providers.</b> We may share your information with third-party service providers who assist us in operating the service or providing services to you, under the condition that they keep your information confidential.</li>
                                    <li><b>Legal requirements.</b> We may disclose your information if required by law or in response to legal processes, such as a subpoena or court order.</li>
                                    <li><b>Protection of rights.</b> We may disclose your information to protect the rights, property, or safety of our service, users, or others.</li>
                                </ul>
                            </div>
                        </div>

                        {/* Your rights */}
                        <div className={'flex flex-col gap-10'}>
                            <h2 className={'text-4xl font-bold'}>Your rights</h2>
                            <div className={'flex flex-col gap-8'}>
                                <p>
                                    Depending on your location, you may have certain rights regarding your personal information, including the right to access, correct, or delete your information.
                                    If you wish to exercise these rights, please contact us at <Link href={'mailto:project.yaha@gmail.com'} className={'text-blue-700 hover:underline'}>project.yaha@gmail.com</Link>.
                                </p>
                            </div>
                        </div>

                        {/* General */}
                        <div className={'flex flex-col gap-10'}>
                            <h2 className={'text-4xl font-bold'}>General</h2>
                            <div className={'flex flex-col gap-8'}>
                                <h3 className={'text-2xl font-semibold'}>Links to other websites</h3>
                                <p>
                                    Our service may contain links to third-party websites. We are not responsible for the privacy practices or content of those websites.
                                    We encourage you to read the privacy policies of any third-party websites you visit.
                                </p>
                            </div>
                            <div className={'flex flex-col gap-8'}>
                                <h3 className={'text-2xl font-semibold'}>Changes to the privacy policy</h3>
                                <p>
                                    We may update this Privacy Policy from time to time.
                                    We will notify you of any changes by posting the new Privacy policy on this page with a new effective date.
                                </p>
                            </div>
                            <div className={'flex flex-col gap-8'}>
                                <h3 className={'text-2xl font-semibold'}>Contact us</h3>
                                <p>If you have any questions or concerns about this Privacy policy, please contact us at <Link href={'mailto:project.yaha@gmail.com'} className={'text-blue-700 hover:underline'}>project.yaha@gmail.com</Link></p>
                            </div>
                        </div>
                    </div>

                    {/* Section Secondary */}
                    <div className={'relative ml-[20px] max-[872px]:ml-0 p-4 max-[852px]:py-0 w-full min-w-[332px] max-w-[352px] max-[852px]:hidden'}></div>
                </div>
            </div>
        </>
    )
}

export default PrivacyPage;
