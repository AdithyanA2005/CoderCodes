import Link from "next/link";
import { Button } from "@/components/ui/button";
import { signInAction } from "@/lib/actions";
import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();

  return (
    <main className="!mt-[20vh] flex flex-col items-center justify-center gap-5">
      <h1 className="space-y-5 text-center text-4xl font-semibold md:text-5xl">
        <span className="gradient2 gradient_text block scale-125">CoderCodes</span>
        <span className="block"> Free Coding Lab Solution</span>
      </h1>
      <p className="text-center text-lg md:text-xl">
        Get started by seeing the collections of curated problems and solutions for different labs.
      </p>

      {session ? (
        <Link href={"/collections"} className="relative mt-5 p-[3px]">
          <div className="gradient2 absolute inset-0 rounded-lg" />
          <div className="group relative rounded-[6px] bg-black px-9 py-2.5 text-xl font-semibold text-white transition duration-200 hover:bg-transparent hover:text-black">
            See collections
          </div>
        </Link>
      ) : (
        <form action={signInAction} className="relative mt-5 p-[3px]">
          <Button variant="default" type="submit" className="h-auto p-0">
            <div className="gradient2 absolute inset-0 rounded-lg" />
            <div className="group relative rounded-[6px] bg-black px-9 py-2.5 text-xl font-semibold text-white transition duration-200 hover:bg-transparent">
              Sign in with Google
            </div>
          </Button>
        </form>
      )}
    </main>
  );
}
