"use client";

import AuthForm from "@/components/authForm";

export default function SignUp() {
  return (
    <section className="w-full flex justify-center items-center h-screen">
      <AuthForm origin="signup" />
    </section>
  );
}
