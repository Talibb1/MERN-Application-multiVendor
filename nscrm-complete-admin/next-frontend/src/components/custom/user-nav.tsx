import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/ui/avatar";
import { Button } from "@/components/custom/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/ui/dropdown-menu";
import Link from "next/link";
import { useGetUser, useLogoutUser } from "@/lib/hooks/api";
import { useRouter } from "next/navigation";
import DarkModeLoader from "../layouts/loader/DarkModeLoader";

export function UserNav() {
  const router = useRouter();
  const { data: userData, isLoading, isError } = useGetUser();
  const { mutate: logout } = useLogoutUser();
  const user = userData?.user;
  const handleLogout = () => {
    logout();
    router.push("/signin");
  };

  if (isLoading) {
    return <div><DarkModeLoader /></div>;
  }

  if (isError) {
    return <div>Error loading user data</div>;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user?.avatar || ""} alt={`@${user?.firstName || "User"}`} />
            <AvatarFallback>
              {user?.firstName?.[0].toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user?.firstName ? `${user.firstName} ${user.lastName}` : "User"}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email || "user@example.com"}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link href="/dashboard/settings/profile">Profile</Link>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/dashboard/settings/account">Account</Link>
            <DropdownMenuShortcut>⌘A</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/dashboard/Leads">New Leads</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={handleLogout}>
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
