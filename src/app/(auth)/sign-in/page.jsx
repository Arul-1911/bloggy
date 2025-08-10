"use client";

import { Icons } from "@/components/Icons";
import { Anvil } from "lucide-react";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";

export default function SignIn() {
  const [loading, setLoading] = useState(false);
  const onSignin = async () => {
    setLoading(true);
    try {
      await signIn("google");
    } catch (error) {
      console.error(error.message);
      toast("Something went wrong", {
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="w-full flex justify-center items-center h-screen">
      <div className="w-full bg-zinc-800 sm:w-1/2 md:w-1/5 mx-4 p-4 rounded-lg flex flex-col items-center gap-4">
        <Anvil className="size-16 text-gray-300" />
        <p className="text-sm text-center text-gray-200">
          Welcome, by continueing with Bloggy sign in, you'll be a Blogger
        </p>
        <button
          onClick={onSignin}
          className="flex gap-2 items-center bg-gray-500/50 px-10 py-1 rounded font-bold text-sm hover:bg-gray-500/30 transition-colors duration-200 cursor-pointer"
        >
          {loading ? (
            "loading..."
          ) : (
            <>
              <Icons.GoogleIcon className="size-7" />
              Sign In
            </>
          )}
        </button>
      </div>
    </section>
  );
}
