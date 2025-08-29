import Pagination from "@/components/pagination";
import { getAllUserBlogs } from "../actions/getBlogs";
import EditableBlogCards from "./EditableBlogCards";
import { config } from "../../../static/config";
import CategoryFilter from "@/components/category-filter";

export default async function UserAllPosts({ page, category }) {
  const { posts, count } = await getAllUserBlogs({ page, category });

  // console.log(posts, "posts");

  return (
    <section className="p-8 flex flex-col gap-4">
      <h2>Manage all the blogs</h2>

      <CategoryFilter />

      {posts?.map((post) => {
        return <EditableBlogCards key={post.id} post={post} />;
      })}
      <Pagination
        currentPage={page}
        totalItems={count}
        perPage={config.perPage}
        className="fixed bottom-2 right-140"
      />
    </section>
  );
}
