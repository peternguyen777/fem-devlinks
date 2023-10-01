import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { api, type RouterOutputs } from "~/utils/api";
import { Button } from "../ui/button";
import IllustrationEmpty from "./illustration-empty";

const EmptyLinks = () => (
  <div className="my-6 flex flex-1 flex-col items-center justify-center rounded-xl bg-[#FAFAFA] p-5 md:mb-10">
    <div className="flex flex-col items-center space-y-6 py-[26.5px] md:px-[56.5px] md:py-[62.5px] lg:px-[100px] lg:py-[42.5px]">
      <IllustrationEmpty />
      <h3 className="text-center">Let&apos;s get you started</h3>
      <p className="text-center text-[#737373]">
        Use the “Add new link” button to get started. Once you have more than
        one link, you can reorder and edit them. We&apos;re here to help you
        share your profiles with everyone!
      </p>
    </div>
  </div>
);

const DevLinks = ({
  links,
  setLinks,
}: {
  links: LinkState[];
  setLinks: Dispatch<SetStateAction<LinkState[]>>;
}) => {
  const removeLinkHandler = (id: string) => {
    const filteredLinks = links.filter((link) => link.id !== id);
    setLinks(filteredLinks);
  };

  return (
    <div className="my-6 flex flex-1 flex-col items-center space-y-6 md:mb-10">
      {links.map((link, index) => (
        <div
          key={link.id ?? index}
          className="w-full space-y-3 rounded-lg bg-[#FAFAFA] p-5"
        >
          <div className="flex justify-between">
            <div className="flex cursor-pointer items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="6"
                fill="none"
                viewBox="0 0 12 6"
              >
                <path fill="#737373" d="M0 0h12v1H0zM0 5h12v1H0z" />
              </svg>
              <h5 className="select-none font-bold text-[#737373]">{`Link #${link.priority}`}</h5>
            </div>
            <h5
              className="cursor-pointer text-[#737373]"
              onClick={() => removeLinkHandler(link.id)}
            >
              Remove
            </h5>
          </div>
          <div className="space-y-1">
            <h6>Platform</h6>
            <p>{link.linkName}</p>
          </div>
          <div className="space-y-1">
            <h6>Link</h6>
            <p className="text-[#737373]">{link.url}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

type LinkState = RouterOutputs["links"]["getLinks"][number];

const CustomizeLinks = ({ userId }: { userId: string }) => {
  const [links, setLinks] = useState<LinkState[]>([]);
  const hasLinks = links.length > 0;

  const { data } = api.links.getLinks.useQuery({ userId });

  useEffect(() => {
    if (data) {
      setLinks(data);
    }
  }, [data]);

  const AddLinkHandler = () => {
    const priority = links.length > 0 ? links.length + 1 : 1;
    const randomId = crypto.randomUUID();
    console.log("randomId:", randomId);

    setLinks([
      ...links,
      {
        id: crypto.randomUUID(),
        userId: userId,
        linkName: "GitHub",
        url: "https://www.github.com/johnappleseed",
        priority,
      },
    ]);
  };

  return (
    <div className="flex min-h-[calc(100vh-108px)] flex-1 flex-col rounded-xl bg-white p-6 shadow-lg md:min-h-[calc(100vh-152px)] md:p-10 md:pb-6 lg:w-auto">
      <div>
        <h3>Customize your links</h3>
        <p className="mt-2 text-[#737373]">
          Add/edit/remove links below and then share all your profiles with the
          world!
        </p>
        <Button
          variant="dlSecondary"
          className="mt-10 h-auto w-full px-[27px] py-[11px]"
          onClick={AddLinkHandler}
        >
          + Add new link
        </Button>
      </div>

      {!hasLinks && <EmptyLinks />}
      {hasLinks && <DevLinks links={links} setLinks={setLinks} />}

      <hr className="-mx-6 mb-4 border-[#D9D9D9] md:-mx-10 md:mb-6" />
      <div className="md:flex md:justify-end">
        <Button
          variant="dlPrimary"
          className="h-auto w-full py-[11px] md:w-fit md:px-[27px]"
          disabled={!hasLinks}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default CustomizeLinks;
