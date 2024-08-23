import React from 'react';
import Link from "next/link";

const PrivacyPage = () => {
    return (
        <div className={'page'}>
            <div className={'pageWrapper w-full flex'}>
                {/* Section Primary */}
                <div className={'relative h-fit w-full max-w-[630px] px-4 py-10 flex flex-col gap-10 text-lg font-medium'}>
                    <div className={'flex flex-col gap-10'}>
                        <h1 className={'text-6xl  max-[450px]:text-5xl font-bold'}>Privacy</h1>
                        <div className={'text-[16px] font-normal'}>
                            <p>Last Updated: August 23, 2024</p>
                            <p>Effective: August 23, 2024</p>
                        </div>
                    </div>
                    <div className={'flex flex-col gap-8'}>
                        <p>Thank you for using Timeline!</p>
                        <p>By accessing or using Timeline, you acknowledge that you have read, understood, and agree to be bound by these Terms of use. If you do not agree to these Terms, please do
                            not use our services.</p>
                    </div>

                    {/* Who we are */}
                    <div className={'flex flex-col gap-10'}>
                        <h2 className={'text-4xl font-bold'}>Who we are</h2>
                        <div className={'flex flex-col gap-8'}>
                            <p>
                                Timeline is a modern wiki based on timeline.
                                We support organizing any kind of information in time sequence.
                                For more information, visit <Link href={'/about'} className={'text-blue-700 hover:underline'}>About Timeline</Link>.
                            </p>
                        </div>
                    </div>

                    {/* Using our services */}
                    <div className={'flex flex-col gap-10'}>
                        <h2 className={'text-4xl font-bold'}>Using our services</h2>
                        <div className={'flex flex-col gap-8'}>
                            <h3 className={'text-2xl font-semibold'}>What you can do</h3>
                            <ul className={'px-4 flex flex-col gap-2 list-disc'}>
                                <li>Use our services under compliance of this Terms of use.</li>
                                <li>Give <Link href={'https://docs.google.com/forms/d/e/1FAIpQLScN4ooRXZylBgKtElHSJi7m739iHHSMNg4QfbAcDx0v0OjwnA/viewform?usp=sf_link'} target="_blank"
                                               className={'text-blue-700 hover:underline'}>Feedback</Link> and you agree that we may use it without restriction or compensation to you.
                                </li>
                                <li>Contact us at <Link href={'mailto:project.yaha@gmail.com'} className={'text-blue-700 hover:underline'}>project.yaha@gmail.com</Link> for any questions or help.</li>
                            </ul>
                        </div>
                        <div className={'flex flex-col gap-8'}>
                            <h3 className={'text-2xl font-semibold'}>What you cannot do</h3>
                            <p>Prohibited activities are including, but not limited to the examples below.</p>
                            <ul className={'px-4 flex flex-col gap-2 list-disc'}>
                                <li>Engage in vandalism, spread misinformation or post any kind of spam like unsolicited advertisements.</li>
                                <li>Attempt to access parts of the service that is only allowed for other users or admin without permission.</li>
                                <li>Upload or share content that violates copyright or other intellectual property rights.</li>
                                <li>Engage in any form of harassment, bullying, or abusive behavior.</li>
                                <li>Use any kind of contents in our services to make a service that compete with Timeline.</li>
                            </ul>
                        </div>
                        <div className={'flex flex-col gap-8'}>
                            <h3 className={'text-2xl font-semibold'}>Access</h3>
                            <p>
                                Certain features of our service may require you to create an account.
                                You agree to provide accurate, current, and complete information when registering and to keep your account information updated.
                            </p>
                            <p>Currently, only google login is accepted. We will soon provide other types of login.</p>
                        </div>
                        <div className={'flex flex-col gap-8'}>
                            <h3 className={'text-2xl font-semibold'}>Termination</h3>
                            <p>We reserve the right to terminate or suspend your access to Timeline at our sole discretion, without prior notice. Termination may occur if we are required to do so by
                                law, if any violation of these Terms is detected, or for any other reason, or no reason at all.</p>
                            <p>Any content you have contributed may remain on the service, subject to our policies, and we are under no obligation to remove it. We are not liable to you or any third
                                party for any termination of your access to the service.</p>
                        </div>
                    </div>

                    {/* Content on the services */}
                    <div className={'flex flex-col gap-10'}>
                        <h2 className={'text-4xl font-bold'}>Content on the services</h2>
                        <div className={'flex flex-col gap-8'}>
                            <h3 className={'text-2xl font-semibold'}>Ownership</h3>
                            <p>
                                As a collaborative wiki service, Timeline respects the ownership of individual contributions.
                                You retain ownership of the content you create and contribute to the service.
                            </p>
                            <p>
                                However, once your contributions are added to the wiki, they become part of the collective content and cannot be removed upon request.
                                This ensures the integrity and continuity of the content.
                            </p>
                        </div>
                        <div className={'flex flex-col gap-8'}>
                            <h3 className={'text-2xl font-semibold'}>License</h3>
                            <p>By publishing content on or through Timeline (excluding private timelines), you grant us a worldwide, non-exclusive, royalty-free license with the right to
                                sublicense. </p>
                            <p>This license allows us to use, copy, reproduce, process, adapt, modify, publish, transmit, display, and distribute such content for various purposes, including
                                commercial activities, and to syndicate it across any media or distribution methods.</p>
                            <p>You agree that no additional compensation will be provided for the use of your content beyond the use of Timeline itself.</p>
                        </div>
                        <div className={'flex flex-col gap-8'}>
                            <h3 className={'text-2xl font-semibold'}>Responsibilities</h3>
                            <p>
                                You must respect the intellectual property rights of others.
                                Do not upload, share, or distribute content that infringes on the rights of third parties.
                            </p>
                            <p>If you upload content that infringes on someone else&apos;s copyright, you are solely responsible for any legal consequences arising from this infringement.</p>
                            <p>Ensure that all content you post or share complies with applicable laws and regulations, including those related to copyright, trademark, defamation, and privacy.</p>
                            <p>You are responsible for ensuring that your content does not violate any laws or the rights of others.</p>
                        </div>
                        <div className={'flex flex-col gap-8'}>
                            <h3 className={'text-2xl font-semibold'}>Copyright complaints</h3>
                            <p>If you believe that any content on Timeline infringes your copyright or intellectual property rights, please notify us by sending a written notice to <Link
                                href={'mailto:project.yaha@gmail.com'} className={'text-blue-700 hover:underline'}>project.yaha@gmail.com</Link>.</p>
                            <p>Your notice should include the following information.</p>
                            <ul className={'px-4 flex flex-col gap-2 list-disc'}>
                                <li>A physical or electronic signature of the person authorized to act on behalf of the owner of the copyright interest.</li>
                                <li>A description of the copyrighted work or intellectual property you claim has been infringed.</li>
                                <li>A description of the material you claim is infringing and where it is located on Timeline.</li>
                                <li>Your address, telephone number, and e-mail address.</li>
                                <li>A statement that you believe in good faith that the use of the material is not authorized by the copyright owner or law.</li>
                                <li>A statement by you that the above information in your notice is accurate and, under penalty of perjury, that you are the copyright owner or authorized to act on the
                                    copyright owner’s behalf
                                </li>
                            </ul>
                        </div>

                    </div>

                    {/* General */}
                    <div className={'flex flex-col gap-10'}>
                        <h2 className={'text-4xl font-bold'}>General</h2>
                        <div className={'flex flex-col gap-8'}>
                            <h3 className={'text-2xl font-semibold'}>Change of terms</h3>
                            <p>
                                We may update these Terms of use from time to time.
                                Any changes will be effective immediately upon posting the revised terms on our website.
                            </p>
                            <p>
                                Your continued use of Timeline after any changes signifies your acceptance of the updated terms.
                                It is your responsibility to review the Terms periodically to stay informed of any updates.
                            </p>
                        </div>
                        <div className={'flex flex-col gap-8'}>
                            <h3 className={'text-2xl font-semibold'}>Limitation of liability</h3>
                            <p>
                                TIMELINE IS PROVIDED &apos;AS IS&apos; AND &apos;AS AVAILABLE&apos;.
                                WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS.
                                TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE ARE NOT LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR RELATED TO YOUR
                                USE OF TIMELINE.
                                OUR TOTAL LIABILITY IS LIMITED TO THE AMOUNT YOU PAID, IF ANY, FOR ACCESSING THE SERVICE.
                            </p>
                        </div>
                        <div className={'flex flex-col gap-8'}>
                            <h3 className={'text-2xl font-semibold'}>Dispute resolution</h3>
                            <p>
                                If you have any issues or disputes related to Timeline, we ask that you contact us first to attempt to resolve the matter informally.
                                To do this, you must send a written notice detailing the nature of the dispute, your contact information, and the resolution you seek.
                            </p>
                            <p>
                                This notice should be sent via email to <Link href={'mailto:project.yaha@gmail.com'} className={'text-blue-700 hover:underline'}>project.yaha@gmail.com</Link>.
                                We will acknowledge receipt of your notice within seven business days and will make every effort to resolve the issue within 30 days.
                            </p>
                            <p>If we are unable to reach a resolution through informal discussion, any unresolved disputes will be settled through binding arbitration, unless you and we agree
                                otherwise.</p>
                            <p>
                                Arbitration will be conducted by a mutually agreed-upon organization, and the decision will be final.
                                You agree to waive any right to a jury trial or to participate in a class action.
                            </p>
                        </div>
                        <div className={'flex flex-col gap-8'}>
                            <h3 className={'text-2xl font-semibold'}>Governing law</h3>
                            <p>These Terms of use and any disputes arising out of or related to them or your use of Timeline will be governed by and construed in accordance with the laws of the
                                Republic of Korea, without regard to its conflict of law principles.</p>
                            <p>Any legal actions or proceedings related to these Terms will be brought exclusively in the courts located in Seoul, South Korea, and you consent to the jurisdiction of
                                such courts.</p>
                        </div>
                        <div className={'flex flex-col gap-8'}>
                            <h3 className={'text-2xl font-semibold'}>Entire agreement</h3>
                            <p>These Terms of use, along with our Privacy Policy, constitute the entire agreement between you and Timeline regarding your use of our services and supersede any prior
                                agreements or understandings.</p>
                        </div>
                    </div>
                </div>

                {/* Section Secondary */}
                <div className={'relative ml-[20px] max-[872px]:ml-0 p-4 max-[852px]:py-0 w-full min-w-[332px] max-w-[352px] max-[852px]:hidden'}>
                    {/*<div className={'sticky top-[76px] p-3 flex flex-col gap-3 bg-[#F2F2F259] border-[1px] border-[#E5E7EB] rounded-2xl'}>*/}
                    {/*    <h3 className={'text-[20px] font-bold'}>Terms of use</h3>*/}
                    {/*    <div className={'flex flex-col gap-2'}>*/}
                    {/*        <div><div className={'font-bold line-clamp-1'}>Who we are</div></div>*/}
                    {/*        <div><div className={'line-clamp-1'}>Using our services</div></div>*/}
                    {/*        <div><div className={'line-clamp-1'}>Content of the services</div></div>*/}
                    {/*        <div><div className={'line-clamp-1'}>General</div></div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>
            </div>
        </div>
    // <div className={'page'}>
    //     <div className={'pageWrapper w-full flex'}>
    //         <div className={'relative h-fit w-full max-w-[630px] p-4 flex flex-col gap-5'}>
    //             <div>
    //                 <h1 className={'text-2xl font-bold'}>Privacy Policy</h1>
    //                 <div className={'text-md text-gray-500'}>Last updated: May 09, 2024</div>
    //             </div>
    //             <div className={'flex flex-col gap-2.5'}>
    //                 <p>This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy
    //                     rights and how the law protects You.</p>
    //                 <p>We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy
    //                     Policy.</p>
    //             </div>
    //             <h2 className={'text-xl font-bold'}>Interpretation and Definitions</h2>
    //             <div className={'flex flex-col gap-2.5'}>
    //                 <h3 className={'text-xl font-bold'}>Interpretation</h3>
    //                 <p>The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of
    //                     whether they appear in singular or in plural.</p>
    //                 <h3 className={'text-xl font-bold'}>Definitions</h3>
    //                 <p>For the purposes of this Privacy Policy:</p>
    //                 <p><strong>Account</strong> means a unique account created for You to access our Service or parts of our Service.</p>
    //                 <p><strong>Affiliate</strong> means an entity that controls, is controlled by or is under common control with a party, where &quot;control&quot; means ownership of 50% or more of
    //                     the shares, equity interest or other securities entitled to vote for election of directors or other managing authority.</p>
    //                 <p><strong>Company</strong> (referred to as either &quot;the Company&quot;, &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot; in this Agreement) refers to Timeline.</p>
    //                 <p><strong>Cookies</strong> are small files that are placed on Your computer, mobile device or any other device by a website, containing the details of Your browsing history on
    //                     that website among its many uses.</p>
    //                 <p><strong>Country</strong> refers to: South Korea</p>
    //                 <p><strong>Device</strong> means any device that can access the Service such as a computer, a cellphone or a digital tablet.</p>
    //                 <p><strong>Personal Data</strong> is any information that relates to an identified or identifiable individual.</p>
    //                 <p><strong>Service</strong> refers to the Website.</p>
    //                 <p><strong>Service Provider</strong> means any natural or legal person who processes the data on behalf of the Company. It refers to third-party companies or individuals employed
    //                     by the Company to facilitate the Service, to provide the Service on behalf of the Company, to perform services related to the Service or to assist the Company in analyzing how
    //                     the Service is used.</p>
    //                 <p><strong>Usage Data</strong> refers to data collected automatically, either generated by the use of the Service or from the Service infrastructure itself (for example, the
    //                     duration of a page visit).</p>
    //                 <p><strong>Website</strong> refers to Timeline, accessible from <a href="https://timeline.vg/" rel="external nofollow noopener" target="_blank">https://timeline.vg/</a></p>
    //                 <p><strong>You</strong> means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the
    //                     Service, as applicable.</p>
    //             </div>
    //             <h2 className={'text-xl font-bold'}>Collecting and Using Your Personal Data</h2>
    //             <div className={'flex flex-col gap-2.5'}>
    //                 <h3 className={'text-xl font-bold'}>Types of Data Collected</h3>
    //                 <h4 className={'text-lg font-bold'}>Personal Data</h4>
    //                 <p>While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. Personally identifiable
    //                     information may include, but is not limited to Usage Data.</p>
    //                 <h4 className={'text-lg font-bold'}>Usage Data</h4>
    //                 <p>Usage Data is collected automatically when using the Service.</p>
    //                 <p>Usage Data may include information such as Your Device&#39;s Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that You visit,
    //                     the
    //                     time and date of Your visit, the time spent on those pages, unique device identifiers and other diagnostic data.</p>
    //                 <p>When You access the Service by or through a mobile device, We may collect certain information automatically, including, but not limited to, the type of mobile device You use,
    //                     Your mobile device unique ID, the IP address of Your mobile device, Your mobile operating system, the type of mobile Internet browser You use, unique device identifiers and
    //                     other diagnostic data.</p>
    //                 <p>We may also collect information that Your browser sends whenever You visit our Service or when You access the Service by or through a mobile device.</p>
    //                 <h4 className={'text-lg font-bold'}>Tracking Technologies and Cookies</h4>
    //                 <p>We use Cookies and similar tracking technologies to track the activity on Our Service and store certain information. Tracking technologies used are beacons, tags, and scripts to
    //                     collect and track information and to improve and analyze Our Service. The technologies We use may include:</p>
    //                 <p><strong>Cookies or Browser Cookies.</strong> A cookie is a small file placed on Your Device. You can instruct Your browser to refuse all Cookies or to indicate when a Cookie is
    //                     being sent. However, if You do not accept Cookies, You may not be able to use some parts of our Service. Unless you have adjusted Your browser setting so that it will refuse
    //                     Cookies, our Service may use Cookies.</p>
    //                 <p><strong>Web Beacons.</strong> Certain sections of our Service and our emails may contain small electronic files known as web beacons (also referred to as clear gifs, pixel tags,
    //                     and single-pixel gifs) that permit the Company, for example, to count users who have visited those pages or opened an email and for other related website statistics (for
    //                     example, recording the popularity of a certain section and verifying system and server integrity).</p>
    //                 <p>Cookies can be &quot;Persistent&quot; or &quot;Session&quot; Cookies. Persistent Cookies remain on Your personal computer or mobile device when You go offline, while Session
    //                     Cookies are deleted as soon as You close Your web browser. You can learn more about cookies on <a href="https://www.termsfeed.com/blog/cookies/#What_Are_Cookies"
    //                                                                                                                       target="_blank">TermsFeed website</a> article.</p>
    //                 <p>We use both Session and Persistent Cookies for the purposes set out below:</p>
    //                 <p><strong>Necessary / Essential Cookies</strong></p>
    //                 <div>
    //                     <p>Type: Session Cookies</p>
    //                     <p>Administered by: Us</p>
    //                     <p>Purpose: These Cookies are essential to provide You with services available through the Website and to enable You to use some of its features. They help to authenticate
    //                         users and prevent fraudulent use of user accounts. Without these Cookies, the services that You have asked for cannot be provided, and We only use these Cookies to provide
    //                         You with those services.</p>
    //                 </div>
    //                 <p><strong>Cookies Policy / Notice Acceptance Cookies</strong></p>
    //                 <div>
    //                     <p>Type: Persistent Cookies</p>
    //                     <p>Administered by: Us</p>
    //                     <p>Purpose: These Cookies identify if users have accepted the use of cookies on the Website.</p>
    //                 </div>
    //                 <p><strong>Functionality Cookies</strong></p>
    //                 <div>
    //                     <p>Type: Persistent Cookies</p>
    //                     <p>Administered by: Us</p>
    //                     <p>Purpose: These Cookies allow us to remember choices You make when You use the Website, such as remembering your login details or language preference. The purpose of these
    //                         Cookies is to provide You with a more personal experience and to avoid You having to re-enter your preferences every time You use the Website.</p>
    //                 </div>
    //                 <p>For more information about the cookies we use and your choices regarding cookies, please visit our Cookies Policy or the Cookies section of our Privacy Policy.</p>
    //             </div>
    //             <div className={'flex flex-col gap-2.5'}>
    //                 <h3 className={'text-xl font-bold'}>Use of Your Personal Data</h3>
    //                 <p>The Company may use Personal Data for the following purposes:</p>
    //                 <p><strong>To provide and maintain our Service</strong>, including to monitor the usage of our Service.</p>
    //                 <p><strong>To manage Your Account:</strong> to manage Your registration as a user of the Service. The Personal Data You provide can give You access to different functionalities of
    //                     the Service that are available to You as a registered user.</p>
    //                 <p><strong>For the performance of a contract:</strong> the development, compliance and undertaking of the purchase contract for the products, items or services You have purchased
    //                     or of any other contract with Us through the Service.</p>
    //                 <p><strong>To contact You:</strong> To contact You by email, telephone calls, SMS, or other equivalent forms of electronic communication, such as a mobile application&#39;s push
    //                     notifications regarding updates or informative communications related to the functionalities, products or contracted services, including the security updates, when necessary or
    //                     reasonable for their implementation.</p>
    //                 <p><strong>To provide You</strong> with news, special offers and general information about other goods, services and events which we offer that are similar to those that you have
    //                     already purchased or enquired about unless You have opted not to receive such information.</p>
    //                 <p><strong>To manage Your requests:</strong> To attend and manage Your requests to Us.</p>
    //                 <p><strong>For business transfers:</strong> We may use Your information to evaluate or conduct a merger, divestiture, restructuring, reorganization, dissolution, or other sale or
    //                     transfer of some or all of Our assets, whether as a going concern or as part of bankruptcy, liquidation, or similar proceeding, in which Personal Data held by Us about our
    //                     Service users is among the assets transferred.</p>
    //                 <p><strong>For other purposes</strong>: We may use Your information for other purposes, such as data analysis, identifying usage trends, determining the effectiveness of our
    //                     promotional campaigns and to evaluate and improve our Service, products, services, marketing and your experience.</p>
    //                 <p>We may share Your personal information in the following situations:</p>
    //                 <p><strong>With Service Providers:</strong> We may share Your personal information with Service Providers to monitor and analyze the use of our Service, to contact You.</p>
    //                 <p><strong>For business transfers:</strong> We may share or transfer Your personal information in connection with, or during negotiations of, any merger, sale of Company assets,
    //                     financing, or acquisition of all or a portion of Our business to another company.</p>
    //                 <p><strong>With Affiliates:</strong> We may share Your information with Our affiliates, in which case we will require those affiliates to honor this Privacy Policy. Affiliates
    //                     include Our parent company and any other subsidiaries, joint venture partners or other companies that We control or that are under common control with Us.</p>
    //                 <p><strong>With business partners:</strong> We may share Your information with Our business partners to offer You certain products, services or promotions.</p>
    //                 <p><strong>With other users:</strong> when You share personal information or otherwise interact in the public areas with other users, such information may be viewed by all users
    //                     and may be publicly distributed outside.</p>
    //                 <p><strong>With Your consent</strong>: We may disclose Your personal information for any other purpose with Your consent.</p>
    //             </div>
    //             <div className={'flex flex-col gap-2.5'}>
    //                 <h3 className={'text-xl font-bold'}>Retention of Your Personal Data</h3>
    //                 <p>The Company will retain Your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use Your Personal Data to the
    //                     extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our
    //                     legal agreements and policies.</p>
    //                 <p>The Company will also retain Usage Data for internal analysis purposes. Usage Data is generally retained for a shorter period of time, except when this data is used to
    //                     strengthen the security or to improve the functionality of Our Service, or We are legally obligated to retain this data for longer time periods.</p>
    //                 </div>
    //                 <div className={'flex flex-col gap-2.5'}>
    //                     <h3 className={'text-xl font-bold'}>Transfer of Your Personal Data</h3>
    //                     <p>Your information, including Personal Data, is processed at the Company&#39;s operating offices and in any other places where the parties involved in the processing are located.
    //                         It means that this information may be transferred to — and maintained on — computers located outside of Your state, province, country or other governmental jurisdiction where
    //                         the data protection laws may differ than those from Your jurisdiction.</p>
    //                     <p>Your consent to this Privacy Policy followed by Your submission of such information represents Your agreement to that transfer.</p>
    //                     <p>The Company will take all steps reasonably necessary to ensure that Your data is treated securely and in accordance with this Privacy Policy and no transfer of Your Personal
    //                         Data will take place to an organization or a country unless there are adequate controls in place including the security of Your data and other personal information.</p>
    //                 </div>
    //                 <div className={'flex flex-col gap-2.5'}>
    //                     <h3 className={'text-xl font-bold'}>Delete Your Personal Data</h3>
    //                     <p>You have the right to delete or request that We assist in deleting the Personal Data that We have collected about You.</p>
    //                     <p>Our Service may give You the ability to delete certain information about You from within the Service.</p>
    //                     <p>You may update, amend, or delete Your information at any time by signing in to Your Account, if you have one, and visiting the account settings section that allows you to manage
    //                         Your personal information. You may also contact Us to request access to, correct, or delete any personal information that You have provided to Us.</p>
    //                     <p>Please note, however, that We may need to retain certain information when we have a legal obligation or lawful basis to do so.</p>
    //                 </div>
    //                 <div className={'flex flex-col gap-2.5'}>
    //                     <h3 className={'text-xl font-bold'}>Disclosure of Your Personal Data</h3>
    //                     <h4 className={'text-lg font-bold'}>Business Transactions</h4>
    //                     <p>If the Company is involved in a merger, acquisition or asset sale, Your Personal Data may be transferred. We will provide notice before Your Personal Data is transferred and
    //                         becomes subject to a different Privacy Policy.</p>
    //                     <h4 className={'text-lg font-bold'}>Law enforcement</h4>
    //                     <p>Under certain circumstances, the Company may be required to disclose Your Personal Data if required to do so by law or in response to valid requests by public authorities (e.g.
    //                         a court or a government agency).</p>
    //                     <h4 className={'text-lg font-bold'}>Other legal requirements</h4>
    //                     <p>The Company may disclose Your Personal Data in the good faith belief that such action is necessary to Comply with a legal obligation, Protect and defend the rights or property
    //                         of the Company, Prevent or investigate possible wrongdoing in connection with the Service, Protect the personal safety of Users of the Service or the public, Protect against
    //                         legal liability</p>
    //                 </div>
    //                 <div className={'flex flex-col gap-2.5'}>
    //                     <h3 className={'text-xl font-bold'}>Security of Your Personal Data</h3>
    //                     <p>The security of Your Personal Data is important to Us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While We
    //                         strive to use commercially acceptable means to protect Your Personal Data, We cannot guarantee its absolute security.</p>
    //                 </div>
    //                 <h2 className={'text-xl font-bold'}>Children&#39;s Privacy</h2>
    //                 <div className={'flex flex-col gap-2.5'}>
    //                     <p>Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from anyone under the age of 13. If You are a parent or
    //                         guardian and You are aware that Your child has provided Us with Personal Data, please contact Us. If We become aware that We have collected Personal Data from anyone under the
    //                         age of 13 without verification of parental consent, We take steps to remove that information from Our servers.</p>
    //                     <p>If We need to rely on consent as a legal basis for processing Your information and Your country requires consent from a parent, We may require Your parent&#39;s consent before
    //                         We collect and use that information.</p>
    //                 </div>
    //                 <h2 className={'text-xl font-bold'}>Links to Other Websites</h2>
    //                 <div className={'flex flex-col gap-2.5'}>
    //                     <p>Our Service may contain links to other websites that are not operated by Us. If You click on a third party link, You will be directed to that third party&#39;s site. We strongly
    //                         advise You to review the Privacy Policy of every site You visit.</p>
    //                     <p>We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.</p>
    //                 </div>
    //                 <h2 className={'text-xl font-bold'}>Changes to this Privacy Policy</h2>
    //                 <div className={'flex flex-col gap-2.5'}>
    //                     <p>We may update Our Privacy Policy from time to time. We will notify You of any changes by posting the new Privacy Policy on this page.</p>
    //                     <p>We will let You know via email and/or a prominent notice on Our Service, prior to the change becoming effective and update the &quot;Last updated&quot; date at the top of this
    //                         Privacy Policy.</p>
    //                     <p>You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</p>
    //                 </div>
    //                 <h2 className={'text-xl font-bold'}>Contact Us</h2>
    //                 <p>If you have any questions about this Privacy Policy, You can contact us by email: project.yaha@gmail.com</p>
    //             </div>
    //             <div className={'relative ml-[20px] max-[872px]:ml-0 p-4 max-[852px]:py-0 w-full min-w-[332px] max-w-[352px] max-[852px]:hidden'}></div>
    //         </div>
    //     </div>
    )
}

export default PrivacyPage;
