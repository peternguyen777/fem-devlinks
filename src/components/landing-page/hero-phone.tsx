import Image from "next/image";
import {
  colorVariants,
  iconVariants,
  platformIconMap,
  platformNameMap,
} from "../edit/links-form/platform-types";

const profileLinks = [
  {
    linkId: "clnmv7eqn0001me08y0b4keuj",
    userId: "user_2WKknDtk6IYanpTzLYvf5TGWyt6",
    linkName: "portfolio",
    url: "https://www.peter-nguyen.dev",
    priority: 0,
  },
  {
    linkId: "clnjxlk2x001vq5qe3znpe08p",
    userId: "user_2WKknDtk6IYanpTzLYvf5TGWyt6",
    linkName: "github",
    url: "https://github.com/peternguyen777",
    priority: 1,
  },
  {
    linkId: "clnjxr10n001zq5qetihndr2o",
    userId: "user_2WKknDtk6IYanpTzLYvf5TGWyt6",
    linkName: "linkedin",
    url: "https://www.linkedin.com/in/ptrnguyen/",
    priority: 2,
  },
  {
    linkId: "clnmihlbz0001l208wjv09lsi",
    userId: "user_2WKknDtk6IYanpTzLYvf5TGWyt6",
    linkName: "resume",
    url: "https://drive.google.com/file/d/1W7TMqCYejna6CqZAzPEZZwpcWsxiwnhA/view?usp=drive_link",
    priority: 3,
  },
];

const HeroPhone = () => {
  return (
    <div className="flex h-[560px] scale-75 items-center justify-center lg:h-[750px] lg:scale-100">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="308"
        height="632"
        fill="none"
        className="absolute"
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
        <div className="relative mt-[10px] h-[96px] w-[96px] overflow-hidden rounded-full border-4 border-[#633CFF]">
          <Image
            src="https://utfs.io/f/d925eb4a-d003-4af1-8669-65f558fa24f2-hqhw3r.jpeg"
            alt="Profile picture"
            layout="fill"
            objectFit="cover"
            className="h-[96px] w-[96px]"
            priority
          />
        </div>
        <span className="mt-[25px] text-[18px] font-semibold leading-[27px]">
          Peter Nguyen
        </span>
        <span className="mt-[8px] text-[14px] font-normal leading-[21px] text-[#737373]">
          peter.quang.nguyen@gmail.com
        </span>
        <div className="mt-[40px] flex flex-col space-y-4">
          {profileLinks.map((link, index) => {
            if (!link)
              return (
                <div
                  key={index}
                  className="h-[44px] w-[237px] animate-pulse rounded-[8px] bg-[#EEE]"
                />
              );

            const Icon = platformIconMap[link.linkName];
            return (
              <div
                key={link.linkId}
                className={`flex h-[44px] w-[237px] cursor-pointer items-center justify-between rounded-[8px] px-4 ${
                  colorVariants[link.linkName]
                } 
                  `}
                onClick={() => {
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
          <div className="h-[44px] w-[237px] animate-pulse rounded-[8px] bg-[#EEE]" />
        </div>
      </div>
    </div>
  );
};

export default HeroPhone;
