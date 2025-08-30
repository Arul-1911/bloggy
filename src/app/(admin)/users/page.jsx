import AdminAllUsers from "@/app/admin/AllUsers";
import { authOptions } from "@/lib/auth";
import isAdmin from "@/utils/isAdmin";
import { getServerSession } from "next-auth";

const AllUsersPage = async () => {
  const session = await getServerSession(authOptions);
  const adminCheck = await isAdmin(session);

  if (!session) {
    return (
      <section className="w-full h-screen flex justify-center items-center">
        <p>You are not authenticated</p>
      </section>
    );
  }

  if (!adminCheck) {
    return (
      <section className="w-full h-screen flex justify-center items-center">
        <p>You are not authorised</p>
      </section>
    );
  }

  return (
    <>
      <div>
        <AdminAllUsers />
      </div>
    </>
  );
};

export default AllUsersPage;
