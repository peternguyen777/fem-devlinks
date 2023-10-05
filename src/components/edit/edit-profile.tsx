import { api } from "~/utils/api";
import PhonePreview from "./phone-preview";
import ProfileDetailsForm from "./profile-form/form/profile-details-form";

const EditProfile = ({ userId }: { userId: string }) => {
  const { data } = api.profile.getProfile.useQuery({ userId });

  return (
    <main className="bg-[#FAFAFA] p-4 md:p-6 md:pt-0 lg:flex lg:gap-6">
      <PhonePreview profile={data} />
      <ProfileDetailsForm profile={data} />
    </main>
  );
};

export default EditProfile;
