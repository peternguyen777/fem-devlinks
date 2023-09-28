import Image from "next/image";
import { useFormContext } from "react-hook-form";
import type { InferredSignUpSchema } from "~/pages/sign-up";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

const ConfirmPasswordInput = () => {
  const form = useFormContext<InferredSignUpSchema>();

  return (
    <FormField
      control={form.control}
      name="confirmPassword"
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            <h6>Confirm Password</h6>
          </FormLabel>
          <FormControl>
            <Input
              placeholder="At least 8 characters"
              {...field}
              type="password"
              autoComplete="on"
              icon={
                <Image
                  src="/images/icon-password.svg"
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

export default ConfirmPasswordInput;
