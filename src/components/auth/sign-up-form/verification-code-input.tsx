import type { ClerkAPIError } from "@clerk/types";
import { useFormContext } from "react-hook-form";
import type { InferredVerificationSchema } from "~/pages/sign-up";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import { useClerkErrors } from "~/hooks/useClerkErrors";

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
