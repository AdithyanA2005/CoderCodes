import { LogOutIcon, UserIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signInAction, signOutAction } from "@/lib/actions";
import { getInitials } from "@/lib/utils";
import { auth } from "@/auth";
import { Logo } from "./logo";

export async function Navbar() {
  const session = await auth();

  return (
    <header className="border-b border-yellow-500 shadow-sm">
      <div className="container relative mx-auto flex h-14 items-center justify-between px-4">
        <Logo />

        {session && session.user ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src={session.user.image || ""} />
                <AvatarFallback>
                  {session.user.name ? getInitials(session.user.name) : <UserIcon className="text-muted-foreground" />}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel className="text-yellow-500">My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild className="!p-0 text-yellow-500 focus:bg-yellow-500/10 focus:text-yellow-500">
                <form action={signOutAction}>
                  <button type="submit" className="w-ful flex items-center gap-2 px-2 py-1.5">
                    <LogOutIcon className="size-4" />
                    Logout
                  </button>
                </form>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <form action={signInAction}>
            <Button variant="default">Login</Button>
          </form>
        )}
      </div>
    </header>
  );
}
