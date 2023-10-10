/* eslint-disable @typescript-eslint/no-floating-promises */
import { useRouter } from "next/router";
import type { Profile } from "~/components/edit/edit-types";
import LogoLarge from "../logo-large";
import LogoSmall from "../logo-small";
import { UserNav } from "./user-nav";
import LinksTab from "./links-tab";
import ProfileTab from "./profile-tab";

const MainHeader = ({ data }: { data: Profile }) => {
  const router = useRouter();
  const currentRoute = router.pathname;

  return (
    <div className="sticky top-0 z-50 bg-[#FAFAFA] md:p-6">
      <div className="relative flex items-center justify-between rounded-b-xl bg-background px-6 py-4 shadow-lg md:rounded-xl">
        <>
          <LogoSmall onClick={() => void router.push("/")} />
          <LogoLarge onClick={() => void router.push("/")} />
        </>
        <div className="absolute left-1/2 flex -translate-x-1/2 md:relative md:left-auto md:translate-x-0">
          <LinksTab
            currentRoute={currentRoute}
            onClick={() => void router.push("/edit/links")}
          />
          <ProfileTab
            currentRoute={currentRoute}
            onClick={() => void router.push("/edit/profile")}
          />
        </div>
        <UserNav data={data} />
      </div>
    </div>
  );
};

export default MainHeader;
