import api from "@/pages/api/api";
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'PUT') return res.status(405).json({ message: 'Method Not Allowed' });

    const jwt = req.cookies.timeline_jwt;
    if (!jwt) return res.status(401).json({ message: 'Authentication required' });

    try {
        const { data } = await api.put('/wiki/timeline/content', req.body, {
            headers: { lang: 'en', Authorization: `Bearer ${jwt}` }
        });
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


export default handler;
