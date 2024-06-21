import AddEventButton from "@/components/timelines/timelineEdit/addEventButton";
import CreateButton from "@/components/timelines/new/createButton";

const NewTimelineEditMenubar = () => {
    return (
        <div className={'sticky top-[90px] py-3 px-4 flex items-center justify-between bg-white z-50'}>
            <AddEventButton />
            <CreateButton />
        </div>
    );
};

export default NewTimelineEditMenubar;
