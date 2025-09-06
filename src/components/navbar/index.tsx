import { LogOutIcon, UserIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { Logo } from "@/components/logo";
import { signInAction, signOutAction } from "@/lib/actions/auth";
import { getInitials } from "@/lib/utils";
import { auth } from "@/auth";

export async function Navbar() {
  const session = await auth();

  return (
    <header className="bg-background/80 sticky top-0 z-40 w-full border-b backdrop-blur">
      <div className="max-w-main mx-auto flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <Logo />
        </div>
        <div className="flex items-center gap-3">
          {session && session.user ? (
            <DropdownMenu>
              <DropdownMenuTrigger aria-label="Account menu">
                <Avatar className="size-10">
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
                <DropdownMenuItem asChild>
                  <form className="relative" action={signOutAction}>
                    {/* Placeholder button  */}
                    <span aria-hidden="true" className="flex items-center gap-2">
                      <LogOutIcon className="size-4" />
                      Logout
                    </span>

                    {/* Submit Button */}
                    <button type="submit" className="absolute inset-0 opacity-0">
                      Logout
                    </button>
                  </form>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <form action={signInAction}>
              <HoverBorderGradient
                as="button"
                className="flex items-center space-x-2 bg-white py-1.5 text-black dark:bg-black dark:text-white"
              >
                Login
              </HoverBorderGradient>
            </form>
          )}
        </div>
      </div>
    </header>
  );
}
