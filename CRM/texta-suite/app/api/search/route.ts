import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");

  if (!q || q.length < 2) {
    return NextResponse.json({ projects: [], tasks: [], users: [] });
  }

  try {
    const [projects, tasks, users] = await Promise.all([
      prisma.project.findMany({
        where: {
          name: { contains: q },
        },
        take: 5,
      }),
      prisma.task.findMany({
        where: {
          title: { contains: q },
        },
        include: { project: true },
        take: 5,
      }),
      prisma.user.findMany({
        where: {
          name: { contains: q },
        },
        take: 5,
      }),
    ]);

    return NextResponse.json({ projects, tasks, users });
  } catch (error) {
    console.error("Search API Error:", error);
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}
