import { NextApiRequest, NextApiResponse } from 'next';
import api from "@/pages/api/api";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Method Not Allowed' });
        return;
    }

    const jwt = req.cookies.timeline_jwt;
    if (!jwt) {
        res.status(401).json({ message: 'Authentication required' });
        return;
    }

    try {
        const response = await api.post('/wiki/timeline', req.body, {headers: {lang: 'en', Authorization: `Bearer ${jwt}`}});
        const data = response.data.data;

        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export default handler;
