import Link from "next/link";

export default async function Home() {
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

      <Link href={"/collections"} className="relative mt-5 p-[3px]">
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500" />
        <div className="group relative rounded-[6px] bg-black px-9 py-2.5 text-xl font-semibold text-white transition duration-200 hover:bg-transparent">
          Lit up borders
        </div>
      </Link>
    </main>
  );
}
