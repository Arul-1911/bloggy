import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";

async function fetchAllUsers() {
  const res = await prisma.user.findMany();

  return res;
}

export default async function AdminAllUsers() {
  const users = await fetchAllUsers();
  return (
    <section className="p-8 flex flex-col gap-4">
      {users?.map((data) => (
        <Link href={`/user/${data.username}`}>
          <div className="flex gap-3 p-3 bg-gray-500/50 rounded-lg">
            <Image
              src={data.image}
              alt={data.name}
              height={50}
              width={50}
              className="rounded-full size-20"
            />
            <div className="space-y-1">
              <h2 className="font-semibold">{data.name}</h2>
              <p className="text-gray-300">{data.email}</p>
              <p className="text-xs text-gray-300">@{data.username}</p>
            </div>
          </div>
        </Link>
      ))}
    </section>
  );
}
