import type { Profile } from "../edit/edit-types";
import Image from "next/image";
import {
  colorVariants,
  platformNameMap,
} from "../edit/links-form/platform-types";

const ProfileCard = ({ data }: { data: Profile }) => {
  const { email, firstName, lastName, image, links } = data;

  return (
    <main className="relative">
      <div className="hidden h-[230px] rounded-b-[24px] bg-[#633CFF] md:flex"></div>
      <div className="absolute top-0 w-full pt-[60px] md:pt-[102px]">
        <div className="mx-auto flex w-fit flex-col items-center md:rounded-[24px] md:bg-white md:p-14 md:shadow-lg">
          {image && (
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
          )}
          <h3 className="mt-[25px] text-[32px] leading-[48px]">
            {firstName} {lastName}
          </h3>
          <h5 className="mt-2 text-[#737373]">{email}</h5>
          <div className="mt-14 space-y-5">
            {links.map((link) => (
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
                  <Image
                    src={`/images/icon-${link.linkName}.svg`}
                    alt="platform icon"
                    height={16}
                    width={16}
                    className="fill-white"
                  />
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
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfileCard;
