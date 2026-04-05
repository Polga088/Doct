import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyJwt } from '@/lib/auth';
import type { NextRequest } from 'next/server';

async function getUser(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value;
  if (!token) return null;
  return await verifyJwt(token);
}

// GET: Détail d'une facture spécifique
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const user = await getUser(request);
  if (!user) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

  try {
    const { id } = await params;
    const invoice = await prisma.invoice.findUnique({
      where: { id },
      include: {
        appointment: {
          include: { patient: true, doctor: { select: { nom: true } } }
        }
      }
    });

    if (!invoice) return NextResponse.json({ error: 'Facture introuvable' }, { status: 404 });

    return NextResponse.json(invoice);
  } catch (error) {
    return NextResponse.json({ error: 'Erreur' }, { status: 500 });
  }
}

// PUT: Mettre à jour une facture (par exemple pour passer de PENDING à PAID)
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const user = await getUser(request);
  if (!user) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

  try {
    const { id } = await params;
    const body = await request.json();
    const { statut, methode_paiement } = body;

    const dataToUpdate: any = {};
    if (statut) {
      dataToUpdate.statut = statut;
      if (statut === 'PAID') {
        dataToUpdate.date_paiement = new Date();
      }
    }
    if (methode_paiement) {
      dataToUpdate.methode_paiement = methode_paiement;
    }

    const updated = await prisma.invoice.update({
      where: { id },
      data: dataToUpdate
    });

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la mise à jour' }, { status: 500 });
  }
}
