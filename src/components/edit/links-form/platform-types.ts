export const platform = [
  { label: "GitHub", value: "github" },
  { label: "Portfolio", value: "portfolio" },
  { label: "Twitter", value: "twitter" },
  { label: "LinkedIn", value: "linkedin" },
  { label: "Youtube", value: "youtube" },
  { label: "Facebook", value: "facebook" },
  { label: "Twitch", value: "twitch" },
  { label: "Dev.to", value: "devto" },
  { label: "Codewars", value: "codewars" },
  { label: "freeCodeCamp", value: "freecodecamp" },
  { label: "GitLab", value: "gitlab" },
  { label: "Hashnode", value: "hashnode" },
  { label: "Stack Overflow", value: "stack-overflow" },
];

export const platformNameMap: Record<string, string> = platform.reduce(
  (acc, { label, value }) => {
    acc[value] = label;
    return acc;
  },
  {} as Record<string, string>,
);

export const colorVariants: Record<string, string> = {
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
