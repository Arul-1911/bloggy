"use client";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

const Signout = () => {
  return (
    <div
      onClick={() => signOut({ callbackUrl: "/sign-in" })}
      className="flex items-center gap-2"
    >
      <LogOut className="w-4" />
      Signout
    </div>
  );
};

export default Signout;
