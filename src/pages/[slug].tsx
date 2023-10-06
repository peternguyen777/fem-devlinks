import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import PreviewHeader from "~/components/header/preview/preview-header";
import { generateSSGHelper } from "~/server/api/helpers/ssgHelper";
import { api } from "~/utils/api";

const ProfilePage: NextPage<{ slug: string }> = ({ slug }) => {
  const { data, isLoading } = api.profile.getProfileBySlug.useQuery({ slug });

  if (isLoading) return <div>Loading...</div>;

  if (!data) return <div>404</div>;

  return (
    <>
      <Head>
        <title>{`${data.firstName} ${data.lastName}'s Devlinks`}</title>
      </Head>
      <PreviewHeader data={data} />
      <div>
        <div className="relative h-36 bg-slate-600">
          {data.image && (
            <Image
              src={data.image}
              alt={`${data.firstName ?? ""}'s profile pic`}
              width={128}
              height={128}
              className="left- absolute bottom-0 -mb-16 ml-4 rounded-full border-4 border-black bg-black"
            />
          )}
        </div>
        <div className="h-16 " />
        <div className="p-4 text-2xl">{`${data.email}`}</div>
        {data.links.map((item) => (
          <div key={item.linkId}>
            <p>{item.linkName}</p>
            {/* <p>{item.url}</p> */}
            <p>{item.priority}</p>
          </div>
        ))}
        <div className="w-full border-b border-slate-400" />
      </div>
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
