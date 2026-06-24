import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.message.deleteMany();
  await prisma.task.deleteMany();
  await prisma.project.deleteMany();
  await prisma.user.deleteMany();

  // Create Users
  const userMe = await prisma.user.create({
    data: {
      id: "u1",
      name: "Soufiane B.",
      avatarInitials: "SB",
      avatarColor: "bg-primary",
    },
  });

  const userSarah = await prisma.user.create({
    data: {
      id: "u2",
      name: "Sarah Chen",
      avatarInitials: "SC",
      avatarColor: "bg-blue-500",
    },
  });

  const userMarc = await prisma.user.create({
    data: {
      id: "u3",
      name: "Marc Dupont",
      avatarInitials: "MD",
      avatarColor: "bg-green-500",
    },
  });

  // Create Project
  const project = await prisma.project.create({
    data: {
      name: "Neural Onboarding Cluster",
      status: "KANBAN",
      totalBudget: 15000,
      spent: 4500,
      currency: "USD",
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    },
  });

  // Create Tasks (Neural Cards)
  const task2 = await prisma.task.create({
    data: {
      title: "Migrate CRM Data to Postgres",
      assignee: "Sarah Chen",
      status: "in_progress",
      projectId: project.id,
      syncProgress: 45,
    },
  });

  // Create Messages linked to users
  await prisma.message.create({
    data: {
      content: "Hey team, the onboarding flow metrics are showing a drop-off at step 3. Can someone pull the logs?",
      authorId: userSarah.id,
      taskId: task2.id,
    },
  });

  await prisma.message.create({
    data: {
      content: "I'm looking into it now. It looks like the external API timeout might be too aggressive.",
      authorId: userMarc.id,
      taskId: task2.id,
    },
  });

  console.log("Database seeded successfully with Users!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
