import Image from "next/image";
import Link from "next/link";

const fetchAllBlogs = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/v1/get`);

  const data = await res.json();

  return data;
};

export default async function Blogs() {
  const blogConfig = await fetchAllBlogs();

  console.log(blogConfig, "blog config data");

  return (
    <section className="grid gap-3 grid-cols-2 md:grid-cols-3 p-8">
      {blogConfig?.map((blog, index) => {
        return (
          <BlogCard
            title={blog.title}
            excerpt={blog.excerpt}
            image={blog.thumbnail || ""}
            url={blog.slug}
            key={blog.id}
          />
        );
      })}
    </section>
  );
}

const BlogCard = ({ title, excerpt, image, url }) => {
  return (
    <div className="bg-gray-600/20 rounded-lg border flex flex-col p-1 gap-1 hover:scale-[1.05] transition-all delay-50 duration-300">
      <Image
        className="w-full rounded-md"
        src={image}
        alt={title}
        width={300}
        height={170}
      />
      <h2 className="text-xl font-bold text-gray-200">{title}</h2>
      <p className="text-sm text-gray-400">{excerpt}</p>
      <Link
        className="bg-zinc-600/70 py-2 px-4 rounded w-fit text-xs"
        href={`/blog/${url}`}
      >
        Read More
      </Link>
    </div>
  );
};
