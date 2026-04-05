import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'super-secret-key-pour-le-developpement-local'
);

async function getPayload(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload;
  } catch {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value;
  const url = request.nextUrl.clone();
  const pathname = url.pathname;

  // ============================================================
  // ROUTES PUBLIQUES : login
  // ============================================================
  if (pathname === '/login') {
    if (token) {
      const payload = await getPayload(token);
      if (payload) {
        const role = String(payload.role).toUpperCase();
        url.pathname = role === 'ADMIN' ? '/dashboard/admin'
                     : role === 'DOCTOR' ? '/dashboard/doctor'
                     : '/dashboard/assistant';
        return NextResponse.redirect(url);
      }
    }
    return NextResponse.next();
  }

  // ============================================================
  // ROUTES PROTÉGÉES : /dashboard/*
  // ============================================================
  if (pathname.startsWith('/dashboard')) {

    if (!token) {
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }

    const payload = await getPayload(token);
    if (!payload) {
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }

    const role = String(payload.role).toUpperCase(); // 'ADMIN' | 'DOCTOR' | 'ASSISTANT'

    const ownDashboard =
      role === 'ADMIN'  ? '/dashboard/admin'
    : role === 'DOCTOR' ? '/dashboard/doctor'
    :                     '/dashboard/assistant';

    // /dashboard exact → redirige vers son espace
    if (pathname === '/dashboard') {
      url.pathname = ownDashboard;
      return NextResponse.redirect(url);
    }

    // Routes partagées (tous les rôles connectés y ont accès)
    const isShared =
      pathname.startsWith('/dashboard/agenda') ||
      pathname.startsWith('/dashboard/patients');

    if (isShared) return NextResponse.next();

    // ── RBAC STRICT : règles explicites par rôle ──────────────
    if (pathname.startsWith('/dashboard/admin') && role !== 'ADMIN') {
      url.pathname = ownDashboard;
      return NextResponse.redirect(url);
    }
    if (pathname.startsWith('/dashboard/doctor') && role !== 'DOCTOR') {
      url.pathname = ownDashboard;
      return NextResponse.redirect(url);
    }
    if (pathname.startsWith('/dashboard/assistant') && role !== 'ASSISTANT') {
      url.pathname = ownDashboard;
      return NextResponse.redirect(url);
    }

    // L'utilisateur a le droit → on laisse passer ✅
    const res = NextResponse.next();
    res.headers.set('Cache-Control', 'no-store, max-age=0');
    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login'],
};
