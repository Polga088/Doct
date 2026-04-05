import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyJwt } from '@/lib/auth';

// GET /api/auth/me — retourne l'utilisateur connecté depuis le JWT
export async function GET(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value;
  if (!token) {
    return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  }

  const payload = await verifyJwt(token);
  if (!payload) {
    return NextResponse.json({ error: 'Token invalide' }, { status: 401 });
  }

  return NextResponse.json({
    id: payload.id,
    email: payload.email,
    role: payload.role,
    nom: payload.nom,
  });
}
