"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { Cross } from "lucide-react";

export default function CategoryFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [category, setCategory] = useState(searchParams.get("category") || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    params.set("category", category);
    router.push(`/posts?${params.toString()}`);
  };

  const handleClearFilter = (e) => {
    e.preventDefault();
    router.push("/posts");
    setCategory("");
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex gap-3">
        <Input
          className="w-sm"
          type="text"
          name=""
          id=""
          placeholder="Filter by category..."
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <Button type="submit">Filter</Button>
        {category && <Button onClick={handleClearFilter}>Clear </Button>}
      </form>
    </>
  );
}
