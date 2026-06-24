import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // The prompt says /api/inspector/[taskId], assumingtaskId is is passed as id
    const taskId = id;

    const task = await prisma.task.findUnique({
      where: { id: taskId },
      include: {
        project: true,
        messages: {
          orderBy: {
            createdAt: "desc",
          },
          take: 5,
        },
      },
    });

    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return NextResponse.json(task);
  } catch (error) {
    console.error("Error fetching task details:", error);
    return NextResponse.json({ error: "Failed to fetch task details" }, { status: 500 });
  }
}
