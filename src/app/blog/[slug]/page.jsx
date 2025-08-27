import dateFormat from "@/utils/dateFormat";
import { Calendar, Edit } from "lucide-react";
import Image from "next/image";
import "../../.././styles/blog.css";
import Link from "next/link";
import { notFound } from "next/navigation";

const fetchSingleBlog = async (slug) => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}api/v1/get/${slug}`,

    {
      next: {
        tags: [slug],
      },
    }
  );

  if (data.status === 404) {
    notFound();
  }
  const res = await data.json();

  return res;
};

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const data = await fetchSingleBlog(slug);

  return {
    title: data.title,
    description: data.excerpt,
    openGraph: {
      images: [data.thumbnail],
    },
  };
}

export default async function SingleBlog({ params }) {
  const { slug } = await params;

  const data = await fetchSingleBlog(slug);

  return (
    <section>
      <div className="flex justify-end my-10 mx-15">
        <Link href={`/draft/${slug}`}>
          <Edit />
        </Link>
      </div>
      <div className="flex flex-col gap-4 items-center justify-center">
        {data.thumbnail && (
          <Image
            src={data.thumbnail}
            height={250}
            width={500}
            alt={data.title}
            className="rounded border sm:w-[80%] md:w-[700px] "
          />
        )}
        <h1 className="text-2xl md:text-4xl font-bold">{data.title}</h1>
        <div className="meta-of-a-blog space-y-2">
          <div className="flex gap-2 items-center">
            <Calendar className="text-gray-400 w-4 h-4" />
            <p className="text-gray-400 text-xs">
              Created On: {dateFormat(data.createdAt)}
            </p>
          </div>
          <div className="text-xs flex items-center gap-2">
            <p>Category:</p>
            <p className="badge border border-gray-700 bg-gray-600/30 w-fit px-2 py-1 rounded">
              {data.category}
            </p>
          </div>
          <div className="text-xs flex items-center gap-2">
            <p>Tags:</p>
            {data.keywords && (
              <p>
                {data.keywords.split(",").map((tag) => (
                  <p className="badge bg-gray-600/30">{tag}</p>
                ))}
              </p>
            )}
          </div>
        </div>
        <div
          className="blogContent text-sm w-[90%] md:w-2/3  text-gray-300"
          dangerouslySetInnerHTML={{ __html: data.content }}
        ></div>
      </div>
    </section>
  );
}
