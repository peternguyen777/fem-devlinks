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

const EmailInput = ({
  clerkErrors,
}: {
  clerkErrors: ClerkAPIError[] | undefined;
}) => {
  const form = useFormContext<InferredSignUpSchema>();
  const { emailError, setEmailErrors } = useClerkErrors(clerkErrors);
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
              onChange={(val) => {
                field.onChange(val);
                setEmailErrors([]);
              }}
              isError={!!emailError}
            />
          </FormControl>
          <FormMessage>{emailError}</FormMessage>
        </FormItem>
      )}
    />
  );
};

export default EmailInput;
