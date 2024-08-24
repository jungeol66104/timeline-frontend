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
    if (!jwt && url.pathname.startsWith('/timelines/new')) {
        url.pathname = '/';
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}