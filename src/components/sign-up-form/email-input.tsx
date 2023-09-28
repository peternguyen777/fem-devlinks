import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import Image from "next/image";
import type { InferredSignUpSchema } from "~/pages/sign-up";

const EmailInput = () => {
  const form = useFormContext<InferredSignUpSchema>();

  return (
    <FormField
      control={form.control}
      name="emailAddress"
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            <h6>Email Address</h6>
          </FormLabel>
          <FormControl>
            <Input
              placeholder="e.g. alex@email.com"
              {...field}
              icon={
                <Image
                  src="/images/icon-email.svg"
                  alt="password icon"
                  height={16}
                  width={16}
                />
              }
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default EmailInput;
