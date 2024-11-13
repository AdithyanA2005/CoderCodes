import Link from "next/link";
import { LogOutIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signInAction, signOutAction } from "@/lib/actions";
import { auth } from "@/auth";

export async function Navbar() {
  const session = await auth();

  return (
    <header className="border-b shadow-sm">
      <div className="container relative mx-auto flex h-14 items-center justify-between px-4">
        <Link href="/">
          <h1 className="text-2xl font-semibold">CoderCodes</h1>
        </Link>

        {session ? (
          <form action={signOutAction}>
            <Button variant="ghost" size="icon" aria-description="Logout Button">
              <LogOutIcon className="size-6" />
            </Button>
          </form>
        ) : (
          <form action={signInAction}>
            <Button variant="default">Login</Button>
          </form>
        )}
      </div>
    </header>
  );
}
