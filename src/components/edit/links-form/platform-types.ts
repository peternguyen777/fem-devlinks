export const platform = [
  { label: "GitHub", value: "github", color: "1A1A1A" },
  { label: "Portfolio", value: "portfolio", color: "FFFFFF" },
  { label: "Twitter", value: "twitter", color: "43B7E9" },
  { label: "LinkedIn", value: "linkedin", color: "2D68FF" },
  { label: "Youtube", value: "youtube", color: "EE3939" },
  { label: "Facebook", value: "facebook", color: "2442AC" },
  { label: "Twitch", value: "twitch", color: "EE3FC8" },
  { label: "Dev.to", value: "devto", color: "333333" },
  { label: "Codewars", value: "codewars", color: "8A1A50" },
  { label: "freeCodeCamp", value: "freecodecamp", color: "302267" },
  { label: "GitLab", value: "gitlab", color: "EB4925" },
  { label: "Hashnode", value: "hashnode", color: "0330D1" },
  { label: "Stack Overflow", value: "stack-overflow", color: "EC7100" },
];

export const platformNameMap: Record<string, string> = platform.reduce(
  (acc, { label, value }) => {
    acc[value] = label;
    return acc;
  },
  {} as Record<string, string>,
);
