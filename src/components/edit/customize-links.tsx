import { Button } from "../ui/button";
import IllustrationEmpty from "./illustration-empty";

const EmptyLinks = () => (
  <div className="flex flex-col items-center space-y-6 py-[26.5px] md:px-[56.5px] md:py-[62.5px] lg:px-[100px] lg:py-[42.5px]">
    <IllustrationEmpty />
    <h3 className="text-center">Let&apos;s get you started</h3>
    <p className="text-center text-[#737373]">
      Use the “Add new link” button to get started. Once you have more than one
      link, you can reorder and edit them. We&apos;re here to help you share
      your profiles with everyone!
    </p>
  </div>
);

const CustomizeLinks = () => {
  const isLinksEmpty = true; //future API to query links associated with user

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
        >
          + Add new link
        </Button>
      </div>
      <div className="my-6 flex flex-1 flex-col items-center justify-center rounded-xl bg-[#FAFAFA] p-5 md:mb-10">
        {isLinksEmpty && <EmptyLinks />}
      </div>
      <hr className="-mx-6 mb-4 border-[#D9D9D9] md:-mx-10 md:mb-6" />
      <div className="md:flex md:justify-end">
        <Button
          variant="dlPrimary"
          className="h-auto w-full py-[11px] md:w-fit md:px-[27px]"
          disabled={isLinksEmpty}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default CustomizeLinks;
