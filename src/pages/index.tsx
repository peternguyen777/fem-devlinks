import Head from "next/head";
import Footer from "~/components/footer/footer";
import MainHeader from "~/components/header/main/main-header";
import Pricing from "~/components/landing-page/pricing";
import Testimonials from "~/components/landing-page/testimonials";
import { api } from "~/utils/api";

export default function Home() {
  const { data } = api.profile.getProfile.useQuery();

  return (
    <div className="flex min-h-screen flex-col">
      <Head>
        <title>Devlinks</title>
        <meta
          name="description"
          content="Link sharing for software developers"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainHeader data={data} />
      <main className="mx-auto flex max-w-7xl flex-1 flex-col items-center">
        <Testimonials />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}
