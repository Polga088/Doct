import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyJwt } from '@/lib/auth';
import type { NextRequest } from 'next/server';

// helper pour auth
async function getUser(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value;
  if (!token) return null;
  return await verifyJwt(token);
}

// GET: Récupérer un patient spécifique
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const user = await getUser(request);
  if (!user) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

  try {
    const { id } = await params;
    const patient = await prisma.patient.findUnique({
      where: { id },
      include: {
        appointments: {
          orderBy: { date_heure: 'desc' },
          take: 5
        }
      }
    });

    if (!patient) return NextResponse.json({ error: 'Patient introuvable' }, { status: 404 });

    return NextResponse.json(patient);
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la récupération du patient' }, { status: 500 });
  }
}

// PUT: Mettre à jour un patient
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const user = await getUser(request);
  if (!user) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

  try {
    const { id } = await params;
    const body = await request.json();
    const { nom, prenom, date_naissance, tel, email, adresse, allergies, antecedents } = body;

    const updatedPatient = await prisma.patient.update({
      where: { id },
      data: {
        ...(nom && { nom }),
        ...(prenom && { prenom }),
        ...(date_naissance && { date_naissance: new Date(date_naissance) }),
        ...(tel !== undefined && { tel }),
        ...(email !== undefined && { email }),
        ...(adresse !== undefined && { adresse }),
        ...(allergies !== undefined && { allergies }),
        ...(antecedents !== undefined && { antecedents }),
      }
    });

    return NextResponse.json(updatedPatient);
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la mise à jour du patient' }, { status: 500 });
  }
}

// DELETE: Supprimer un patient
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const user = await getUser(request);
  if (!user) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  
  // Exigence de rôle (seul l'admin ou le medecin peuvent supprimer)
  const role = (user as any).role;
  if (role !== 'ADMIN' && role !== 'DOCTOR') {
      return NextResponse.json({ error: 'Permissions insuffisantes' }, { status: 403 });
  }

  try {
    const { id } = await params;
    await prisma.patient.delete({ where: { id } });
    return NextResponse.json({ message: 'Patient supprimé avec succès' });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la suppression' }, { status: 500 });
  }
}
