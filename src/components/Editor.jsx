"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { slugify } from "slugmaster";
import ImageUpload from "./ImageUpload";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const shcema = z.object({
  title: z.string().min(10, "Title should be more than 10 Characters"),
  excerpt: z.string().min(10, "Please add more details in the excerpt"),
  category: z.string().min(1, "Please add a category"),
  keywords: z.string().min(2, "Keyword should be there for SEO Benefits"),
  status: z.enum(["DRAFT", "PUBLISHED"]),
  metaDescription: z.string().optional(),
  content: z.string().min(1, "Content is required"),
});

export default function Editor({ onSave, initialData }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(shcema),
  });

  const [content, setContent] = useState("");
  const [ogImage, setOgImage] = useState("");
  const router = useRouter();

  const handleForm = (data) => {
    try {
      const generatedSlug = initialData
        ? initialData.slug
        : slugify(data.title);
      onSave({ ...data, slug: generatedSlug, ogImage, content });
      toast(
        initialData ? "Post Updated successfully" : "Post Created successfully"
      );

      if (data.status === "PUBLISHED") {
        router.push(`/blog/${generatedSlug}`);
      } else {
        router.push("/blogs");
      }
    } catch (error) {
      console.error(error.message || "Error in saving post form");
    }
  };

  useEffect(() => {
    if (initialData) {
      setValue("title", initialData.title || "");
      setValue("excerpt", initialData.excerpt || "");
      setValue("keywords", initialData.keywords || "");
      setValue("category", initialData.catSlug || "");
      setValue("metaDescription", initialData.desc || "");
      setValue("status", initialData.status);
      setContent(initialData.content || "");
      setOgImage(initialData.thumbnail || "");
    }
  }, [initialData, setValue]);

  return (
    <section>
      <form className="space-y-4" onSubmit={handleSubmit(handleForm)}>
        <input
          {...register("title")}
          placeholder="Enter the post title"
          className="font-bold text-xl bg-zinc-600 px-3 py-2 rounded-sm outline-none w-full"
          type="text"
        />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}

        <ReactQuill
          value={content}
          onChange={setContent}
          modules={{
            toolbar: [
              [{ header: "1" }, { header: "2" }, { header: "3" }],
              [{ size: [] }],
              ["bold", "italic", "underline", "strike", "list"],
              [{ list: "ordered" }, { list: "bullet" }],
              ["link", "image", "code-block"],
            ],
          }}
          formats={[
            "header",
            "font",
            "size",
            "bold",
            "italic",
            "underline",
            "strike",
            "list",
            "bullet",
            "link",
            "image",
            "code-block",
          ]}
        />
        {errors.content && (
          <p className="text-red-500">{errors.content.message}</p>
        )}

        <input
          {...register("excerpt")}
          placeholder="Enter an Excerpt"
          className="font-bold text-xl bg-zinc-600 px-3 py-2 rounded-sm outline-none w-full"
          type="text"
        />
        {errors.excerpt && (
          <p className="text-red-500">{errors.excerpt.message}</p>
        )}

        <input
          {...register("category")}
          placeholder="Enter a Category"
          className="font-bold text-xl bg-zinc-600 px-3 py-2 rounded-sm outline-none w-full"
          type="text"
        />
        {errors.category && (
          <p className="text-red-500">{errors.category.message}</p>
        )}

        <h2 className="text-xl font-bold">SEO Data</h2>

        <ImageUpload returnImage={setOgImage} preLoadedImage={ogImage} />

        <input
          {...register("keywords")}
          placeholder="Enter keywords"
          className="font-bold text-xl bg-zinc-600 px-3 py-2 rounded-sm outline-none w-full"
          type="text"
        />
        {errors.keywords && (
          <p className="text-red-500">{errors.keywords.message}</p>
        )}

        <input
          {...register("metaDescription")}
          placeholder="Enter Meta Description"
          className="font-bold text-xl bg-zinc-600 px-3 py-2 rounded-sm outline-none w-full"
          type="text"
        />
        {errors.metaDescription && (
          <p className="text-red-500">{errors.metaDescription.message}</p>
        )}

        <div className="flex gap-3">
          <select
            {...register("status")}
            className="font-bold text-lg bg-zinc-600 px-3 py-1 rounded-sm outline-none"
          >
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Publish</option>
          </select>
          {errors.status && (
            <p className="text-red-500">{errors.status.message}</p>
          )}

          <button
            className="bg-zinc-800 px-4 py-2 rounded-md cursor-pointer"
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
    </section>
  );
}
