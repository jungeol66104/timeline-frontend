import { NextApiRequest, NextApiResponse } from 'next';
import api from "@/pages/api/api";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const jwt = req.cookies.timeline_jwt
        if (!jwt) {
            res.status(200).json({});
            return
        }

        const response = await api.get('/user/info', {headers: {lang: 'en', Authorization: `Bearer ${jwt}`}});
        const data = response.data.data

        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
export default handler;