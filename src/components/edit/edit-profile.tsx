import type { Profile } from "./edit-types";
import PhonePreview from "./phone-preview";
import ProfileDetailsForm from "./profile-form/form/profile-details-form";

const EditProfile = ({ data }: { data: Profile }) => {
  return (
    <main className="bg-[#FAFAFA] p-4 md:p-6 md:pt-0 xl:flex xl:gap-6">
      <PhonePreview profile={data} />
      <ProfileDetailsForm profile={data} />
    </main>
  );
};

export default EditProfile;
