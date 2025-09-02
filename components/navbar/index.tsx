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
import { Logo } from "@/components/logo";
import { signInAction, signOutAction } from "@/lib/actions";
import { getInitials } from "@/lib/utils";
import { auth } from "@/auth";
import { NavLink } from "./nav-link";

export async function Navbar() {
  const session = await auth();

  return (
    <header className="bg-background/80 sticky top-0 z-40 w-full border-b backdrop-blur">
      <div className="max-w-main mx-auto flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <Logo />
        </div>
        <nav className="hidden items-center gap-4 sm:flex">
          <NavLink href="/" label="Home" />
        </nav>
        <div className="flex items-center gap-3">
          {session && session.user ? (
            <DropdownMenu>
              <DropdownMenuTrigger aria-label="Account menu">
                <Avatar>
                  <AvatarImage src={session.user.image || ""} />
                  <AvatarFallback>
                    {session.user.name ? (
                      getInitials(session.user.name)
                    ) : (
                      <UserIcon className="text-muted-foreground" />
                    )}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44">
                <DropdownMenuLabel>Account</DropdownMenuLabel>
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
      </div>
    </header>
  );
}
