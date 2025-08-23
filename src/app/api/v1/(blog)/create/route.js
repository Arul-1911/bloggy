import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ message: "UnAuthorized" }, { status: 401 });
  }

  const body = await request.json();
  const {
    title,
    slug,
    ogImage,
    content,
    excerpt,
    category,
    keywords,
    metaDescription,
    status,
  } = body;

  // console.log(title, slug, ogImage, content, excerpt, "content from the body");

  if (!title || !slug || !content || !category || !session.user.id) {
    return NextResponse.json({ message: "Missing fields" }, { status: 400 });
  }

  const statusOfPost = status || "DRAFT";

  try {
    let categoryCheck = await prisma.category.findUnique({
      where: {
        slug: category,
      },
    });

    if (!categoryCheck) {
      categoryCheck = await prisma.category.create({
        data: {
          title:
            category.charAt(0).toUpperCase() + category.slice(1).toLowerCase(),
          slug: category,
        },
      });
    }

    const post = await prisma.post.create({
      data: {
        title,
        content,
        slug,
        catSlug: categoryCheck.slug,
        thumbnail: ogImage || null,
        desc: metaDescription || null,
        excerpt: excerpt || null,
        keywords: keywords || null,
        authorId: session.user.id,
        status: statusOfPost,
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Could not save post" },
      { status: 500 }
    );
  }
}
