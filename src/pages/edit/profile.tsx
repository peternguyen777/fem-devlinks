import { useUser } from "@clerk/nextjs";
import Head from "next/head";
import Header from "~/components/header/header";

export default function EditProfilePage() {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded || !isSignedIn) {
    return null;
  }
  return (
    <>
      <Head>
        <title>DevLinks - Edit</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="h-screen bg-[#FAFAFA]">
        <div className="container pt-10">{`Hello ${user.primaryEmailAddress?.emailAddress}`}</div>
      </main>
    </>
  );
}
