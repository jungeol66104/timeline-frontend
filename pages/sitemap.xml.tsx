import { GetServerSideProps } from 'next'
import api from "@/utils/api";
// refactoring: clear

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
    if (res) {
        const timelineResponse = await api.get('/timeline', {headers: {lang: 'en'}})
        const eventResponse = await api.get('/event', {headers: {lang: 'en'}})
        const timelines: any[] = timelineResponse.data.data.slice(0, 10)
        const events: any[] = eventResponse.data.data.slice(0, 10)
        const timelineIds = timelines.map(timeline => timeline.id)
        const eventIds = events.map(event => event.id)
        const urls = [...timelineIds.map(timelineId => `https://timeline.vg/timelines/${timelineId}`), ...eventIds.map(eventId => `https://timeline.vg/events/${eventId}`)]

        res.setHeader('Content-Type', 'text/xml')
        res.write(`<?xml version="1.0" encoding="UTF-8"?>
            <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
                ${urls.map(url => `<url><loc>${url}</loc></url>`).join('')}
            </urlset>`)
        res.end()
    }
    return {
        props: {},
    }
}
const Sitemap = () => null
export default Sitemap