/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { useSignIn, useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Spinner } from "~/components/icons/spinner";
import EmailInput from "~/components/sign-in-form/email-input";
import PasswordInput from "~/components/sign-in-form/password-input";
import { Button } from "~/components/ui/button";
import { Form } from "~/components/ui/form";

export interface SignInErrorMessage {
  emailErrorMessage: string | undefined;
  passwordErrorMessage: string | undefined;
}

enum ClerkSigninErrorCode {
  IdentifierNotFound = "form_identifier_not_found",
  PasswordIncorrect = "form_password_incorrect",
}

const SignInSchema = z.object({
  emailAddress: z.string().email({ message: "Invalid email" }),
  password: z.string().min(1, { message: "Required" }),
});

export type InferredSignInSchema = z.infer<typeof SignInSchema>;

export default function SignIn() {
  const { isSignedIn } = useUser();
  const { isLoaded, signIn, setActive } = useSignIn();
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState<SignInErrorMessage>({
    emailErrorMessage: undefined,
    passwordErrorMessage: undefined,
  });
  const [isSigningIn, setIsSigningIn] = useState<boolean>(false);

  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      emailAddress: "",
      password: "",
    },
  });

  if (isSignedIn) {
    router.push("/");
  }

  if (!isLoaded) {
    return null;
  }

  async function onSubmit(values: z.infer<typeof SignInSchema>) {
    if (signIn) {
      console.log("signing in");
      setIsSigningIn(true);

      await signIn
        .create({
          identifier: values.emailAddress,
          password: values.password,
        })
        .then((result) => {
          if (result.status === "complete") {
            setActive({ session: result.createdSessionId });
            setErrorMessage({
              emailErrorMessage: undefined,
              passwordErrorMessage: undefined,
            });
            router.push("/");
          }
        })
        .catch((err) => {
          const { code } = err.errors[0];

          const errorMessages = {
            emailErrorMessage:
              code === ClerkSigninErrorCode.IdentifierNotFound
                ? "Email not found"
                : undefined,
            passwordErrorMessage:
              code === ClerkSigninErrorCode.PasswordIncorrect
                ? "Incorrect password"
                : undefined,
          };

          setErrorMessage(errorMessages);
        })
        .finally(() => {
          setIsSigningIn(false);
        });
    }
  }

  return (
    <>
      <Head>
        <title>DevLinks - Signin</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="md:flex md:min-h-screen md:flex-col md:justify-center md:bg-[#FAFAFA]">
        <div className="md:my-16">
          <div className="p-8 md:flex md:justify-center md:p-0">
            <Image
              src="/images/logo-devlinks-large.svg"
              alt="devlinks logo"
              width={183}
              height={40}
              className="cursor-pointer"
              onClick={() => router.push("/")}
            />
          </div>
          <div className="mt-0 p-8 md:mx-auto md:mt-12 md:max-w-[476px] md:rounded-xl md:bg-white md:p-10">
            <h3 className="">Login</h3>
            <p className="mt-2 text-[#737373]">
              Add your details below to get back into the app
            </p>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="mt-10 space-y-6"
              >
                <EmailInput
                  errorMessage={errorMessage}
                  setErrorMessage={setErrorMessage}
                />
                <PasswordInput
                  errorMessage={errorMessage}
                  setErrorMessage={setErrorMessage}
                />
                <SubmitForm isSigningIn={isSigningIn} />
              </form>
            </Form>
          </div>
        </div>
      </main>
    </>
  );
}

const SubmitForm = ({ isSigningIn }: { isSigningIn: boolean }) => (
  <div className="flex flex-col items-center">
    <Button
      type="submit"
      disabled={isSigningIn}
      className="w-full items-start bg-[#633CFF] font-instrument text-[16px] font-semibold leading-[24px] text-white hover:bg-[#BEADFF]"
    >
      {isSigningIn && <Spinner />}
      Submit
    </Button>
    <h5 className="mt-6 text-[#737373]">Don&apos;t have an account?</h5>
    <Link href="/sign-up">
      <h5 className="text-[#633CFF]">Create account</h5>
    </Link>
  </div>
);
