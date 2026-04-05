import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyJwt } from '@/lib/auth';
import type { NextRequest } from 'next/server';

// helper to verify request since middleware just secures paths but we might need role checks
async function getUser(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value;
  if (!token) return null;
  return await verifyJwt(token);
}

// GET: Liste des patients (Recherche optionnelle)
export async function GET(request: NextRequest) {
  const user = await getUser(request);
  if (!user) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search');

  try {
    const patients = await prisma.patient.findMany({
      where: search ? {
        OR: [
          { nom: { contains: search, mode: 'insensitive' } },
          { prenom: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } }
        ]
      } : undefined,
      orderBy: { createdAt: 'desc' },
      take: 50 // pagination par défaut
    });
    
    return NextResponse.json(patients);
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la récupération des patients' }, { status: 500 });
  }
}

// POST: Créer un nouveau patient
export async function POST(request: NextRequest) {
  const user = await getUser(request);
  if (!user) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

  try {
    const body = await request.json();
    const { nom, prenom, date_naissance, tel, email, adresse, allergies, antecedents } = body;

    // Validation simple
    if (!nom || !prenom || !date_naissance) {
      return NextResponse.json({ error: 'Nom, prénom et date de naissance sont requis' }, { status: 400 });
    }

    const newPatient = await prisma.patient.create({
      data: {
        nom,
        prenom,
        date_naissance: new Date(date_naissance),
        tel,
        email,
        adresse,
        allergies,
        antecedents
      }
    });

    return NextResponse.json(newPatient, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erreur lors de la création du patient' }, { status: 500 });
  }
}
