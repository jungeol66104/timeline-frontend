import AddEventButton from "@/components/timelines/addEventButton";

const NewTimelineEmpty = () => {
    return (
        <div className={'py-10 px-4 flex flex-col items-center justify-center gap-5'}>
            <div className={'flex flex-col items-center'}>
                <div className={'font-bold text-[20px]'}>Start Timelining</div>
                <div>Create your first event for the timeline.</div>
            </div>
            <AddEventButton />
        </div>
    );
};

export default NewTimelineEmpty;
