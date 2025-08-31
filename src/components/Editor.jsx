"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { slugify } from "slugmaster";
import ImageUpload from "./ImageUpload";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import AIContent from "@/utils/ai-content";
import { Sparkles } from "lucide-react";

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
  const [selectionExists, setSelectionExists] = useState(false);
  const router = useRouter();

  const ideaRef = useRef(null);
  const closeDialogRef = useRef(null);
  const quillRef = useRef(null);

  let customInstructions = "Generate content with proper facts";
  let contentGen = true;

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

  const handleGenerateContent = async () => {
    try {
      const res = await AIContent({
        text: ideaRef.current.value,
        customInstructions,
        contentGen,
      });
      // console.log(res, "response from AI in hadler func");

      setContent(res);
    } catch (error) {
      console.error("failed to call handlegenrate function");
    } finally {
      closeDialogRef.current?.click();
    }
  };

  const handleSelection = () => {
    const selection = quillRef?.current?.getEditor()?.getSelection();
    setSelectionExists(selection && selection?.length > 0);
  };

  const handlePhrase = async () => {
    try {
      const selection = quillRef?.current?.getEditor()?.getSelection();
      if (selection && selection?.length > 0) {
        const selectedText = quillRef?.current
          ?.getEditor()
          ?.getText(selection?.index, selection?.length);
        const res = await AIContent({
          text: selectedText,
          customInstructions: "re-write this text",
          contentGen: false,
        });
        quillRef?.current
          ?.getEditor()
          ?.deleteText(selection.index, selection.length);
        quillRef?.current?.getEditor()?.insertText(selection.index, res);
        setSelectionExists(false);
      }
    } catch (error) {
      console.error(error.message);
      toast("Oops !, something went wrong in rewriting the text");
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

  useEffect(() => {
    setValue("content", content);
  }, [content, setValue]);

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
          ref={quillRef}
          value={content}
          onChange={setContent}
          onChangeSelection={handleSelection}
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
            "link",
            "image",
            "code-block",
          ]}
        />
        {errors.content && (
          <p className="text-red-500">{errors.content.message}</p>
        )}

        <Dialog>
          <DialogTrigger className="flex gap-2 items-center border p-2 rounded-md">
            Generate content using AI <Sparkles />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogDescription>
                Give a brief on the type of content you want to generate
              </DialogDescription>
              <textarea
                ref={ideaRef}
                rows={10}
                className="p-2 rounded border-2 m-2"
              />
            </DialogHeader>
            <DialogFooter>
              <Button onClick={handleGenerateContent}>Generate</Button>
              <DialogClose asChild ref={closeDialogRef}>
                <Button variant="ghost">Close</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>

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
      {selectionExists && (
        <Button
          variant=""
          className="fixed bottom-5 right-10"
          onClick={handlePhrase}
        >
          Rewrite using AI <Sparkles />
        </Button>
      )}
    </section>
  );
}
