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
import type { SignInErrorMessage, InferredSignInSchema } from "~/pages/sign-in";
import type { Dispatch, SetStateAction } from "react";

const PasswordInput = ({
  errorMessage,
  setErrorMessage,
}: {
  errorMessage: SignInErrorMessage;
  setErrorMessage: Dispatch<SetStateAction<SignInErrorMessage>>;
}) => {
  const form = useFormContext<InferredSignInSchema>();

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
              isError={!!errorMessage.passwordErrorMessage}
              onChange={(val) => {
                field.onChange(val);
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
