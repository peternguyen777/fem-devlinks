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

const EmailInput = ({
  control,
}: {
  control: Control<InferredProfileFormSchema>;
}) => {
  return (
    <FormField
      control={control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            <h6>Email*</h6>
          </FormLabel>
          <FormControl>
            <Input
              {...field}
              placeholder="e.g. alex@email.com"
              className="bg-white"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default EmailInput;
