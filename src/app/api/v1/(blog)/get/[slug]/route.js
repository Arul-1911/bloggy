import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { slug } = await params;

  const post = await prisma.post.findUnique({
    where: {
      slug: slug,
      status: "PUBLISHED",
    },
    include: {
      author: {
        select: {
          name: true,
          username: true,
          image: true,
        },
      },
    },
  });

  console.log(post, "single post details");

  if (!post) {
    return NextResponse.json({ message: "Post not found!" }, { status: 404 });
  }

  return NextResponse.json(post, {
    status: 200,
  });
}
