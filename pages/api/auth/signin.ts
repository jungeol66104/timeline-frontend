import { NextApiRequest, NextApiResponse } from 'next';
import { google } from 'googleapis';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const redirectPath = req.query.redirectPath as string

    const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        `${process.env.NEXTAUTH_URL}/api/auth/callback/google`
    );

    const signInUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: ['openid', 'email', 'profile'],
        // scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'],
        state: redirectPath || '/'
    });

    res.redirect(signInUrl);
}
export default handler;