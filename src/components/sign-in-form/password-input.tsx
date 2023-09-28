import type { ClerkAPIError } from "@clerk/types";
import Image from "next/image";
import { useFormContext } from "react-hook-form";
import { useClerkErrors } from "~/hooks/useClerkErrors";
import type { InferredSignInSchema } from "~/pages/sign-in";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

const PasswordInput = ({ errors }: { errors: ClerkAPIError[] | undefined }) => {
  const form = useFormContext<InferredSignInSchema>();
  const { passwordErrors } = useClerkErrors(errors);

  return (
    <FormField
      control={form.control}
      name="password"
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            <h6>Password</h6>
          </FormLabel>
          <FormControl>
            <Input
              placeholder="Enter your password"
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
              isError={!!(passwordErrors.length > 0)}
            />
          </FormControl>
          <FormMessage>{passwordErrors[0]?.message}</FormMessage>
        </FormItem>
      )}
    />
  );
};

export default PasswordInput;
