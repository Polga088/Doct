import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyJwt } from '@/lib/auth';
import type { NextRequest } from 'next/server';

async function getUser(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value;
  if (!token) return null;
  return await verifyJwt(token);
}

// GET: Liste des factures
export async function GET(request: NextRequest) {
  const user = await getUser(request);
  if (!user) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const status = searchParams.get('statut');

  try {
    const invoices = await prisma.invoice.findMany({
      where: {
        ...(status && { statut: status as any }),
      },
      include: {
        appointment: {
          include: { patient: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(invoices);
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la récupération des factures' }, { status: 500 });
  }
}

// POST: Créer une facture pour un RDV terminé
export async function POST(request: NextRequest) {
  const user = await getUser(request);
  if (!user) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

  try {
    const body = await request.json();
    const { appointment_id, montant, methode_paiement } = body;

    if (!appointment_id || !montant || !methode_paiement) {
      return NextResponse.json({ error: 'Champs obligatoires manquants' }, { status: 400 });
    }

    // Vérifier si la facture n'existe pas déjà pour ce RDV
    const existing = await prisma.invoice.findUnique({
      where: { appointment_id }
    });

    if (existing) {
      return NextResponse.json({ error: 'Une facture existe déjà pour ce rendez-vous' }, { status: 400 });
    }

    const invoice = await prisma.invoice.create({
      data: {
        appointment_id,
        montant: parseFloat(montant),
        methode_paiement,
        statut: 'PAID',  // On suppose que la création correspond à un encaissement direct, sinon 'PENDING'
        date_paiement: new Date()
      }
    });

    return NextResponse.json(invoice, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la création de la facture' }, { status: 500 });
  }
}
