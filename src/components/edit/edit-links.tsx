import { useEffect, useState } from "react";
import type { LinkState, Profile } from "./edit-types";
import CustomizeLinksForm from "./links-form/form/customize-links-form";
import PhonePreview from "./phone-preview";

const EditLinks = ({
  data,
  isLoading,
}: {
  data: Profile | undefined;
  isLoading: boolean;
}) => {
  const [links, setLinks] = useState<LinkState[]>([]);

  useEffect(() => {
    if (data?.links) {
      setLinks(data.links);
    }
  }, [data]);

  if (!data || isLoading) {
    return;
  }

  return (
    <main className="bg-[#FAFAFA] p-4 md:p-6 md:pt-0 xl:flex xl:gap-6">
      <PhonePreview profile={data} />
      <CustomizeLinksForm links={links} isLoading={isLoading} />
    </main>
  );
};

export default EditLinks;
