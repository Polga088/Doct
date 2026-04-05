import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyPassword, signJwt } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // === VERSION REELLE CONNECTEE A PRISMA ===
    
    if (!email || !password) {
      return NextResponse.json({ error: 'Email et mot de passe requis' }, { status: 400 });
    }

    // Récupérer l'utilisateur
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ error: 'Identifiants invalides' }, { status: 401 });
    }

    // Vérifier mot de passe Hashé
    const isValid = await verifyPassword(password, user.password_hash);

    if (!isValid) {
      return NextResponse.json({ error: 'Identifiants invalides' }, { status: 401 });
    }

    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
      nom: user.nom,
    };

    const token = await signJwt(payload);

    const response = NextResponse.json({
      message: 'Connexion réussie',
      user: payload
    });

    response.cookies.set({
      name: 'auth_token',
      value: token,
      httpOnly: true,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 jour
    });

    return response;

  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
  }
}
