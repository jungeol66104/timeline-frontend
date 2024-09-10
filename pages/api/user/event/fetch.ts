import api from "@/pages/api/api";
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const jwt = req.cookies.timeline_jwt
        if (!jwt) {
            res.status(200).json({});
            return
        }
        // /user/event/47?timelineId=16
        const response = await api.get(`/user/event/${req.query.eventId}?timelineId=${req.query.timelienId}`, {headers: {lang: 'en', Authorization: `Bearer ${jwt}`}});
        const data = response.data.data
        console.log(response.data)

        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export default handler;
