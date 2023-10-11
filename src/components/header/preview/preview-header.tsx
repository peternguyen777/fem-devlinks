/* eslint-disable @typescript-eslint/no-misused-promises */
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
import type { Profile } from "~/components/edit/edit-types";
import { Button } from "~/components/ui/button";
import LogoLarge from "../logo-large";
import LogoSmall from "../logo-small";
import { toast } from "~/components/ui/use-toast";
import { useEffect, useState } from "react";

const PreviewHeader = ({ data }: { data: Profile }) => {
  const router = useRouter();
  const { user } = useUser();
  const [isProfileOwner, setIsProfileOwner] = useState(false);

  useEffect(() => {
    const ownsProfile = user?.id === data.userId;
    setIsProfileOwner(ownsProfile);
  }, [data.userId, user]);

  const copyURLToClipboardHandler = () => {
    const url = window.location.href; // Get the current URL
    navigator.clipboard
      .writeText(url) // Copy the URL to the clipboard
      .then(() => {
        toast({
          variant: "devlinks",
          description: "The link has been copied to your clipboard!",
        });
      })
      .catch((error) => {
        console.error("Error copying URL to clipboard:", error);
      });
  };

  return (
    <div className="bg-[#FAFAFA] md:h-[357px] md:rounded-b-[24px] md:bg-[#633CFF] md:p-6">
      <div
        className={`relative ${
          !isProfileOwner
            ? `flex items-center justify-between`
            : `grid grid-cols-2 gap-4 md:flex md:items-center md:justify-between`
        } rounded-b-xl bg-background py-4 pl-6 pr-4 shadow-lg  md:rounded-xl`}
      >
        {isProfileOwner ? (
          <Button
            variant="dlSecondary"
            className="h-auto py-2 md:px-[27px]"
            onClick={() => router.push("/edit/links")}
          >
            Back to Editor
          </Button>
        ) : (
          <>
            <LogoSmall
              onClick={() => void router.push("/")}
              className="justify-left flex items-center"
            />
            <LogoLarge onClick={() => void router.push("/")} />
          </>
        )}
        <Button
          variant="dlPrimary"
          className="h-auto py-2"
          onClick={copyURLToClipboardHandler}
        >
          Share Link
        </Button>
      </div>
    </div>
  );
};

export default PreviewHeader;
