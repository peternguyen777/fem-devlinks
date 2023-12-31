import { useEffect, useState } from "react";
import type { LinkState, Profile } from "./edit-types";
import CustomizeLinksForm from "./links-form/form/customize-links-form";
import PhonePreview from "./phone-preview";

const EditLinks = ({ data }: { data: Profile }) => {
  const [links, setLinks] = useState<LinkState[]>([]);

  useEffect(() => {
    setLinks(data.links);
  }, [data]);

  return (
    <main className="bg-[#FAFAFA] p-4 md:p-6 md:pt-0 xl:flex xl:gap-6">
      <PhonePreview profile={data} />
      <CustomizeLinksForm links={links} slug={data.slug} />
    </main>
  );
};

export default EditLinks;
