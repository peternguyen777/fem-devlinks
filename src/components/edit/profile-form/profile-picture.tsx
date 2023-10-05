import Image from "next/image";
import { toast } from "~/components/ui/use-toast";
import { api } from "~/utils/api";
import { UploadDropzone } from "~/utils/uploadthing";
import type { Profile } from "../edit-types";

const ProfilePicture = ({ profile }: { profile: Profile }) => {
  const ctx = api.useContext();

  const updateProfileImage = api.profile.updateProfileImage.useMutation({
    onSuccess: () => {
      toast({
        variant: "devlinks",
        description: <p>{`Profile picture uploaded`}</p>,
      });
    },
    onError: (error) => {
      toast({
        variant: "devlinks",
        title: "Error occured:",
        description: <p>{error.message}</p>,
      });
    },
    onSettled: async () => {
      await ctx.profile.invalidate();
    },
  });

  return (
    <div className="w-full rounded-lg bg-[#FAFAFA] p-5 md:flex md:items-center">
      <p className="mb-4 text-[#737373] md:mb-0 md:w-[240px]">
        Profile picture
      </p>
      <div className="relative flex h-[193px] w-[193px] cursor-pointer flex-col items-center justify-center rounded-xl bg-[#EFEBFF] md:ml-4 md:flex-none lg:mt-0">
        {profile.image && (
          <Image
            src={profile.image}
            alt="Profile picture"
            width={193}
            height={193}
            className="absolute z-0 rounded-xl opacity-50"
          />
        )}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          fill="none"
          viewBox="0 0 40 40"
          className={`z-10 ${profile.image ? `fill-white` : `fill-[#633CFF]`}`}
        >
          <path d="M33.75 6.25H6.25a2.5 2.5 0 0 0-2.5 2.5v22.5a2.5 2.5 0 0 0 2.5 2.5h27.5a2.5 2.5 0 0 0 2.5-2.5V8.75a2.5 2.5 0 0 0-2.5-2.5Zm0 2.5v16.055l-4.073-4.072a2.5 2.5 0 0 0-3.536 0l-3.125 3.125-6.875-6.875a2.5 2.5 0 0 0-3.535 0L6.25 23.339V8.75h27.5ZM6.25 26.875l8.125-8.125 12.5 12.5H6.25v-4.375Zm27.5 4.375h-3.34l-5.624-5.625L27.91 22.5l5.839 5.84v2.91ZM22.5 15.625a1.875 1.875 0 1 1 3.75 0 1.875 1.875 0 0 1-3.75 0Z" />
        </svg>
        <p
          className={`z-10 mt-2 font-semibold ${
            profile.image ? `text-white` : `text-[#633CFF]`
          } `}
        >
          {profile.image ? `Change Image` : `+ Upload Image`}
        </p>

        <UploadDropzone
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            if (res?.[0]) {
              updateProfileImage.mutate({ image: res[0].url });
            }
          }}
          onUploadError={(error: Error) => {
            // Do something with the error.
            alert(`ERROR! ${error.message}`);
          }}
          className="absolute z-20 m-0 h-[193px] w-[193px] border-none"
          content={{
            label: <></>,
            uploadIcon: <></>,
            // button:
            allowedContent: <></>,
          }}
        />
      </div>

      <h6 className="mt-6 text-[#737373] md:ml-6 md:mt-0">
        Image must be below 1024x1024px. Use PNG or JPG format.
      </h6>
    </div>
  );
};

export default ProfilePicture;
