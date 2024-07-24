import NewTimelineHeader from "@/_deprecated/new/newTimelineHeader";
import NewTimelineInformation from "@/_deprecated/new/newTimelineInformation";
import NewTimelineEditMenubar from "@/_deprecated/new/newTimelineEditMenubar";
import NewTimelineEmpty from "@/_deprecated/new/newTimelineEmpty";

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
