import { Button } from "../ui/button";

const ProfileTab = ({
  currentRoute,
  onClick,
}: {
  currentRoute: string;
  onClick: () => void;
}) => (
  <Button
    variant="dlTab"
    className={`group h-auto px-[27px] py-[11px] ${
      currentRoute === "/edit/profile"
        ? `bg-[#EFEBFF] text-[#633CFF]  `
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
        currentRoute === "/edit/profile" ? `fill-[#633CFF]` : `fill-[#737373]`
      }`}
    >
      <path d="M10.5 1.563A8.437 8.437 0 1 0 18.938 10 8.447 8.447 0 0 0 10.5 1.562ZM6.716 15.357a4.688 4.688 0 0 1 7.568 0 6.54 6.54 0 0 1-7.568 0Zm1.596-5.982a2.188 2.188 0 1 1 4.376 0 2.188 2.188 0 0 1-4.376 0Zm7.344 4.683a6.523 6.523 0 0 0-2.265-1.83 4.062 4.062 0 1 0-5.782 0 6.522 6.522 0 0 0-2.265 1.83 6.562 6.562 0 1 1 10.304 0h.008Z" />
    </svg>
    <span className="hidden md:inline">Profile Details</span>
  </Button>
);

export default ProfileTab;
