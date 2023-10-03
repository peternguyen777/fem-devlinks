import { api, type RouterOutputs } from "~/utils/api";
import CustomizeLinks from "./links-form/form/customize-links";
import PhonePreview from "./phone-preview";
import { useEffect, useState } from "react";

export type LinkState = RouterOutputs["links"]["getLinks"][number];

const EditLinks = ({ userId }: { userId: string }) => {
  const { data, isLoading } = api.links.getLinks.useQuery({ userId });
  const [links, setLinks] = useState<LinkState[]>([]);

  useEffect(() => {
    if (data) {
      setLinks(data);
    }
  }, [data]);

  return (
    <main className="bg-[#FAFAFA] p-4 md:p-6 md:pt-0 lg:flex lg:gap-6">
      <PhonePreview />
      <CustomizeLinks links={links} isLoading={isLoading} />
    </main>
  );
};

export default EditLinks;
