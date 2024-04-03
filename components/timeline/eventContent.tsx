import {TimelineEvent} from "@/store/slices/contentsSlice";
import Link from "next/link";
// refactoring: clear

const EventContent = ({event} : {event: TimelineEvent}) => {
    return (
        <Link href={`/events/${event.id}`} className={`eventContent relative cursor-pointer`}>
            <div className={`flex flex-col gap-1 bg-white h-full border-[0.1px] border-gray-300 rounded-xl shadow-md p-2.5 min-h-[112px]`}>
                <div className={'flex flex-col '}>
                    <div className={'text-xs font-semibold text-gray-500 line-clamp-1 text-ellipsis'}>{event.date}</div>
                    <div className={'mt-0.5 text-md font-bold'}>{event.name}</div>
                </div>
                <div className={'text-sm whitespace-pre-wrap break-words line-clamp-3'}>{event.description}</div>
            </div>
        </Link>
    )
}
export default EventContent