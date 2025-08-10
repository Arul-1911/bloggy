import Image from "next/image";
import Link from "next/link";

export default function Blogs() {
  const blogConfig = [
    {
      id: 1,
      title: "React vs NextJs",
      excerpt: "Next js is the ultimate React Framework",
      image: "https://optymize.io/files/wp-content/uploads/2022/02/react.png",
      url: "/demo-slug",
    },
    {
      id: 2,
      title: "Dreams to be a remote developer",
      excerpt: "Working as Remote dev",
      image: "https://blog.monitask.com/wp-content/uploads/2021/06/94.jpg",
      url: "/slug",
    },
    {
      id: 3,
      title: "Became a backend dev",
      excerpt: "Golang Backend Developer",
      image:
        "https://mobisoftinfotech.com/resources/wp-content/uploads/2022/02/og-hire-golang-developers.png",
      url: "/slug",
    },
  ];
  return (
    <section className="grid gap-3 grid-cols-2 md:grid-cols-3 p-8">
      {blogConfig?.map((blog, index) => {
        return (
          <BlogCard
            title={blog.title}
            excerpt={blog.excerpt}
            image={blog.image}
            url={blog.url}
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
        href={`/blog${url}`}
      >
        Read More
      </Link>
    </div>
  );
};
