import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import isAdmin from "@/utils/isAdmin";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
  const { id } = await params;

  const session = await getServerSession(authOptions);
  const adminCheck = await isAdmin(session);

  if (!adminCheck) {
    return NextResponse.json({ message: "Not Authorised" }, { status: 400 });
  }

  const fetchPost = await prisma.post.findUnique({
    where: { id },
  });

  if (!fetchPost) {
    return NextResponse.json({ message: "Post Not Found!" }, { status: 404 });
  }

  const isAuthor = fetchPost.authorId === session.user.id;

  if (adminCheck || isAuthor) {
    const deletePost = await prisma.post.delete({
      where: { id },
    });
    return NextResponse.json({ message: "Post deleted" }, { status: 200 });
  }

  return NextResponse.json(
    { message: "Something went wrong!" },
    { status: 500 }
  );
}
