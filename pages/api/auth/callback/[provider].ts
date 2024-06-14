import { NextApiRequest, NextApiResponse } from 'next';
import { google } from 'googleapis';
import cookie from 'cookie'
import api from "@/pages/api/api";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const code = req.query.code as string
        const redirectPath = req.query.state as string

        const oauth2Client = new google.auth.OAuth2(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET,
            `${process.env.NEXTAUTH_URL}/api/auth/callback/google`
        );

        const { tokens } = await oauth2Client.getToken(code);
        const idToken = tokens.id_token;

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

        res.redirect(decodeURIComponent(redirectPath));
    } catch (error) {
        console.error('Error during authentication callback:', error);
        res.status(500).json({ error: 'Authentication failed' });
    }
};
export default handler;