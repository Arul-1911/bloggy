"use client";

import { Icons } from "@/components/Icons";
import { Anvil } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

const AuthForm = ({ origin }) => {
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
    <>
      <div className="w-full bg-zinc-800 sm:w-1/2 md:w-1/5 mx-4 p-4 rounded-lg flex flex-col items-center gap-4">
        <Anvil className="size-16 text-gray-300" />
        <p className="text-sm text-center text-gray-200">
          {origin === "signup"
            ? " Welcome, by continueing with Bloggy sign up, you'll be a Blogger"
            : "Welcome Back !"}
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
              {origin === "signup" ? "Sign Up" : "Sign In"}
            </>
          )}
        </button>
        {origin === "signup" ? (
          <p className="text-sm text-gray-500">
            already a user?{" "}
            <Link href="/sign-in" className="underline">
              Sign In
            </Link>
          </p>
        ) : (
          <p className="text-sm text-gray-500">
            New to Bloggy ?{" "}
            <Link href="/sign-up" className="underline">
              Sign up
            </Link>
          </p>
        )}
      </div>
    </>
  );
};

export default AuthForm;
