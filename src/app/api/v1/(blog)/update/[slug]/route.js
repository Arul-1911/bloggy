import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import isAdmin from "@/utils/isAdmin";
import { getServerSession } from "next-auth/next";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { slug } = await params;

  const body = await request.json();
  const {
    title,
    ogImage,
    content,
    excerpt,
    category,
    keywords,
    metaDescription,
    status,
  } = body;

  const session = await getServerSession(authOptions);
  const Admin = await isAdmin(session);
  console.log("session in the put method update");

  const post = await prisma.post.findUnique({
    where: {
      slug,
    },
    select: {
      authorId: true,
    },
  });

  if (!post) {
    return NextResponse.json({ message: "Post not found!" }, { status: 404 });
  }

  const isAuthor = post.authorId === session.user.id;

  if (!isAuthor && !Admin) {
    return NextResponse.json(
      { message: "Operation Not permitted!" },
      { status: 403 }
    );
  }

  try {
    const updatedPost = await prisma.post.update({
      where: {
        slug,
      },
      data: {
        title,
        content,
        catSlug: category,
        thumbnail: ogImage || null,
        desc: metaDescription || null,
        excerpt: excerpt || null,
        keywords: keywords || null,
        status,
      },
    });

    revalidateTag(slug);

    return NextResponse.json(updatedPost, { status: 200 });
  } catch (error) {
    console.error(error.message);
    return NextResponse.json(
      { message: "Failed to update post" },
      { status: 500 }
    );
  }
}

export async function GET(request, { params }) {
  const { slug } = await params;

  const session = await getServerSession(authOptions);
  const Admin = await isAdmin(session);

  const post = await prisma.post.findUnique({
    where: { slug },
  });

  if (!post) {
    return NextResponse.json({ message: "Post not found!" }, { status: 404 });
  }

  const isAuthor = session.user.id === post.authorId;

  if (!isAuthor && !Admin) {
    return NextResponse.json(
      { message: "Operation not prmitted" },
      { status: 403 }
    );
  }

  return NextResponse.json(post, { status: 200 });
}
