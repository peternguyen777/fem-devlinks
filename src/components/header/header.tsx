/* eslint-disable @typescript-eslint/no-floating-promises */
import { useRouter } from "next/router";
import LogoSmall from "./logo-small";
import LogoLarge from "./logo-large";
import LinksTab from "./links-tab";
import ProfileTab from "./profile-tab";
import PreviewButton from "./preview-button";
import type { Profile } from "../edit/edit-types";

const Header = ({
  data,
  isLoading,
}: {
  data: Profile | undefined;
  isLoading: boolean;
}) => {
  const router = useRouter();
  const currentRoute = router.pathname;

  return (
    <div className="sticky top-0 z-50 bg-[#FAFAFA] md:p-6">
      <div className="relative flex items-center justify-between rounded-b-xl bg-background py-4 pl-6 pr-4 shadow-lg md:rounded-xl">
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
        <PreviewButton
          isLoading={isLoading ?? !data}
          onClick={() => {
            if (data) {
              router.push(`/${data.slug}`);
            }
          }}
        />
      </div>
    </div>
  );
};

export default Header;
