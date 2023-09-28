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
import type { ClerkErrorMessage, InferredFormSchema } from "~/pages/sign-in";
import type { Dispatch, SetStateAction } from "react";

const EmailInput = ({
  errorMessage,
  setErrorMessage,
}: {
  errorMessage: ClerkErrorMessage;
  setErrorMessage: Dispatch<SetStateAction<ClerkErrorMessage>>;
}) => {
  const form = useFormContext<InferredFormSchema>();

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
                setErrorMessage({
                  ...errorMessage,
                  emailErrorMessage: undefined,
                });
              }}
              isError={!!errorMessage.emailErrorMessage}
            />
          </FormControl>
          <FormMessage>{errorMessage.emailErrorMessage}</FormMessage>
        </FormItem>
      )}
    />
  );
};

export default EmailInput;
