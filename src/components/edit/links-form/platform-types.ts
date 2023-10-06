import {
  IconResume,
  IconPortfolio,
  IconGithub,
  IconLinkedin,
  IconTwitter,
  IconYoutube,
  IconFacebook,
  IconTwitch,
  IconDevto,
  IconCodewars,
  IconFreecodecamp,
  IconGitlab,
  IconHashnode,
  IconStackOverflow,
} from "~/components/icons";

export const platform = [
  { label: "Curriculum Vitae", value: "resume", icon: IconResume },
  { label: "GitHub", value: "github", icon: IconGithub },
  { label: "Portfolio", value: "portfolio", icon: IconPortfolio },
  { label: "Twitter", value: "twitter", icon: IconTwitter },
  { label: "LinkedIn", value: "linkedin", icon: IconLinkedin },
  { label: "Youtube", value: "youtube", icon: IconYoutube },
  { label: "Facebook", value: "facebook", icon: IconFacebook },
  { label: "Twitch", value: "twitch", icon: IconTwitch },
  { label: "Dev.to", value: "devto", icon: IconDevto },
  { label: "Codewars", value: "codewars", icon: IconCodewars },
  { label: "freeCodeCamp", value: "freecodecamp", icon: IconFreecodecamp },
  { label: "GitLab", value: "gitlab", icon: IconGitlab },
  { label: "Hashnode", value: "hashnode", icon: IconHashnode },
  { label: "Stack Overflow", value: "stack-overflow", icon: IconStackOverflow },
];

export const platformNameMap: Record<string, string> = platform.reduce(
  (acc, { label, value }) => {
    acc[value] = label;
    return acc;
  },
  {} as Record<string, string>,
);

type Icon = ({ className }: { className?: string | undefined }) => JSX.Element;

export const platformIconMap: Record<string, Icon> = platform.reduce(
  (acc, { icon, value }) => {
    acc[value] = icon;
    return acc;
  },
  {} as Record<string, Icon>,
);

export const colorVariants: Record<string, string> = {
  resume: `bg-[#13ad5c] text-white`,
  github: `bg-[#1A1A1A] text-white`,
  portfolio: `bg-[#FFFFFF] text-[#333333] border border-[#D9D9D9]`,
  twitter: `bg-[#43B7E9] text-white`,
  linkedin: `bg-[#2D68FF] text-white`,
  youtube: `bg-[#EE3939] text-white`,
  facebook: `bg-[#2442AC] text-white`,
  twitch: `bg-[#EE3FC8] text-white`,
  devto: `bg-[#333333] text-white`,
  codewars: `bg-[#8A1A50] text-white`,
  freecodecamp: `bg-[#302267] text-white`,
  gitlab: `bg-[#EB4925] text-white`,
  hashnode: `bg-[#0330D1] text-white`,
  "stack-overflow": `bg-[#EC7100] text-white`,
};

export const iconVariants: Record<string, string> = {
  resume: `stroke-white`,
  github: `text-white`,
  portfolio: ``,
  twitter: `text-white`,
  linkedin: `text-white`,
  youtube: `text-white`,
  facebook: `text-white`,
  twitch: `text-white`,
  devto: `text-white`,
  codewars: `text-white`,
  freecodecamp: `text-white`,
  gitlab: `text-white`,
  hashnode: `text-white`,
  "stack-overflow": `text-white`,
};
