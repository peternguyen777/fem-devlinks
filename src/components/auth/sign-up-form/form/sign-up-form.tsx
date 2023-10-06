/* eslint-disable @typescript-eslint/no-misused-promises */
import { useSignUp } from "@clerk/nextjs";
import type { ClerkAPIError } from "@clerk/types";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { type Dispatch, type SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Spinner } from "~/components/icons/spinner";
import { Button } from "~/components/ui/button";
import { Form } from "~/components/ui/form";
import ConfirmPasswordInput from "../confirm-password-input";
import EmailInput from "../email-input";
import PasswordInput from "../password-input";

const SignUpSchema = z
  .object({
    emailAddress: z
      .string()
      .trim()
      .min(1, { message: "Can't be empty" })
      .email({ message: "Invalid email" }),
    password: z
      .string()
      .min(2, { message: "Please check again" })
      .min(8, { message: "Must be 8 characters min" }),
    confirmPassword: z
      .string()
      .min(2, { message: "Please check again" })
      .min(8, { message: "Must be 8 characters min" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type InferredSignUpSchema = z.infer<typeof SignUpSchema>;

const SignUpForm = ({
  setPendingVerification,
  setEmail,
}: {
  setPendingVerification: Dispatch<SetStateAction<boolean>>;
  setEmail: Dispatch<SetStateAction<string | undefined>>;
}) => {
  const { isLoaded, signUp } = useSignUp();
  const [isSigningUp, setIsSigningUp] = useState<boolean>(false);
  const [clerkErrors, setClerkErrors] = useState<ClerkAPIError[] | undefined>(
    undefined,
  );

  const signUpForm = useForm<InferredSignUpSchema>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      emailAddress: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSignUpSubmit(values: InferredSignUpSchema) {
    if (!isLoaded) {
      return;
    }
    setIsSigningUp(true);

    try {
      await signUp
        .create({
          emailAddress: values.emailAddress,
          password: values.password,
        })
        .then(() => {
          setClerkErrors(undefined);
        });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
      setEmail(values.emailAddress);
      setClerkErrors(undefined);
    } catch (error) {
      if ((error as { errors: ClerkAPIError[] }).errors !== null) {
        const errors: ClerkAPIError[] = (error as { errors: ClerkAPIError[] })
          .errors;
        setClerkErrors(errors);
      }
    } finally {
      setIsSigningUp(false);
    }
  }

  return (
    <>
      <h3>Create account</h3>
      <p className="mt-2 text-[#737373]">
        Let&apos;s get you started sharing your links!
      </p>
      <Form {...signUpForm}>
        <form
          onSubmit={signUpForm.handleSubmit(onSignUpSubmit)}
          className="mt-10 space-y-6"
        >
          <EmailInput clerkErrors={clerkErrors} />
          <PasswordInput clerkErrors={clerkErrors} />
          <ConfirmPasswordInput />
          <h6 className="text-[#737373]">
            Password must contain at least 8 characters
          </h6>
          <div className="flex flex-col items-center">
            <Button
              type="submit"
              disabled={isSigningUp}
              variant="dlPrimary"
              className="w-full"
            >
              {isSigningUp && <Spinner className="mr-4" />}
              Submit
            </Button>
            <h5 className="mt-6 text-[#737373]">
              Already have an account?{" "}
              <span className="text-[#633CFF]">
                <Link href="/sign-in">Login</Link>
              </span>
            </h5>
          </div>
        </form>
      </Form>
    </>
  );
};

export default SignUpForm;
