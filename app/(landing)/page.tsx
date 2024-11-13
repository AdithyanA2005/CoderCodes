import Link from "next/link";
import { Button } from "@/components/ui/button";
import { signInAction } from "@/lib/actions";
import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();

  return (
    <main className="flex h-screen w-full flex-col items-center justify-center gap-5">
      <h1 className="space-y-5 text-center text-4xl font-semibold md:text-5xl">
        <span className="block scale-125 bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
          CoderCodes
        </span>
        <span className="block"> Free Coding Lab Solution</span>
      </h1>
      <p className="text-center text-lg md:text-xl">
        Get started by seeing the collections of curated problems and solutions for different labs.
      </p>

      {session ? (
        <Link href={"/collections"} className="relative mt-5 p-[3px]">
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500" />
          <div className="group relative rounded-[6px] bg-black px-9 py-2.5 text-xl font-semibold text-white transition duration-200 hover:bg-transparent">
            See collections
          </div>
        </Link>
      ) : (
        <form action={signInAction} className="relative mt-5 p-[3px]">
          <Button variant="default" type="submit" className="h-auto p-0">
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500" />
            <div className="group relative rounded-[6px] bg-black px-9 py-2.5 text-xl font-semibold text-white transition duration-200 hover:bg-transparent">
              Sign in with Google
            </div>
          </Button>
        </form>
      )}
    </main>
  );
}
