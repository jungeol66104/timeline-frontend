import api from "@/pages/api/api";
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'GET') return res.status(405).json({ message: 'Method Not Allowed' });

    const jwt = req.cookies.timeline_jwt || req.headers['authorization']?.split(' ')[1];
    const type = Number(req.query.type)
    const user = req.query.user
    const pageNum = Number(req.query.pageNum) || 1

    try {
        let response;
        if (type === 0) {
            response = await api.get(`/user/${user}/contribution?pageNum=${pageNum}&pageSize=20`, {headers: {lang: 'en'}});
            if (response.data.code === 69999) return
        } else {
            if (!jwt) return res.status(401).json({ message: 'Authentication required' });

            response = await api.get(`/user/timeline?pageNum=1&pageSize=20`, {headers: {lang: 'en', Authorization: `Bearer ${jwt}`}});
            if (response.data.code === 69999) return
        }

        res.status(200).json(response.data.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export default handler;
