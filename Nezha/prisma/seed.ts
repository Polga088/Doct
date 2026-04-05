import { prisma } from '../src/lib/prisma';
import * as bcrypt from 'bcryptjs';

async function main() {
  const passwordHash = await bcrypt.hash('password123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@clinique.com' },
    update: { password_hash: passwordHash, nom: 'Directeur Cabinet' },
    create: { email: 'admin@clinique.com', password_hash: passwordHash, role: 'ADMIN', nom: 'Directeur Cabinet' }
  });

  const doctor = await prisma.user.upsert({
    where: { email: 'doctor@clinique.com' },
    update: { password_hash: passwordHash, nom: 'Dr. Dupont' },
    create: { email: 'doctor@clinique.com', password_hash: passwordHash, role: 'DOCTOR', nom: 'Dr. Dupont' }
  });

  const staff = await prisma.user.upsert({
    where: { email: 'staff@clinique.com' },
    update: { password_hash: passwordHash, nom: 'Accueil Secrétariat' },
    create: { email: 'staff@clinique.com', password_hash: passwordHash, role: 'ASSISTANT', nom: 'Accueil Secrétariat' }
  });

  console.log('Seed users created:', admin.email, doctor.email, staff.email);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
