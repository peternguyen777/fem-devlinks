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
          <FormLabel>
            <h6>Slug*</h6>
          </FormLabel>
          <FormControl>
            <Input
              {...field}
              placeholder="funny-pomeranian"
              className="bg-white"
            />
          </FormControl>
          <FormDescription className="mt-1">
            <h6 className="text-[#737373]">
              {`Profile url: https://fem-devlinks.vercel.app/${field.value}/`}
            </h6>
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SlugInput;
