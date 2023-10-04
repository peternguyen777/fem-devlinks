import { useEffect, useState } from "react";
import { api, type RouterOutputs } from "~/utils/api";
import PhonePreview from "./phone-preview";

export type LinkState = RouterOutputs["links"]["getLinks"][number];

const EditProfile = ({ userId }: { userId: string }) => {
  const { data } = api.links.getLinks.useQuery({ userId });
  const [links, setLinks] = useState<LinkState[]>([]);

  useEffect(() => {
    if (data) {
      setLinks(data);
    }
  }, [data]);

  return (
    <main className="bg-[#FAFAFA] p-4 md:p-6 md:pt-0 lg:flex lg:gap-6">
      <PhonePreview links={links} />
    </main>
  );
};

export default EditProfile;
