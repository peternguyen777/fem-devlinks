import type { ClerkAPIError } from "@clerk/types";
import Image from "next/image";
import { useFormContext } from "react-hook-form";
import { useClerkErrors } from "~/hooks/useClerkErrors";
import type { InferredSignUpSchema } from "~/pages/sign-up";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

const PasswordInput = ({
  clerkErrors,
}: {
  clerkErrors: ClerkAPIError[] | undefined;
}) => {
  const form = useFormContext<InferredSignUpSchema>();
  const { passwordError, setPasswordErrors } = useClerkErrors(clerkErrors);

  return (
    <FormField
      control={form.control}
      name="password"
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            <h6>Create Password</h6>
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
              onChange={(val) => {
                field.onChange(val);
                setPasswordErrors([]);
              }}
              isError={!!passwordError}
            />
          </FormControl>
          <FormMessage>{passwordError}</FormMessage>
        </FormItem>
      )}
    />
  );
};

export default PasswordInput;
