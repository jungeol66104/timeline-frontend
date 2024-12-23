import { GetServerSideProps } from 'next'
import api from "@/pages/api/api";
import { escapeXML } from "@/utils/global"

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
    if (res) {
        const response = await api.get('/timeline/all?searchType=0&pageNum=1&pageSize=all', {headers: {lang: 'en'}})
        const timelines: any[] = response.data.data
        // const timelineIds = timelines.map(timeline => timeline.id)
        const timelinePaths = timelines.map(timeline => timeline.timelinePath)
        // const urls = ['https://timeline.vg/favicon.ico', ...timelineIds.map(timelineId => `https://timeline.vg/timelines/${timelineId}`)]
        const urls = ['https://timeline.vg/favicon.ico', ...timelinePaths.map(timelinePath => `https://timeline.vg/timelines/${timelinePath}`)]

        res.setHeader('Content-Type', 'text/xml')
        res.write(`<?xml version="1.0" encoding="UTF-8"?>
            <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
                ${urls.map(url => `<url><loc>${escapeXML(url)}</loc></url>`).join('')}
            </urlset>`)
        res.end()
    }
    return {props: {}}
}
const Sitemap = () => null
export default Sitemap