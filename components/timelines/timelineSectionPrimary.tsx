import TimelineMenubar from "@/components/timelines/menubar/timelineMenubar";
import InformationPreview from "@/components/timelines/informationPreview";
import RelatedTimelines from "@/components/timelines/relatedTimelines";
import Events from "@/components/timelines/events/events";
import Toolbar from "@/components/timelines/toolbar";
import DiscordBanner from "@/components/timelines/discordBanner";

const TimelineSectionPrimary = () => {

    return (
        <div className={'p-3 pb-0 w-full max-w-[630px] min-[852px]:min-w-[500px] flex flex-col gap-3'}>
            <TimelineMenubar />
            <InformationPreview/>
            <RelatedTimelines />
            <DiscordBanner />
            <Events />
            <Toolbar />
        </div>
    )
}

export default TimelineSectionPrimary;
