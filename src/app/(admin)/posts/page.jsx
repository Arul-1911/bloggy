import AdminAllPosts from "@/app/admin/admin-all-posts";
import { authOptions } from "@/lib/auth";
import isAdmin from "@/utils/isAdmin";
import { getServerSession } from "next-auth";

export default async function AllPosts({ searchParams }) {
  const page = (await searchParams?.page) || 1;
  const category = (await searchParams?.category) || null;
  const session = await getServerSession(authOptions);

  const adminCheck = await isAdmin(session);
  //   console.log(adminCheck)

  if (!adminCheck) {
    return <>Not Accessible</>;
  }
  return (
    <>
      <AdminAllPosts page={page} category={category} />
      {/* <div>All posts should be here</div> */}
    </>
  );
}
