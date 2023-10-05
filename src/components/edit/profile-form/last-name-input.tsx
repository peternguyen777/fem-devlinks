import type { Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import type { InferredProfileFormSchema } from "./form/profile-details-form";

const LastNameInput = ({
  control,
}: {
  control: Control<InferredProfileFormSchema>;
}) => {
  return (
    <FormField
      control={control}
      name="lastName"
      render={({ field }) => (
        <FormItem className="md:flex md:items-center md:gap-4">
          <FormLabel className="md:w-[240px]">
            <h6 className="md:hidden">Last name*</h6>
            <h5 className="hidden text-[#737373] md:inline">Last name*</h5>
          </FormLabel>
          <FormControl className="md:mt-0 md:flex-1">
            <Input
              {...field}
              placeholder="Appleseed"
              className="bg-white md:w-full"
            />
          </FormControl>
          <FormMessage className="md:right-[17px] md:top-1/2 md:-translate-y-1/2" />
        </FormItem>
      )}
    />
  );
};

export default LastNameInput;
