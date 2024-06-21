import NewTimelineHeader from "@/components/timelines/new/newTimelineHeader";
import NewTimelineInformation from "@/components/timelines/new/newTimelineInformation";
import NewTimelineEditMenubar from "@/components/timelines/new/newTimelineEditMenubar";
import NewTimelineEmpty from "@/components/timelines/new/newTimelineEmpty";

const NewTimelineSectionPrimary = () => {
    return (
        <div>
            <div className={'relative w-full max-w-[630px] min-[852px]:min-w-[500px]'}>
                <NewTimelineHeader/>
                <NewTimelineEditMenubar />
                <hr className={'mx-4'}/>
                <NewTimelineInformation/>
                <hr className={'mx-4'}/>
                <NewTimelineEmpty />
            </div>
        </div>
    );
};

export default NewTimelineSectionPrimary;
