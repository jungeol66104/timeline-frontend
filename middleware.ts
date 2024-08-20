import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const maintenanceMode = true;

export const middleware = (req: NextRequest) => {
    if (
        req.nextUrl.pathname.startsWith('/_next/') || // Static files served by Next.js
        req.nextUrl.pathname.startsWith('/api/') || // API routes
        /\.(ico|png|jpg|jpeg|svg|css|js|map)$/.test(req.nextUrl.pathname) // Static assets
    ) return NextResponse.next();

    if (maintenanceMode) {
        const url = req.nextUrl.clone();
        url.pathname = '/maintenance';
        return NextResponse.rewrite(url);
    }
    return NextResponse.next();
}