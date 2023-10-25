import {GetServerSideProps} from "next";
import events, {TimelineEvent} from "@/public/events";

export const getServerSideProps: GetServerSideProps = async ({query}) => {
    try {
        const event = events.find(e => e.id === Number(query.event))
        return {props: {event}}
    } catch (error) {
        console.error('Error fetching initial data during SSR:', error);
        return {props: {}}
    }
}

const eventPage = ({event}: {event: TimelineEvent}) => {
    // should fetch info from db by sending query
    return (
        <div className={'page'}>
            <div className={'mt-5 mb-5 z-40 flex flex-col gap-10'}>
                <div className={'flex flex-col gap-2.5'}>
                    <h1 className={'text-2xl font-black'}>{event.title}</h1>
                    <p>{event.content}</p>
                </div>
                <div className={'flex flex-col gap-2.5'}>
                    <h2 className={'text-lg font-semibold'}>연관된 타임라인</h2>
                    <div className={'flex gap-2.5 text-gray-500'}>
                        {event.tag}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default eventPage