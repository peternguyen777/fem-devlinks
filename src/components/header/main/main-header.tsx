/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
import type { Profile } from "~/components/edit/edit-types";
import { Button } from "~/components/ui/button";
import LogoLarge from "../logo-large";
import LogoSmall from "../logo-small";
import LinksTab from "./links-tab";
import ProfileTab from "./profile-tab";
import { UserNav } from "./user-nav";
import Link from "next/link";

const MainHeader = ({ data }: { data?: Profile }) => {
  const { user } = useUser();
  const router = useRouter();
  const currentRoute = router.pathname;
  const isLoggedIn = user && data;

  return (
    <div className="sticky top-0 z-50 md:bg-gradient-to-b md:from-[#FAFAFA] md:via-[#FAFAFA] md:to-transparent md:p-6">
      <div className="relative flex items-center justify-between rounded-b-xl bg-white px-6 py-4 shadow-lg md:rounded-xl">
        <>
          <LogoSmall onClick={() => void router.push("/")} />
          <LogoLarge onClick={() => void router.push("/")} />
        </>
        {isLoggedIn && (
          <>
            <div>
              <ProfileTab
                currentRoute={currentRoute}
                onClick={() => void router.push("/edit/profile")}
              />
              <LinksTab
                currentRoute={currentRoute}
                onClick={() => void router.push("/edit/links")}
              />
            </div>
            <UserNav data={data} />
          </>
        )}
        {!isLoggedIn && (
          <>
            <div className="flex items-center gap-4 md:gap-8">
              <Link href="#pricing">
                <p className="hidden cursor-pointer text-[#737373] md:flex">
                  Pricing
                </p>
              </Link>
              <h4
                onClick={() => router.push("/sign-in")}
                className="cursor-pointer text-[#737373] hover:text-[#633CFF]"
              >
                Log in
              </h4>
              <Button
                variant="dlSecondary"
                type="button"
                onClick={() => router.push("/sign-up")}
                className="h-auto px-4 py-2 md:px-[27px] "
              >
                Sign up
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MainHeader;
