import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyJwt } from '@/lib/auth';
import type { NextRequest } from 'next/server';

async function getUser(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value;
  if (!token) return null;
  return await verifyJwt(token);
}

// GET: Liste des rendez-vous
export async function GET(request: NextRequest) {
  const user = await getUser(request);
  if (!user) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const dateStr = searchParams.get('date'); // format YYYY-MM-DD
  const doctorId = searchParams.get('doctor_id');

  try {
    let dateFilter = {};
    if (dateStr) {
      const startOfDay = new Date(dateStr);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(dateStr);
      endOfDay.setHours(23, 59, 59, 999);
      dateFilter = {
        date_heure: {
          gte: startOfDay,
          lte: endOfDay,
        }
      };
    }

    const appointments = await prisma.appointment.findMany({
      where: {
        ...dateFilter,
        ...(doctorId && { doctor_id: doctorId }),
      },
      include: {
        patient: { select: { nom: true, prenom: true, tel: true } },
        doctor: { select: { nom: true } }
      },
      orderBy: { date_heure: 'asc' }
    });

    return NextResponse.json(appointments);
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la récupération des rendez-vous' }, { status: 500 });
  }
}

// POST: Créer un rendez-vous (Optionnellement créer le patient s'il est nouveau)
export async function POST(request: NextRequest) {
  const user = await getUser(request);
  if (!user) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

  try {
    const body = await request.json();
    const { date_heure, motif, doctor_id, patient_id, new_patient } = body;

    if (!date_heure || !motif || !doctor_id) {
      return NextResponse.json({ error: 'Champs obligatoires manquants' }, { status: 400 });
    }

    let finalPatientId = patient_id;

    // Création rapide d'un patient
    if (new_patient) {
      const { nom, prenom, tel, date_naissance } = new_patient;
      const createdPatient = await prisma.patient.create({
        data: {
          nom,
          prenom,
          tel,
          date_naissance: new Date(date_naissance || new Date())
        }
      });
      finalPatientId = createdPatient.id;
    }

    if (!finalPatientId) {
      return NextResponse.json({ error: 'Patient requis' }, { status: 400 });
    }

    const appointment = await prisma.appointment.create({
      data: {
        date_heure: new Date(date_heure),
        motif,
        doctor_id,
        patient_id: finalPatientId,
        statut: 'PROGRAMME'
      },
      include: { patient: true }
    });

    return NextResponse.json(appointment, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la création du rendez-vous' }, { status: 500 });
  }
}
