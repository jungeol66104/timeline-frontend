import { NextApiRequest, NextApiResponse } from 'next';
import cookie from "cookie";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const redirectPath = req.query.redirectPath as string

    res.setHeader('Set-Cookie', cookie.serialize('timeline_jwt', '', {
        httpOnly: true,
        secure: req.headers['x-forwarded-proto'] === 'https',
        sameSite: 'strict',
        path: '/',
        expires: new Date(0),
    }));

    res.redirect(decodeURIComponent(redirectPath))
}
export default handler;