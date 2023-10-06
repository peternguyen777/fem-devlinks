import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import PreviewHeader from "~/components/header/preview/preview-header";
import ProfileCard from "~/components/preview/profile-card";
import { generateSSGHelper } from "~/server/api/helpers/ssgHelper";
import { api } from "~/utils/api";

const ProfilePage: NextPage<{ slug: string }> = ({ slug }) => {
  const { data, isLoading } = api.profile.getProfileBySlug.useQuery({ slug });

  if (isLoading) return;
  if (!data) return;

  return (
    <>
      <Head>
        <title>{`${data.firstName} ${data.lastName}'s Devlinks`}</title>
      </Head>
      <PreviewHeader data={data} />
      <ProfileCard data={data} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = generateSSGHelper();
  const slug = context.params?.slug;

  if (typeof slug !== "string") throw new Error("no slug");

  await ssg.profile.getProfileBySlug.prefetch({ slug });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      slug,
    },
  };
};

export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};

export default ProfilePage;
