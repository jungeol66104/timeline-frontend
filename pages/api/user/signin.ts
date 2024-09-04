import { NextApiRequest, NextApiResponse } from 'next';
import { google } from 'googleapis';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        `${process.env.NEXTAUTH_URL}/api/user/callback/google`
    );

    const signInUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: ['openid', 'email', 'profile'],
    });

    res.redirect(signInUrl);
}
export default handler;