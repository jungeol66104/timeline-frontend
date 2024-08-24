import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const maintenanceMode = false;

export const middleware = (req: NextRequest) => {
    const url = req.nextUrl.clone();

    if (req.nextUrl.pathname.startsWith('/_next/') || req.nextUrl.pathname.startsWith('/api/') || /\.(ico|png|jpg|jpeg|svg|css|js|map)$/.test(req.nextUrl.pathname)) {
        return NextResponse.next();
    }

    if (maintenanceMode) {
        url.pathname = '/maintenance';
        return NextResponse.rewrite(url);
    }

    const jwt = req.cookies.get('timeline_jwt');
    const patterns = [
        /^\/timelines\/new/,
        /^\/[^\/]+\/timelines\/[^\/]+$/
    ]
    if (!jwt && patterns.some(pattern => pattern.test(url.pathname))) {
        url.pathname = '/';
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}