/* eslint-disable @typescript-eslint/no-misused-promises */
import { useRouter } from "next/router";
import { Button } from "../ui/button";

const PreviewButton = ({ slug }: { slug: string }) => {
  const router = useRouter();
  return (
    <Button
      variant="dlSecondary"
      className="h-auto  px-[27px] py-[11px]"
      type="button"
      onClick={() => router.push(`/${slug}`)}
    >
      Go to Profile
    </Button>
  );
};

export default PreviewButton;
