import { NextApiRequest, NextApiResponse } from 'next';
import api from "@/pages/api/api";
import cookie from "cookie";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const { idToken } = req.body;
    if (!idToken) return res.status(400).json({ error: 'Missing idToken' });

    try {
        const response = await api.post(`/auth/login`, { accessToken: idToken, provider: 'google' }, {headers: {lang: 'en'}});
        const jwtToken = response.data.data.jwtToken;
        const jwtPayload = JSON.parse(Buffer.from(jwtToken.split('.')[1], 'base64url').toString('utf8'));
        const expires = new Date(jwtPayload.exp * 1000)

        res.setHeader('Set-Cookie', cookie.serialize('timeline_jwt', jwtToken, {
            httpOnly: true,
            secure: req.headers['x-forwarded-proto'] === 'https',
            sameSite: 'strict',
            path: '/',
            expires: expires
        }));

        res.status(200).json({ message: 'Authentication successful' });
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || 'Authentication failed';
        console.error('Error during authentication callback:', errorMessage);
        res.status(500).json({ error: errorMessage });
    }
}
export default handler;