import api from "@/pages/api/api";
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const jwt = req.cookies.timeline_jwt
        if (!jwt) {
            res.status(200).json({});
            return
        }
        const response = await api.get(`/user/timeline/${req.query.timelineId}/content`, {headers: {lang: 'en', Authorization: `Bearer ${jwt}`}});
        const data = response.data

        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export default handler;
