/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { useSignIn } from "@clerk/nextjs";
import type { ClerkAPIError } from "@clerk/types";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Spinner } from "~/components/icons/spinner";
import { Button } from "~/components/ui/button";
import { Form } from "~/components/ui/form";
import EmailInput from "../email-input";
import PasswordInput from "../password-input";
import { useRouter } from "next/router";

const SignInSchema = z.object({
  emailAddress: z
    .string()
    .trim()
    .min(1, { message: "Can't be empty" })
    .email({ message: "Invalid email" }),
  password: z.string().min(2, { message: "Please check again" }),
});

export type InferredSignInSchema = z.infer<typeof SignInSchema>;

const SignInForm = () => {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [isSigningIn, setIsSigningIn] = useState<boolean>(false);
  const [clerkErrors, setClerkErrors] = useState<ClerkAPIError[] | undefined>(
    undefined,
  );
  const router = useRouter();

  const signInForm = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      emailAddress: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof SignInSchema>) {
    if (!isLoaded) {
      return;
    }

    setIsSigningIn(true);

    await signIn
      .create({
        identifier: values.emailAddress,
        password: values.password,
      })
      .then((result) => {
        if (result.status === "complete") {
          setActive({ session: result.createdSessionId });
          setClerkErrors(undefined);
          router.push("/");
        }
      })
      .catch(({ errors }: { errors: ClerkAPIError[] | null }) => {
        if (errors) {
          setClerkErrors(errors);
        }
      })
      .finally(() => {
        setIsSigningIn(false);
      });
  }

  return (
    <>
      <h3>Login</h3>
      <p className="mt-2 text-[#737373]">
        Add your details below to get back into the app
      </p>
      <Form {...signInForm}>
        <form
          onSubmit={signInForm.handleSubmit(onSubmit)}
          className="mt-10 space-y-6"
        >
          <EmailInput clerkErrors={clerkErrors} />
          <PasswordInput clerkErrors={clerkErrors} />
          <SubmitForm isSigningIn={isSigningIn} />
        </form>
      </Form>
    </>
  );
};

const SubmitForm = ({ isSigningIn }: { isSigningIn: boolean }) => (
  <div className="flex flex-col items-center">
    <Button
      type="submit"
      disabled={isSigningIn}
      variant="dlPrimary"
      className="w-full"
    >
      {isSigningIn && <Spinner className="mr-4" />}
      Submit
    </Button>
    <h5 className="mt-6 text-[#737373]">Don&apos;t have an account?</h5>
    <Link href="/sign-up">
      <h5 className="text-[#633CFF]">Create account</h5>
    </Link>
  </div>
);

export default SignInForm;
