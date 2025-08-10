import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import { Layers, Pencil, Zap } from "lucide-react";
import Link from "next/link";

export default function Landing() {
  return (
    <main className="w-full">
      <section className="flex justify-center w-full h-[50vh] sm:[70vh]">
        <div className="flex flex-col gap-3 justify-center items-center space-y-4">
          <div className="flex flex-col gap-2 justify-center">
            <h1
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl
        lg:text-6xl"
            >
              Manage your content with ease
            </h1>
            <p className="text-gray-400 max-w-[700px] m-auto">
              Streamline your content workflow, publish with confidence
            </p>
          </div>
          <div className="flex gap-4">
            {/* <Button variant={"default"} className="bg-gray-200" asChild> */}
            <Link href="/sign-in">Try it out!</Link>
            {/* </Button> */}
            <Button variant={"secondary"}>Learn More</Button>
          </div>
        </div>
      </section>
      <section className="w-full min-h-screen sm:min-h-[80dvh] bg-gray-800/10 flex justify-center items-center px-4">
        <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-3">
          <span className="flex flex-col items-center gap-2">
            <Icons.BlogcustomIcon className="text-white h-13 w-13" size={50} />
            <h3 className="text-xl font-bold text-gray-100">
              Intuitive Editor
            </h3>
            <p className="text-gray-400 text-center w-[70%]">
              Create and edit content with user friendly interface{" "}
            </p>
          </span>
          <span className="flex flex-col items-center gap-2">
            <Layers size={50} />
            <h3 className="text-xl font-bold text-gray-100">Flexible Tools</h3>
            <p className="text-gray-400 text-center w-[70%]">
              Create and edit content with user friendly interface{" "}
            </p>
          </span>
          <span className="flex flex-col items-center gap-2">
            <Zap size={50} />
            <h3 className="text-xl font-bold text-gray-100">Blazing fast</h3>
            <p className="text-gray-400 text-center w-[70%]">
              Create and edit content with user friendly interface{" "}
            </p>
          </span>
        </div>
      </section>
      <section className="w-full h-[60vh] sm:h-[50vh] flex flex-col justify-center items-left">
        <div className="max-w-[50%] mx-auto space-y-3">
          <h4 className="font-bold text-2xl">
            Ready to Transform your Content Journey
          </h4>
          <p className="text-sm text-gray-400">
            Join thousands of creators like you who choose geeks
          </p>
          <div className="flex gap-3">
            <input
              type="text"
              className="bg-zinc-900 focus:outline-none rounded-md px-2 py-[7px] text-sm text-gray-400"
              placeholder="Enter your email"
            />
            <Button variant="outline">Submit</Button>
          </div>
        </div>
      </section>
    </main>
  );
}
