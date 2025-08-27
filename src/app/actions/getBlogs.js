import { prisma } from "@/lib/prisma";
import { config } from "../../../static/config";
import { skip } from "@prisma/client/runtime/library";

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
