import api from "@/pages/api/api";
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'GET') {
        res.status(405).json({ message: 'Method Not Allowed' });
        return;
    }

    const jwt = req.cookies.timeline_jwt;

    try {
        const type = Number(req.query.type)
        const user = req.query.user
        const pageNum = Number(req.query.pageNum) || 1

        let data;
        if (type === 0) {
            let response;
            if (jwt) response = await api.get(`/user/${user}/contribution?pageNum=${pageNum}&pageSize=20`, {headers: {lang: 'en', Authorization: `Bearer ${jwt}`}});
            else response = await api.get(`/user/${user}/contribution?pageNum=${pageNum}&pageSize=20`, {headers: {lang: 'en'}});
            if (response.data.code === 69999) return
            data = response.data.data;
        } else {
            if (!jwt) {
                res.status(401).json({ message: 'Authentication required' });
                return;
            }

            const response = await api.get(`/user/timeline?pageNum=1&pageSize=20`, {headers: {lang: 'en', Authorization: `Bearer ${jwt}`}});
            if (response.data.code === 69999) return
            data = response.data.data;
        }

        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export default handler;
