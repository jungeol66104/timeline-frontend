import {useSelector} from "react-redux";
import {selectCurrentEvent} from "@/store/slices/contentsSlice";

const EventHistoryDiff = () => {
    const currentEvent = useSelector(selectCurrentEvent)

    return (
        <>
            <div className={'pb-3 flex gap-3'}>
                <div className={'h-[36px] flex items-center gap-2'}>
                    <div className={'w-9 h-6'} style={{backgroundColor: 'rgba(255, 0, 0, 0.3)'}}></div>
                    <div className={'text-sm font-semibold'}>Deleted</div>
                </div>
                <div className={'h-[36px] flex items-center gap-2'}>
                    <div className={'w-9 h-6'} style={{backgroundColor: 'rgba(0, 255, 0, 0.3)'}}></div>
                    <div className={'text-sm font-semibold'}>Inserted</div>
                </div>
            </div>
            <hr/>
            <div className={'pt-3 flex flex-col gap-[20px]'}>
                <p>{currentEvent.description}</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip <del className={'diff'}>ex ea commodo consequat. Duis aute irure dolor</del> <ins className={'diff'}>in reprehenderit in voluptate velit esse cillum</ins> dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
            </div>
        </>
    );
};

export default EventHistoryDiff;
