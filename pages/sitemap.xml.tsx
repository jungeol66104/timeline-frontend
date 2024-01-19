import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
    if (res) {
        const timelineIds = Array.from({length: 9}, (_, index) => index + 1)
        const eventIds = Array.from({length: 924}, (_, index) => index + 1)
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