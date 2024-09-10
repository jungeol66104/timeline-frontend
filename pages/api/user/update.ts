import fs from 'fs';
import FormData from 'form-data';
import formidable from 'formidable';
import api from "@/pages/api/api";
import { NextApiRequest, NextApiResponse } from 'next';

export const config = {
    api: {
        bodyParser: false,
    },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'PUT') {
        res.status(405).json({ message: 'Method Not Allowed' });
        return;
    }

    const jwt = req.cookies.timeline_jwt;
    if (!jwt) {
        res.status(401).json({ message: 'Authentication required' });
        return;
    }

    try {
        const form = formidable({})
        const [fields, files] = await form.parse(req)

        const username = fields.username?.[0]
        const image = files.image?.[0]

        if (username) {
            const formData = new FormData();
            formData.append('username', username);
            if (image) formData.append('image', fs.createReadStream(image.filepath), {filename: image.originalFilename as string});

            const response = await api.put('/user/info', formData, {headers: { ...formData.getHeaders(), lang: 'en', Authorization: `Bearer ${jwt}` }});
            const data = response.data.data;

            if (response.data.code === 69999) {
                res.status(400).json({message: 'Error: Invalid Code 69999'})
                return
            }
            res.status(200).json(data);
        } else res.status(400).json({ message: 'No username found' })
    } catch (error) {
        console.error('Error forwarding formData:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export default handler;
