import Image from "next/image";
import type { Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import type { InferredFormSchema } from "./form/customize-links-form";
import { platform } from "./platform-types";

const PlatformSelector = ({
  control,
  index,
}: {
  control: Control<InferredFormSchema>;
  index: number;
}) => {
  return (
    <FormField
      control={control}
      name={`links.${index}.linkName`}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            <h6>Platform</h6>
          </FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="h-auto bg-white py-[11px] text-[16px] leading-[24px]">
                <SelectValue placeholder="Select a platform" />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="h-[200px]">
              {platform.map((item) => (
                <SelectItem
                  value={item.value}
                  key={item.value}
                  className="py-3"
                >
                  <div className="flex items-center gap-3">
                    <Image
                      src={`/images/icon-${item.value}.svg`}
                      alt="platform icon"
                      height={16}
                      width={16}
                    />
                    {item.label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PlatformSelector;
