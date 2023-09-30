import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Button } from "../ui/button";

const Header = () => {
  const router = useRouter();
  const currentRoute = router.pathname;

  return (
    <div className="sticky top-0 bg-[#FAFAFA] md:p-6">
      <div className="relative flex items-center justify-between rounded-b-xl bg-background py-4 pl-6 pr-4 shadow-lg md:rounded-xl">
        <>
          <Image
            priority
            src="/images/logo-devlinks-small.svg"
            alt="devlinks logo"
            width={32}
            height={32}
            className="cursor-pointer md:hidden"
            onClick={() => void router.push("/")}
          />
          <Image
            priority
            src="/images/logo-devlinks-large.svg"
            alt="devlinks logo"
            width={183}
            height={40}
            className="hidden cursor-pointer md:flex"
            onClick={() => void router.push("/")}
          />
        </>
        <div className="absolute left-1/2 flex -translate-x-1/2">
          <Button
            variant="dlTab"
            className={`px-[27px] py-[11px] ${
              currentRoute === "/edit/links"
                ? `bg-[#EFEBFF] text-[#633CFF]`
                : `bg-background`
            } md:gap-2`}
          >
            <Image
              priority
              src="/images/icon-links-header.svg"
              alt="edit links"
              width={20}
              height={20}
            />
            <span className="hidden md:inline">Links</span>
          </Button>
          <Button
            variant="dlTab"
            className={`px-[27px] py-[11px] ${
              currentRoute === "/edit/profile"
                ? `bg-[#EFEBFF] text-[#633CFF]`
                : `bg-background`
            } md:gap-2`}
          >
            <Image
              priority
              src="/images/icon-profile-details-header.svg"
              alt="edit profile"
              width={21}
              height={20}
            />
            <span className="hidden md:inline">Profile Details</span>
          </Button>
        </div>
        <Button variant="dlSecondary" className="px-4 py-[11px]">
          <Image
            priority
            src="/images/icon-preview-header.svg"
            alt="preview"
            width={20}
            height={20}
            className="md:hidden"
          />
          <span className="hidden md:inline">Preview</span>
        </Button>
      </div>
    </div>
  );
};

export default Header;
