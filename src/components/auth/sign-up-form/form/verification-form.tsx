/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { useSignUp } from "@clerk/nextjs";
import type { ClerkAPIError } from "@clerk/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Spinner } from "~/components/icons/spinner";
import { Button } from "~/components/ui/button";
import { Form } from "~/components/ui/form";
import { useToast } from "~/components/ui/use-toast";
import { api } from "~/utils/api";
import VerificationCodeInput from "../verification-code-input";

const VerificationSchema = z.object({
  code: z.string().min(1, { message: "Required" }),
});

export type InferredVerificationSchema = z.infer<typeof VerificationSchema>;

const VerificationForm = ({ email }: { email: string }) => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [isVerifyingCode, setIsVerifyingCode] = useState<boolean>(false);
  const [clerkErrors, setClerkErrors] = useState<ClerkAPIError[] | undefined>(
    undefined,
  );
  const router = useRouter();
  const { toast } = useToast();

  const verificationForm = useForm<InferredVerificationSchema>({
    resolver: zodResolver(VerificationSchema),
  });

  const createProfile = api.profile.createNewProfile.useMutation();

  async function onVerificationSubmit(values: InferredVerificationSchema) {
    if (!isLoaded) {
      return;
    }
    setIsVerifyingCode(true);

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: values.code,
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        setClerkErrors(undefined);
        createProfile.mutate({ email });
        router.push("/");
      }
    } catch (error) {
      if ((error as { errors: ClerkAPIError[] }).errors !== null) {
        const errors: ClerkAPIError[] = (error as { errors: ClerkAPIError[] })
          .errors;
        setClerkErrors(errors);
        console.error(errors);
      }
    } finally {
      setIsVerifyingCode(false);
    }
  }

  async function handleResendCode() {
    if (!isLoaded) {
      return;
    }
    await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
    toast({
      variant: "devlinks",
      description: (
        <p className="text-[#737373] opacity-100">
          Email verification code has been resent
        </p>
      ),
    });
  }

  return (
    <div className="md:min-h-[532px]">
      <h3>Create account</h3>
      <p className="mt-2 text-[#737373]">
        Please enter the verification code sent to your email
      </p>
      <Form {...verificationForm}>
        <form
          onSubmit={verificationForm.handleSubmit(onVerificationSubmit)}
          className="mt-10 space-y-6"
        >
          <VerificationCodeInput clerkErrors={clerkErrors} />
          <div className="flex flex-col items-center">
            <Button
              type="submit"
              disabled={isVerifyingCode}
              variant="dlPrimary"
              className="w-full"
            >
              {isVerifyingCode && <Spinner />}
              Submit
            </Button>
            <h5 className="mt-6 text-[#737373]">
              Didn&apos;t get an email?{" "}
              <span
                className="cursor-pointer text-[#633CFF]"
                onClick={handleResendCode}
              >
                Re-send verification code
              </span>
            </h5>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default VerificationForm;
