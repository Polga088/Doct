import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const projectId = searchParams.get("projectId");
  const taskId = searchParams.get("taskId");

  try {
    const where: any = {};
    if (projectId || taskId) {
      where.OR = [
        { projectId: projectId || undefined },
        { taskId: taskId || undefined },
      ];
    }

    const messages = await prisma.message.findMany({
      where,
      include: {
        author: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return NextResponse.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { content, authorId, projectId, taskId } = body;

    const newMessage = await prisma.message.create({
      data: {
        content,
        authorId,
        projectId: projectId || null,
        taskId: taskId || null,
      },
      include: {
        author: true,
      },
    });

    return NextResponse.json(newMessage);
  } catch (error) {
    console.error("Error creating message:", error);
    return NextResponse.json({ error: "Failed to create message" }, { status: 500 });
  }
}
