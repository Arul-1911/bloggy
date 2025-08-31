"use client";

import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${
          process.env.NEXT_PUBLIC_BASE_URL
        }api/v1/search?query=${encodeURIComponent(query)}`
      );

      if (!res.ok) {
        if (res.status === 404) {
          toast("No Posts found!");
          return setError("No Posts found!");
        }
      } else {
        setError("");
      }

      const found = await res.json();
      setResults(found);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query) {
      const timer = setTimeout(() => {
        fetchPosts();
      }, 700);

      return () => clearTimeout(timer);
    }
  }, [query]);

  if (loading) {
    return (
      <main className="p-8">
        <div className="w-full min-h-screen flex flex-col gap-3">
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className=""
          />
          <p>Loading...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="p-8">
      <div className="w-full min-h-screen flex flex-col gap-3">
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className=""
          placeholder="Search for a post!"
        />
        <ul className="flex flex-col gap-3 justify-center mt-5">
          {results?.map((post) => (
            <li
              key={post.title}
              className="bg-gray-500/10 p-3 rounded-md cursor-pointer hover:bg-gray-600/20 hover:scale-[1.03] transition-all duration-200 "
            >
              <Link href={`/blog/${post.slug}`}>
                <h3 className="text-gray-100 text-lg font-bold">
                  {post.title}
                </h3>
                <p className="text-gray-300 text-sm">
                  {post?.excerpt?.substring(0, 30)}...
                </p>
                <p className="flex gap-2 items-center my-1 text-sm">
                  Written by:{" "}
                  <span className="text-gray-200">{post?.author?.name}</span>{" "}
                  <span>
                    {
                      <Image
                        src={post?.author?.image}
                        alt={post?.author?.name}
                        height={20}
                        width={20}
                        className="rounded-full"
                      />
                    }
                  </span>
                </p>
              </Link>
            </li>
          ))}
        </ul>
        {query && error}
      </div>
    </main>
  );
};

export default SearchPage;
