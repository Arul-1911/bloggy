import Pagination from "@/components/pagination";
import { getAllBlogs } from "../actions/getBlogs";
import EditableBlogCards from "./EditableBlogCards";
import { config } from "../../../static/config";

export default async function AdminAllPosts({ page, category }) {
  const { posts, count } = await getAllBlogs({ page, category });

  return (
    <section className="p-8 flex flex-col gap-4">
      <h2>Manage all the blogs</h2>

      {posts?.map((post) => {
        return <EditableBlogCards key={post.id} post={post} />;
      })}
      <Pagination
        currentPage={page}
        totalItems={count}
        perPage={config.perPage}
        className="fixed bottom-8  right-5"
      />
    </section>
  );
}
