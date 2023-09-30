import type { ClerkAPIError } from "@clerk/types";
import Image from "next/image";
import { useFormContext } from "react-hook-form";
import { useClerkErrors } from "~/hooks/useClerkErrors";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import type { InferredVerificationSchema } from "./form/verification-form";

const VerificationCodeInput = ({
  clerkErrors,
}: {
  clerkErrors: ClerkAPIError[] | undefined;
}) => {
  const form = useFormContext<InferredVerificationSchema>();
  const { codeError, setCodeErrors } = useClerkErrors(clerkErrors);

  return (
    <FormField
      control={form.control}
      name="code"
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            <h6>Code</h6>
          </FormLabel>
          <FormControl>
            <Input
              {...field}
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
                setCodeErrors([]);
              }}
              isError={!!codeError}
            />
          </FormControl>
          <FormMessage>{codeError}</FormMessage>
        </FormItem>
      )}
    />
  );
};

export default VerificationCodeInput;
