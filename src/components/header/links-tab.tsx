import { Button } from "../ui/button";

const LinksTab = ({
  currentRoute,
  onClick,
}: {
  currentRoute: string;
  onClick: () => void;
}) => (
  <Button
    variant="dlTab"
    className={`group h-auto px-[27px] py-[11px] ${
      currentRoute === "/edit/links"
        ? `bg-[#EFEBFF] text-[#633CFF]`
        : `bg-background`
    } md:gap-2`}
    onClick={onClick}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="21"
      height="20"
      fill="none"
      viewBox="0 0 21 20"
      className={`group-hover:fill-[#633CFF] ${
        currentRoute === "/edit/links" ? `fill-[#633CFF]` : `fill-[#737373]`
      }`}
    >
      <path d="M11.154 14.65a.936.936 0 0 1 0 1.329l-.464.464a4.689 4.689 0 1 1-6.631-6.631l1.884-1.884a4.687 4.687 0 0 1 6.432-.194.941.941 0 0 1-1.25 1.407 2.813 2.813 0 0 0-3.857.114l-1.883 1.882a2.813 2.813 0 1 0 3.978 3.978l.464-.464a.936.936 0 0 1 1.327 0ZM16.94 3.558a4.695 4.695 0 0 0-6.63 0l-.465.464a.94.94 0 1 0 1.328 1.328l.464-.464a2.813 2.813 0 0 1 3.978 3.978l-1.883 1.885a2.813 2.813 0 0 1-3.858.111.942.942 0 0 0-1.25 1.407 4.688 4.688 0 0 0 6.43-.19l1.884-1.884a4.695 4.695 0 0 0 .002-6.633v-.002Z" />
    </svg>
    <span className="hidden md:inline">Links</span>
  </Button>
);

export default LinksTab;
