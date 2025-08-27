"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Indent } from "lucide-react";

const Pagination = ({ currentPage, totalItems, perPage, ...props }) => {
  currentPage = Number(currentPage);
  const router = useRouter();
  const totalPages = Math.ceil(totalItems / perPage);

  const handlePageChange = (page) => {
    if (page < 1 || page > Number(totalPages)) return;
    router.push(`?page=${page}`);
  };
  return (
    <div {...props}>
      <div className="flex gap-3 justify-end my-5 items-center">
        <Button
          variant="outline"
          disabled={currentPage === 1}
          className={`${currentPage === 1 ? "cursor-none" : ""}`}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Prev
        </Button>
        {Array.from({ length: totalPages }, (_, index) => {
          return (
            <Button
              className={`${
                currentPage === index + 1 ? "bg-gray-600/90" : "bg-gray-100"
              }`}
              onClick={() => handlePageChange(index + 1)}
              disabled={currentPage === index + 1}
            >
              {index + 1}
            </Button>
          );
        })}
        <Button
          variant="outline"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
