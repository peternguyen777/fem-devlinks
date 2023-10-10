/* eslint-disable @typescript-eslint/no-floating-promises */
import { useRouter } from "next/router";
import type { Profile } from "../../edit/edit-types";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Button } from "../../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { useClerk } from "@clerk/nextjs";

export function UserNav({ data }: { data: Profile }) {
  const router = useRouter();
  const { email, firstName, lastName, image, slug } = data;
  const { signOut } = useClerk();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-8 w-8 select-none rounded-full ring-2 ring-[#633CFF] ring-offset-1"
        >
          <Avatar className="h-8 w-8 ">
            {image && <AvatarImage src={image} alt="profile image" />}
            <AvatarFallback className="animate-pulse"></AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            {firstName && lastName && (
              <p className="text-sm font-medium leading-none">{`${firstName} ${lastName}`}</p>
            )}
            <p className="text-xs leading-none text-muted-foreground">
              {email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => {
              router.push("/edit/profile");
            }}
            className="cursor-pointer"
          >
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              router.push("/edit/links");
            }}
            className="cursor-pointer"
          >
            Links
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              router.push(`/${slug}`);
            }}
            className="cursor-pointer"
          >
            Preview
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            router.push("/");
            signOut();
          }}
          className="cursor-pointer"
        >
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
