import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const tasks = await prisma.task.findMany({
      include: {
        project: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return NextResponse.json(tasks);
  } catch (error) {
    console.error("Error fetching flows:", error);
    return NextResponse.json({ error: "Failed to fetch flows" }, { status: 500 });
  }
}
