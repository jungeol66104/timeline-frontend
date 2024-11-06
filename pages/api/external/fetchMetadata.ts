import {NextApiRequest, NextApiResponse} from "next";
import axios from 'axios';
import cheerio from 'cheerio';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Method Not Allowed' });
        return;
    }

    const jwt = req.cookies.timeline_jwt
    if (!jwt) {
        res.status(200).json({});
        return
    }

    const { externalLinks } = req.body
    if (!Array.isArray(externalLinks)) return res.status(400).json({error: 'Invalid URLs'})

    try {
        const results = await Promise.all(externalLinks.map(async (url) => {
            try {
                const { data } = await axios.get(url, {headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3' }});
                const $ = cheerio.load(data);

                const title = $('meta[property="og:title"]').attr('content') || $('title').text();
                const description = $('meta[property="og:description"]').attr('content') || $('meta[name="description"]').attr('content');
                const favicon = $('link[rel="icon"]').attr('href') || $('link[rel="shortcut icon"]').attr('href');
                const absoluteFavicon = favicon ? new URL(favicon, url).href : null;

                return {url, title: title || '', description: description || '', imageUrl: absoluteFavicon || ''}
            } catch (error) {
                console.error(`Error fetching ${url}:`, error);
                return {url: '', title: '', description: '', imageUrl: ''}
            }
        }));

        console.log(results)
        res.status(200).json(results);
    } catch (error) {return res.status(500).json({ error: 'Error fetching metadata' });}
}

export default handler;
