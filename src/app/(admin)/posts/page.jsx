import AdminAllPosts from "@/app/admin/admin-all-posts";
import UserAllPosts from "@/app/admin/user-all-posts";
import { authOptions } from "@/lib/auth";
import isAdmin from "@/utils/isAdmin";
import { getServerSession } from "next-auth";

export default async function AllPosts({ searchParams }) {
  const { page = 1, category } = await searchParams;
  // const page = (await searchParams?.page) || 1;
  // const category = (await searchParams?.category) || null
  const session = await getServerSession(authOptions);

  const adminCheck = await isAdmin(session);
  // console.log(adminCheck);

  if (!adminCheck) {
    return (
      <>
        <UserAllPosts
          page={page}
          category={category}
          userId={session?.user?.id}
        />
      </>
    );
  }
  return (
    <>
      <AdminAllPosts page={page} category={category} />
    </>
  );
}
