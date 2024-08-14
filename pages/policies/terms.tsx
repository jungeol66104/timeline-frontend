import React from 'react';
import Link from "next/link";

const TermsPage = () => {
    return (
        <div className={'page'}>
            <div className={'pageWrapper w-full flex'}>
                {/* Section Primary */}
                <div className={'relative h-fit w-full max-w-[630px] px-4 py-10 flex flex-col gap-10 text-lg font-medium'}>
                    <div className={'flex flex-col gap-10'}>
                        <h1 className={'text-6xl font-bold'}>Terms of use</h1>
                        <div className={'text-[16px] font-normal'}>
                            <p>Last Updated: August 14, 2024</p>
                            <p>Effective: August 14, 2024</p>
                        </div>
                    </div>
                    <div className={'flex flex-col gap-8'}>
                        <p>Thank you for using Timeline!</p>
                        <p>By accessing or using Timeline, you acknowledge that you have read, understood, and agree to be bound by these Terms of Use. If you do not agree to these Terms, please do not use our services.</p>
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
                                <li>Use our services under compliance of this Terms of Use.</li>
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
                            <h3 className={'text-2xl font-semibold'}>Copyright Complaints</h3>
                            <p>If you believe that any content on Timeline infringes your copyright or intellectual property rights, please notify us by sending a written notice to <Link href={'mailto:project.yaha@gmail.com'} className={'text-blue-700 hover:underline'}>project.yaha@gmail.com</Link>.</p>
                            <p>Your notice should include the following information.</p>
                            <ul className={'px-4 flex flex-col gap-2 list-disc'}>
                                <li>A physical or electronic signature of the person authorized to act on behalf of the owner of the copyright interest.</li>
                                <li>A description of the copyrighted work or intellectual property you claim has been infringed.</li>
                                <li>A description of the material you claim is infringing and where it is located on Timeline.</li>
                                <li>Your address, telephone number, and e-mail address.</li>
                                <li>A statement that you believe in good faith that the use of the material is not authorized by the copyright owner or law.</li>
                                <li>A statement by you that the above information in your notice is accurate and, under penalty of perjury, that you are the copyright owner or authorized to act on the copyright owner’s behalf</li>
                            </ul>
                        </div>

                    </div>

                    {/* General */}
                    <div className={'flex flex-col gap-10'}>
                        <h2 className={'text-4xl font-bold'}>General</h2>
                        <div className={'flex flex-col gap-8'}>
                            <h3 className={'text-2xl font-semibold'}>Change of terms</h3>
                            <p>
                                We may update these Terms of Use from time to time.
                                Any changes will be effective immediately upon posting the revised terms on our website.
                            </p>
                            <p>
                                Your continued use of Timeline after any changes signifies your acceptance of the updated terms.
                                It is your responsibility to review the Terms periodically to stay informed of any updates.
                            </p>
                        </div>
                        <div className={'flex flex-col gap-8'}>
                            <h3 className={'text-2xl font-semibold'}>Limitation of Liability</h3>
                            <p>
                                TIMELINE IS PROVIDED &apos;AS IS&apos; AND &apos;AS AVAILABLE&apos;.
                                WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS.
                                TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE ARE NOT LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR RELATED TO YOUR
                                USE OF TIMELINE.
                                OUR TOTAL LIABILITY IS LIMITED TO THE AMOUNT YOU PAID, IF ANY, FOR ACCESSING THE SERVICE.
                            </p>
                        </div>
                        <div className={'flex flex-col gap-8'}>
                            <h3 className={'text-2xl font-semibold'}>Dispute Resolution</h3>
                            <p>
                                If you have any issues or disputes related to Timeline, we ask that you contact us first to attempt to resolve the matter informally.
                                To do this, you must send a written notice detailing the nature of the dispute, your contact information, and the resolution you seek.
                            </p>
                            <p>
                                This notice should be sent via email to <Link href={'mailto:project.yaha@gmail.com'} className={'text-blue-700 hover:underline'}>project.yaha@gmail.com</Link>.
                                We will acknowledge receipt of your notice within seven business days and will make every effort to resolve the issue within 30 days.
                            </p>
                            <p>
                                If we are unable to reach a resolution through informal discussion, any unresolved disputes will be settled through binding arbitration, unless you and we agree
                                otherwise.
                            </p>
                            <p>
                                Arbitration will be conducted by a mutually agreed-upon organization, and the decision will be final.
                                You agree to waive any right to a jury trial or to participate in a class action.
                            </p>
                        </div>
                        <div className={'flex flex-col gap-8'}>
                            <h3 className={'text-2xl font-semibold'}>Governing Law</h3>
                            <p>These Terms of Use and any disputes arising out of or related to them or your use of Timeline will be governed by and construed in accordance with the laws of the
                                Republic of Korea, without regard to its conflict of law principles.</p>
                            <p>Any legal actions or proceedings related to these Terms will be brought exclusively in the courts located in Seoul, South Korea, and you consent to the jurisdiction of
                                such courts.</p>
                        </div>
                        <div className={'flex flex-col gap-8'}>
                            <h3 className={'text-2xl font-semibold'}>Entire Agreement</h3>
                            <p>These Terms of Use, along with our Privacy Policy, constitute the entire agreement between you and Timeline regarding your use of our services and supersede any prior agreements or understandings.</p>
                        </div>
                    </div>
                </div>
                {/* Section Secondary */}
                <div className={'relative ml-[20px] max-[872px]:ml-0 p-4 max-[852px]:py-0 w-full min-w-[332px] max-w-[352px] max-[852px]:hidden'}>
                    <div className={'sticky top-[76px] p-3 flex flex-col gap-3 bg-[#F2F2F259] border-[1px] border-[#E5E7EB] rounded-2xl'}>
                        <h3 className={'text-[20px] font-bold'}>Terms of use</h3>
                        <div className={'flex flex-col gap-2'}>
                            <div><div className={'font-bold line-clamp-1'}>Who we are</div></div>
                            <div><div className={'line-clamp-1'}>Using our services</div></div>
                            <div><div className={'line-clamp-1'}>Content of the services</div></div>
                            <div><div className={'line-clamp-1'}>General</div></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TermsPage;
