import { useEffect, useState } from "react";
import { api } from "~/utils/api";
import type { LinkState } from "./edit-types";
import CustomizeLinksForm from "./links-form/form/customize-links-form";
import PhonePreview from "./phone-preview";

const EditLinks = ({ userId }: { userId: string }) => {
  const { data, isLoading } = api.profile.getProfile.useQuery({ userId });
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
