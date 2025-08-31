"use client";

import { Button } from "@/components/ui/button";
import dateFormat from "@/utils/dateFormat";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { Router } from "next/router";
import { useState } from "react";

const EditableBlogCards = ({ post }) => {
  const [currentStatus, setCurrentStatus] = useState(post.status);
  const router = useRouter();

  const handleDelete = async (id) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}api/v1/delete/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (res.ok) {
      setCurrentStatus("DELETED");
      router.refresh();
    }
  };

  const handleConvertToDraft = async (id) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/v1/state`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, status: "DRAFT" }),
    });
    if (res.ok) {
      setCurrentStatus("DRAFT");
      router.refresh();
    }
  };

  const handlePublish = async (id) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/v1/state`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, status: "PUBLISHED" }),
    });
    if (res.ok) {
      setCurrentStatus("PUBLISHED");
      router.refresh();
    }
  };

  return (
    <div className="flex">
      <div className="bg-gray-600/20 p-3 rounded-lg w-full flex flex-col gap-3 sm:flex-row sm:justify-between md:flex-row">
        <div>
          <h2 className="font-bold text-lg">{post.title}</h2>
          <p className="text-sm text-gray-300">
            {post?.excerpt?.substring(0, 14)}...
          </p>
          <span className="text-xs text-gray-400">
            {dateFormat(post.createdAt)}
          </span>
        </div>
        <div className="flex gap-3 items-center space-x-2">
          {currentStatus === "PUBLISHED" ? (
            <Button
              variant="outline"
              onClick={() => handleConvertToDraft(post.id)}
            >
              Convert to Draft
            </Button>
          ) : (
            <Button onClick={() => handlePublish(post.id)}>Publish</Button>
          )}
          {currentStatus === "PUBLISHED" && (
            <Button onClick={() => router.push(`/blog/${post.slug}`)}>
              View
            </Button>
          )}
          <Button onClick={() => router.push(`/draft/${post.slug}`)}>
            Edit
          </Button>
          <Trash
            size={18}
            className="text-gray-400 cursor-pointer"
            onClick={() => handleDelete(post.id)}
          />
        </div>
      </div>
    </div>
  );
};

export default EditableBlogCards;
