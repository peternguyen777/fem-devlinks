import { useEffect, useState } from "react";
import { api, type RouterOutputs } from "~/utils/api";
import PhonePreview from "./phone-preview";
import ProfileDetailsForm from "./profile-form/form/profile-details-form";

export type LinkState = RouterOutputs["links"]["getLinks"][number];

const EditProfile = ({ userId }: { userId: string }) => {
  const { data } = api.links.getLinks.useQuery({ userId });
  const [links, setLinks] = useState<LinkState[]>([]);

  //fetch api.profile.getProfile.useQuery({userId})

  useEffect(() => {
    if (data) {
      setLinks(data);
    }
  }, [data]);

  return (
    <main className="bg-[#FAFAFA] p-4 md:p-6 md:pt-0 lg:flex lg:gap-6">
      <PhonePreview links={links} />
      <ProfileDetailsForm /> {/* add profile={profile} prop */}
    </main>
  );
};

export default EditProfile;
