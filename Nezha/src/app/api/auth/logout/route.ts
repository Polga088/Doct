import { NextResponse } from 'next/server';

// GET request = lien <a> natif → supprime cookie + redirect 302 vers /login
export async function GET() {
  const response = NextResponse.redirect(
    new URL('/login', process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000')
  );
  
  response.cookies.set({
    name: 'auth_token',
    value: '',
    httpOnly: true,
    path: '/',
    maxAge: 0,
    expires: new Date(0),
  });

  return response;
}

// POST request = fallback JS fetch
export async function POST() {
  const response = NextResponse.json({ message: 'Déconnexion réussie' });
  response.cookies.set({
    name: 'auth_token',
    value: '',
    httpOnly: true,
    path: '/',
    maxAge: 0,
    expires: new Date(0),
  });
  return response;
}
