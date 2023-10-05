import type { Profile } from "../edit-types";
import { Uploader } from "./uploader";

const ProfilePicture = ({ profile }: { profile: Profile }) => {
  return (
    <div className="w-full rounded-lg bg-[#FAFAFA] p-5 md:flex md:items-center">
      <p className="mb-4 text-[#737373] md:mb-0 md:mr-4 md:w-[240px]">
        Profile picture
      </p>
      <Uploader profile={profile} />
      <h6 className="mt-6 text-[#737373] md:ml-6 md:mt-0">
        Image must be below 1024x1024px (1MB). Use PNG or JPG format.
      </h6>
    </div>
  );
};

export default ProfilePicture;
