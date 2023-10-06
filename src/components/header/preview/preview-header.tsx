/* eslint-disable @typescript-eslint/no-misused-promises */
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
import type { Profile } from "~/components/edit/edit-types";
import { Button } from "~/components/ui/button";
import LogoLarge from "../logo-large";
import LogoSmall from "../logo-small";
import { toast } from "~/components/ui/use-toast";

const PreviewHeader = ({ data }: { data: Profile }) => {
  const router = useRouter();
  const { user } = useUser();
  const isNotProfileOwner = user && user.id !== data.userId;

  const copyURLToClipboardHandler = () => {
    const url = window.location.href; // Get the current URL
    navigator.clipboard
      .writeText(url) // Copy the URL to the clipboard
      .then(() => {
        toast({
          variant: "devlinks",
          title: "The link has been copied to your clipboard!",
        });
      })
      .catch((error) => {
        console.error("Error copying URL to clipboard:", error);
      });
  };

  return (
    <div className="sticky top-0 z-50 bg-[#FAFAFA] md:p-6">
      <div className="relative grid grid-cols-2 gap-4 rounded-b-xl bg-background py-4 pl-6 pr-4 shadow-lg md:flex md:items-center md:justify-between md:rounded-xl">
        {isNotProfileOwner ? (
          <>
            <LogoSmall
              onClick={() => void router.push("/")}
              className="justify-left flex items-center"
            />
            <LogoLarge onClick={() => void router.push("/")} />
          </>
        ) : (
          <Button
            variant="dlSecondary"
            className="h-auto px-[27px] py-[11px]"
            onClick={() => router.push("/edit/links")}
          >
            Back to Editor
          </Button>
        )}
        <Button
          variant="dlPrimary"
          className="h-auto px-[27px] py-[11px]"
          onClick={copyURLToClipboardHandler}
        >
          Share Link
        </Button>
      </div>
    </div>
  );
};

export default PreviewHeader;
