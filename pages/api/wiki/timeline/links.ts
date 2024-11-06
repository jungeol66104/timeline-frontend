import api from "@/pages/api/api";
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Method Not Allowed' });
        return;
    }

    const { internalIds } = req.body
    if (!Array.isArray(internalIds)) return res.status(400).json({error: 'Invalid IDs'})

    const jwt = req.cookies.timeline_jwt
    if (!jwt) {
        res.status(200).json({});
        return
    }

    try {
        const params = new URLSearchParams();
        internalIds.forEach(id => params.append('id', id));
        const response = await api.get(`/wiki/timeline/links?${params.toString()}`, {headers: {lang: 'en', Authorization: `Bearer ${jwt}`}});

        return res.status(200).json(response.data);
    } catch (error) {return res.status(500).json({ error: 'Error fetching data from AWS server' });}
}

export default handler;
