import type { Profile } from "../edit/edit-types";
import Image from "next/image";
import {
  colorVariants,
  iconVariants,
  platformIconMap,
  platformNameMap,
} from "../edit/links-form/platform-types";

const ProfileCard = ({ data }: { data: Profile }) => {
  const { email, firstName, lastName, image, links } = data;

  return (
    <main className="relative">
      <div className="absolute top-0 w-full py-[60px] md:-top-[150px] md:pb-[102px] md:pt-0">
        <div className="mx-auto flex w-fit flex-col items-center md:rounded-[24px] md:bg-white md:p-14 md:shadow-lg">
          {image ? (
            <Image
              src={image}
              alt={`${
                firstName && lastName
                  ? `${firstName} ${lastName}`
                  : `Profile picture`
              }`}
              height={108}
              width={108}
              className="rounded-full border-4 border-[#633CFF]"
            />
          ) : (
            <div className="h-[108px] w-[108px] animate-pulse rounded-full bg-[#EEE]" />
          )}
          <h3 className="mt-[25px] text-[32px] leading-[48px]">
            {firstName} {lastName}
          </h3>
          <h5 className="mt-2 text-[#737373]">{email}</h5>
          <div className="mt-14 space-y-5">
            {links.map((link) => {
              const Icon = platformIconMap[link.linkName];
              return (
                <div
                  key={link.linkId}
                  className={`flex h-[56px] w-[237px] cursor-pointer items-center justify-between rounded-[8px] p-4 ${
                    colorVariants[link.linkName]
                  } 
              `}
                  onClick={() => {
                    console.log(link.url);
                    window.open(link.url, "_blank");
                  }}
                >
                  <span className="flex items-center gap-3">
                    {Icon && (
                      <Icon className={`${iconVariants[link.linkName]}`} />
                    )}
                    {platformNameMap[link.linkName]}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="none"
                    viewBox="0 0 16 16"
                    className={` ${
                      link.linkName === "portfolio"
                        ? `fill-[#333333]`
                        : `fill-white`
                    }`}
                  >
                    <path d="M2.667 7.333v1.334h8L7 12.333l.947.947L13.227 8l-5.28-5.28L7 3.667l3.667 3.666h-8Z" />
                  </svg>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfileCard;
