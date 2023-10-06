import { useUser } from "@clerk/nextjs";
import Head from "next/head";
import EditLinks from "~/components/edit/edit-links";
import Header from "~/components/header/header";
import { api } from "~/utils/api";

export default function EditLinksPage() {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  const { data, isLoading } = api.profile.getProfile.useQuery({
    userId: user.id,
  });

  return (
    <>
      <Head>
        <title>DevLinks - Edit</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header data={data} isLoading={isLoading} />
      <EditLinks data={data} isLoading={isLoading} />
    </>
  );
}
