import type { Control } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import type { InferredProfileFormSchema } from "./form/profile-details-form";

const SlugInput = ({
  control,
}: {
  control: Control<InferredProfileFormSchema>;
}) => {
  //query for uniqueness onChange

  return (
    <FormField
      control={control}
      name="slug"
      render={({ field }) => (
        <FormItem>
          <div className="md:flex md:items-center md:gap-4">
            <FormLabel className="md:w-[240px]">
              <h6 className="md:hidden">Slug*</h6>
              <h5 className="hidden text-[#737373] md:inline">Slug*</h5>
            </FormLabel>
            <FormControl className="md:mt-0 md:flex-1">
              <Input
                {...field}
                placeholder="funny-pomeranian"
                className="bg-white"
              />
            </FormControl>
            <FormMessage className="md:right-[17px] md:top-6 md:-translate-y-1/2" />
          </div>
          <FormDescription className="mt-1 text-right text-[12px] font-normal leading-[18px] text-[#737373]">
            Your profile url name eg. /slinky-sloth
          </FormDescription>
        </FormItem>
      )}
    />
  );
};

export default SlugInput;
