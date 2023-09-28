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

const EmailInput = ({ errors }: { errors: ClerkAPIError[] | undefined }) => {
  const form = useFormContext<InferredSignInSchema>();
  const { emailErrors } = useClerkErrors(errors);
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
              isError={!!(emailErrors.length > 0)}
            />
          </FormControl>
          <FormMessage>{emailErrors[0]?.message}</FormMessage>
        </FormItem>
      )}
    />
  );
};

export default EmailInput;
