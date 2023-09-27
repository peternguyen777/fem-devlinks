/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { useSignIn, useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { useState } from "react";

export default function SignIn() {
  const { isSignedIn } = useUser();
  const router = useRouter();

  if (isSignedIn) {
    router.push("/");
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isLoaded, signIn, setActive } = useSignIn();

  if (!isLoaded) {
    return null;
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (signIn) {
      await signIn
        .create({
          identifier: email,
          password,
        })
        .then((result) => {
          if (result.status === "complete") {
            console.log(result);
            setActive({ session: result.createdSessionId });
            router.push("/");
          } else {
            console.log(result);
          }
        })
        .catch((err) =>
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          console.error("error", err.errors[0].longMessage),
        );
    }
  }

  return (
    <form onSubmit={submit}>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <button>Sign in</button>
      </div>
    </form>
  );
}
