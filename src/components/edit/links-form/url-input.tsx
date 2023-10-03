import type { Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import type { InferredFormSchema } from "./form/customize-links";
import Image from "next/image";

const UrlInput = ({
  control,
  index,
}: {
  control: Control<InferredFormSchema>;
  index: number;
}) => {
  return (
    <FormField
      control={control}
      name={`links.${index}.url`}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            <h6>Link</h6>
          </FormLabel>
          <FormControl>
            <Input
              placeholder="e.g. https://www.github.com/johnappleseed"
              icon={
                <Image
                  src="/images/icon-link.svg"
                  alt="link icon"
                  height={16}
                  width={16}
                />
              }
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default UrlInput;
