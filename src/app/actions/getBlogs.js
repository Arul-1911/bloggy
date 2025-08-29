import { prisma } from "@/lib/prisma";
import { config } from "../../../static/config";

export async function getAllBlogs({ page, category }) {
  const postsToShow = config?.perPage;
  const query = {
    take: postsToShow,
    skip: postsToShow * (page - 1),
    where: {
      ...(category && {
        catSlug: {
          equals: category,
          mode: "insensitive",
        },
      }),
    },
    orderBy: {
      createdAt: "desc",
    },
  };

  const [posts, count] = await prisma.$transaction([
    prisma.post.findMany(query),
    prisma.post.count({
      where: {
        ...(category && {
          catSlug: category,
        }),
      },
    }),
  ]);

  return {
    posts,
    count,
  };
}

export async function getAllUserBlogs({ page, category, userId }) {
  // if (!userId) return console.log("user id is missing");
  const postsToShow = config?.perPage;
  const query = {
    take: postsToShow,
    skip: postsToShow * (page - 1),
    where: {
      authorId: userId,
      ...(category && {
        catSlug: {
          equals: category,
          mode: "insensitive",
        },
      }),
    },
    orderBy: {
      createdAt: "desc",
    },
  };

  const [posts, count] = await prisma.$transaction([
    prisma.post.findMany(query),
    prisma.post.count({
      where: {
        authorId: userId,
        ...(category && {
          catSlug: category,
        }),
      },
    }),
  ]);

  return {
    posts,
    count,
  };
}
