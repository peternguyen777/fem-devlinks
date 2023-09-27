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

const PasswordInput = ({
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
      name="password"
      render={({ field: { onChange, ...rest } }) => (
        <FormItem>
          <FormLabel>
            <h6>Password</h6>
          </FormLabel>
          <FormControl>
            <Input
              placeholder="Enter your password"
              {...rest}
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
              isError={!!errorMessage.passwordErrorMessage}
              onChange={(val) => {
                onChange(val);
                setErrorMessage({
                  ...errorMessage,
                  passwordErrorMessage: undefined,
                });
              }}
            />
          </FormControl>
          <FormMessage>{errorMessage.passwordErrorMessage}</FormMessage>
        </FormItem>
      )}
    />
  );
};

export default PasswordInput;
