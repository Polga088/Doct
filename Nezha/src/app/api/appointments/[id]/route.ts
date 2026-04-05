import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyJwt } from '@/lib/auth';
import type { NextRequest } from 'next/server';

async function getUser(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value;
  if (!token) return null;
  return await verifyJwt(token);
}

// GET: Détail d'un rendez-vous
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const user = await getUser(request);
  if (!user) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

  try {
    const { id } = await params;
    const appointment = await prisma.appointment.findUnique({
      where: { id },
      include: {
        patient: true,
        consultation: true,
        invoice: true
      }
    });

    if (!appointment) return NextResponse.json({ error: 'Rendez-vous introuvable' }, { status: 404 });

    return NextResponse.json(appointment);
  } catch (error) {
    return NextResponse.json({ error: 'Erreur' }, { status: 500 });
  }
}

// PUT: Modifier le statut d'un rendez-vous
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const user = await getUser(request);
  if (!user) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

  try {
    const { id } = await params;
    const body = await request.json();
    const { statut, date_heure, motif } = body;

    const updated = await prisma.appointment.update({
      where: { id },
      data: {
        ...(statut && { statut }),
        ...(date_heure && { date_heure: new Date(date_heure) }),
        ...(motif && { motif })
      }
    });

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la modification' }, { status: 500 });
  }
}

// DELETE: Annuler un rendez-vous (Soft delete ou status CANCELED)
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const user = await getUser(request);
  if (!user) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

  try {
    const { id } = await params;
    // Plutôt qu'une suppression physique, on annule statut
    const cancelled = await prisma.appointment.update({
      where: { id },
      data: { statut: 'CANCELED' }
    });

    return NextResponse.json({ message: 'Rendez-vous annulé', appointment: cancelled });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de l\'annulation' }, { status: 500 });
  }
}
