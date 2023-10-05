import Image from "next/image";
import { colorVariants, platformNameMap } from "./links-form/platform-types";
import type { Profile } from "./edit-types";

const PhonePreview = ({ profile }: { profile: Profile | undefined }) => {
  if (!profile) return;

  const paddingSize = Math.max(5 - profile.links.length, 0);
  const paddedArray = [
    ...profile.links,
    ...Array<undefined>(paddingSize).fill(undefined),
  ];

  return (
    <>
      <div className="hidden lg:relative lg:flex lg:h-[calc(100vh-152px)] lg:w-[560px] lg:flex-col lg:items-center lg:justify-center lg:rounded-xl lg:bg-white lg:py-6 lg:shadow-lg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="308"
          height="632"
          fill="none"
          className="lg:absolute"
        >
          <path
            stroke="#737373"
            d="M1 54.5C1 24.953 24.953 1 54.5 1h199C283.047 1 307 24.953 307 54.5v523c0 29.547-23.953 53.5-53.5 53.5h-199C24.953 631 1 607.047 1 577.5v-523Z"
          />
          <path
            stroke="#737373"
            d="M12 55.5C12 30.923 31.923 11 56.5 11h24C86.851 11 92 16.149 92 22.5c0 8.008 6.492 14.5 14.5 14.5h95c8.008 0 14.5-6.492 14.5-14.5 0-6.351 5.149-11.5 11.5-11.5h24c24.577 0 44.5 19.923 44.5 44.5v521c0 24.577-19.923 44.5-44.5 44.5h-195C31.923 621 12 601.077 12 576.5v-521Z"
          />
        </svg>
        <div className="z-10 flex w-[308px] flex-col items-center justify-start">
          <div className="mt-[10px] h-[96px] w-[96px] animate-pulse rounded-full bg-[#EEE]" />
          <div className="mt-[25px] h-[16px] w-[160px] animate-pulse rounded-full bg-[#EEE]" />
          <div className="mt-[13px] h-[8px] w-[72px] animate-pulse rounded-full bg-[#EEE]" />
          <div className="mt-[56px] flex flex-col space-y-5">
            {paddedArray.map((link, index) => {
              return link ? (
                <div
                  key={link.linkId}
                  className={`flex h-[44px] w-[237px] cursor-pointer items-center justify-between rounded-[8px] px-4 ${
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
              ) : (
                <div
                  key={index}
                  className="h-[44px] w-[237px] animate-pulse rounded-[8px] bg-[#EEE]"
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default PhonePreview;
