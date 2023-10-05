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
        <FormItem>
          <FormLabel>
            <h6>Last name*</h6>
          </FormLabel>
          <FormControl>
            <Input {...field} placeholder="Appleseed" className="bg-white" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default LastNameInput;
