// Note: `useUploadThing` is IMPORTED FROM YOUR CODEBASE using the `generateReactHelpers` function
import type { Profile } from "@prisma/client";
import type { FileWithPath } from "@uploadthing/react";
import { useDropzone } from "@uploadthing/react/hooks";
import { useCallback, useState } from "react";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { toast } from "~/components/ui/use-toast";
import { api } from "~/utils/api";
import Image from "next/image";

import { useUploadThing } from "~/utils/uploadthing";
import { Spinner } from "~/components/icons/spinner";

export function Uploader({ profile }: { profile: Profile }) {
  const [dragOver, setDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const ctx = api.useContext();

  const updateProfileImage = api.profile.updateProfileImage.useMutation({
    onSuccess: async () => {
      await ctx.profile.getProfile.invalidate();
    },
  });

  const { startUpload, permittedFileInfo } = useUploadThing("imageUploader", {
    onClientUploadComplete: (res) => {
      if (res?.[0]) {
        updateProfileImage.mutate({ image: res[0].url });
      }
      setIsUploading(false);
      toast({
        variant: "devlinks",
        title: "Success:",
        description: <p>{`Profile picture uploaded`}</p>,
      });
    },
    onUploadError: (error: Error) => {
      setIsUploading(false);
      toast({
        variant: "devlinks",
        title: "Error occured:",
        description: <p>{error.message}</p>,
      });
    },
    onUploadBegin: (fileName) => {
      setDragOver(false);
      setIsUploading(true);
      toast({
        variant: "devlinks",
        title: "Uploading:",
        description: <p>{fileName}</p>,
      });
    },
  });

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      if (acceptedFiles[0]) {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        startUpload([acceptedFiles[0]]);
      }
    },
    [startUpload],
  );

  const onDragOver = useCallback(() => {
    setDragOver(true);
  }, []);
  const onDragLeave = useCallback(() => {
    setDragOver(false);
  }, []);

  const fileTypes = permittedFileInfo?.config
    ? Object.keys(permittedFileInfo?.config)
    : [];

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    onDragOver,
    onDragLeave,
    accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
  });

  return (
    <div
      {...getRootProps()}
      className={`transition-color relative flex h-[193px] w-[193px] flex-none cursor-pointer flex-col items-center justify-center rounded-xl bg-[#EFEBFF] duration-200 hover:ring-2 hover:ring-[#737373] hover:ring-offset-2 ${
        dragOver && `ring-2 ring-[#737373] ring-offset-2`
      }`}
    >
      <input {...getInputProps()} />
      {isUploading ? (
        <Spinner className="z-20 h-10 w-10" />
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          fill="none"
          viewBox="0 0 40 40"
          className={`z-20 ${profile.image ? `fill-white` : `fill-[#633CFF]`}`}
        >
          <path d="M33.75 6.25H6.25a2.5 2.5 0 0 0-2.5 2.5v22.5a2.5 2.5 0 0 0 2.5 2.5h27.5a2.5 2.5 0 0 0 2.5-2.5V8.75a2.5 2.5 0 0 0-2.5-2.5Zm0 2.5v16.055l-4.073-4.072a2.5 2.5 0 0 0-3.536 0l-3.125 3.125-6.875-6.875a2.5 2.5 0 0 0-3.535 0L6.25 23.339V8.75h27.5ZM6.25 26.875l8.125-8.125 12.5 12.5H6.25v-4.375Zm27.5 4.375h-3.34l-5.624-5.625L27.91 22.5l5.839 5.84v2.91ZM22.5 15.625a1.875 1.875 0 1 1 3.75 0 1.875 1.875 0 0 1-3.75 0Z" />
        </svg>
      )}
      <p
        className={`z-20 mt-2 font-semibold ${
          profile.image ? `text-white` : `text-[#633CFF]`
        } `}
      >
        {isUploading
          ? `Uploading Image`
          : profile.image
          ? `Change Image`
          : `+ Upload Image`}
      </p>
      {profile.image && (
        <>
          <div className="absolute z-10 h-[193px] w-[193px] rounded-xl bg-black opacity-50" />
          <div className="absolute h-[193px] w-[193px] overflow-hidden rounded-xl">
            <Image
              src={profile.image}
              alt="Profile picture"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </>
      )}
    </div>
  );
}
