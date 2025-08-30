import getSingleUser from "@/app/actions/getSingleUser";
import dateFormat from "@/utils/dateFormat";
import { Heading2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function SingleUser({ params }) {
  const { username } = await params;
  const data = await getSingleUser(username);
  if (!data) return notFound();
  return (
    <>
      <div>
        <UserProfile user={data} />
        <UserPosts posts={data.post} />
      </div>
    </>
  );
}

const UserProfile = ({ user }) => {
  return (
    <div className="text-center flex flex-col justify-center items-center gap-1">
      <Image
        src={user?.image}
        alt={user?.name}
        height={80}
        width={80}
        className="rounded-full border-2 border-[greenyellow]"
      />
      <h1 className="text-xl font-bold">{user?.name}</h1>
      <p className="text-gray-300">@{user?.username}</p>
      <p className="text-gray-400 text-sm">
        Joined on: {dateFormat(user?.createdAt)}
      </p>
    </div>
  );
};

const UserPosts = ({ posts }) => {
  return (
    <div className="flex flex-col max-w-4xl mx-auto gap-3 p-4">
      <h1 className="text-start text-xl font-bold">User posts </h1>
      {posts.length === 0 && <p>No posts found !</p>}
      {posts?.map((post, index) => (
        <Link
          href={`/blog/${post.slug}`}
          className="flex gap-5 bg-zinc-800 rounded-md items-center px-2 py-2 hover:bg-zinc-800/80 transition-all duration-200 hover:scale-[1.03]"
        >
          <Image
            src={post?.thumbnail}
            alt={post.title}
            height={80}
            width={150}
          />
          <div>
            <h3 className="text-gray-200 text-lg font-bold">{post.title}</h3>
            <p className="text-gray-400">{post.excerpt?.substring(0, 30)}...</p>
          </div>
        </Link>
      ))}
    </div>
  );
};
