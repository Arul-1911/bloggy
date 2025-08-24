"use client";
import Editor from "@/components/Editor";
import { use, useEffect, useState } from "react";
import { toast } from "sonner";

export default function PreviousDraft({ params }) {
  const { slug } = use(params);
  const [post, setPost] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}api/v1/update/${slug}`
      );

      if (!res.ok) {
        if (res.status === 403) {
          toast("You are not allowed to edit this post", {
            variant: "destructive",
          });
        } else {
          toast("Unable to load post", {
            variant: "destructive",
          });
        }
      }
      const data = await res.json();
      setPost(data);
    };

    fetchPost();
  }, [slug]);

  console.log(post, "post data from edit");
  const savePost = async ({
    title,
    slug,
    ogImage,
    content,
    excerpt,
    keywords,
    metaDescription,
    status,
  }) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}api/v1/update/${slug}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          ogImage,
          content,
          excerpt,
          keywords,
          metaDescription,
          status,
        }),
      }
    );

    if (!res.ok) {
      throw new Error("Post updating failed");
    }
  };

  if (!post) return <>loading...</>;
  return (
    <main className="p-8">
      <h1 className="font-bold text-2xl pb-3">Edit this post</h1>
      <Editor onSave={savePost} initialData={post} />
    </main>
  );
}
