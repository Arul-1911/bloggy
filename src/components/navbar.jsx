import { Anvil } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getAuthSession } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Image from "next/image";
import Signout from "./Signout";

export default async function Navbar() {
  const session = await getAuthSession();

  return (
    <div className="w-full flex justify-between items-center px-8 h-12">
      <Link href={"/"} className="flex gap-2">
        <Anvil /> <span className="font-extrabold">Bloggy</span>
      </Link>
      {session ? (
        <>
          <UserModalComponent user={session?.user} />
        </>
      ) : (
        <Link href="sign-in">Sign in</Link>
      )}
    </div>
  );
}

const UserModalComponent = ({ user }) => {
  // console.log(user);
  return (
    <DropdownMenu className="bg-gray-100">
      <DropdownMenuTrigger>
        <Image
          src={user?.image}
          width={35}
          height={40}
          alt={`${user.name}'s image `}
          className="rounded-full border-2 border-[greenyellow]"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>hi, {user.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href={`/profile/${user.name}`}>Go to profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Signout />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// export const getAuthsession = () => getServerSession(authOptions);
