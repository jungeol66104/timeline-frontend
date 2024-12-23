import React from 'react';
import StartTimeliningButton from "@/components/about/startTimeliningButton";
import ExploreButton from "@/components/about/exploreButton";
import TimelineExampleCard from "@/components/about/timelineExampleCard";
import KeyConceptBar from "@/components/about/keyConceptBar";
import KeyConceptDescription from "@/components/about/keyConceptDescription";
import TimelineDemo from "@/components/about/timelineDemo";

const AboutSectionPrimary = () => {
    return (
        <div className={'relative py-10 w-full max-w-[630px] min-[852px]:min-w-[500px] flex flex-col gap-10'}>
            <div className={'px-4 flex flex-col gap-10'}>
                <h1 className={'flex flex-col text-6xl font-bold'}>
                    <span>TIMELINE</span><span>YOUR</span><span>INTEREST.</span>
                </h1>
                <p className={'text-lg font-medium'}>
                    We support organizing any kind of information in time sequence.
                    Create timeline, keep it private or publish it to the wiki, or do both.
                    Have fun playing, sharing and learning at the same time!
                </p>
                <div className={'flex gap-3'}>
                    <StartTimeliningButton />
                    <ExploreButton />
                </div>
            </div>
            <div className={'min-[872px]:hidden px-4 py-3'}><TimelineExampleCard/></div>
            <div className={'px-4 flex flex-col gap-10'}>
                <h2 className={'text-4xl font-bold'}>Why timeline?</h2>
                <div className={'flex flex-col gap-8'}>
                    <p className={'text-lg font-medium'}>
                        We believe that timeline is one of the most effective format when we organize information and learn from it.
                        Timeline allows us to see the big picture and read the overall flow about the topic.
                    </p>
                    <p className={'text-lg font-medium'}>
                        In the age of flourishing information, outdated and duplicated information is everywhere.
                        Our mission is to centralize the information, organize it in time sequence and then update it regularly to reduce obsolescence and duplication in the web.
                    </p>
                    <p className={'text-lg font-medium'}>
                        You are able to create and edit timelines that you are interested in with our service in effortless manner.
                        Although you can leave your timelines private, we are confident that publishing it and editing other timelines in the wiki will contribute to the better internet.
                    </p>
                </div>
            </div>
            <div className={'px-4 flex flex-col gap-10'}>
                <h2 className={'text-4xl font-bold'}>What do we serve?</h2>
                <div className={'flex flex-col gap-8'}>
                    <h3 className={'text-2xl font-semibold'}>Simple timeline maker</h3>
                    <p className={'text-lg font-medium'}>
                        Timeline is a combination of various elements.
                        It is composed of numerous events.
                        Keeping timeline simple is one of the important goals that we always bear in mind.
                        That is why our timeline is always as simple as possible.
                    </p>
                </div>
                <div className={'flex flex-col gap-8'}>
                    <h3 className={'text-2xl font-semibold'}>Modern wiki experience</h3>
                    <p className={'text-lg font-medium'}>
                        Wiki that is built on top of collective intelligence has benefited humanity enormously.
                        However, the user experience that most wiki services give didn&apos;t follow time.
                        We care about advancing our user experience. Our wiki will always remain modern.
                    </p>
                </div>
            </div>
            <div className={'px-4 flex flex-col gap-10'}>
                <h2 className={'text-4xl font-bold'}>Key concepts</h2>
                <p className={'text-lg font-medium'}>
                    Click buttons and interact directly with the timeline demo below to understand how timeline works.
                </p>
                <div className={'w-full flex flex-col gap-5'}>
                    <KeyConceptBar />
                    <KeyConceptDescription />
                    <TimelineDemo/>
                </div>
            </div>
            <div className={'px-4 flex flex-col gap-10'}>
                <h2 className={'text-4xl font-bold'}>Dive right in!</h2>
                <p className={'text-lg font-medium'}>
                    Congratulations! You are completely ready to use our service.
                    Click &apos;Start Timelining&apos; to create timeline right away and click &apos;Explore&apos; to see what other contributors have done.
                </p>
                <div className={'flex gap-3'}>
                    <StartTimeliningButton/>
                    <ExploreButton/>
                </div>
            </div>
        </div>
    );
};

export default AboutSectionPrimary;
