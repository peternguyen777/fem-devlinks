import { type NextPage } from "next";
import Head from "next/head";
import Footer from "~/components/footer/footer";
import MainHeader from "~/components/header/main/main-header";
import { api } from "~/utils/api";

const TOSPage: NextPage = () => {
  const { data } = api.profile.getProfile.useQuery();

  return (
    <div className="flex min-h-screen flex-col">
      <Head>
        <title>WoofAi - Terms of Service</title>
        <meta
          name="WoofAi AI powered dog icon generator"
          content="terms of service page for dog icon generator app"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainHeader data={data} />
      <main className="container mx-auto my-8 flex max-w-[1024px] flex-1 flex-col space-y-6 sm:my-12">
        <h3>Terms of Service</h3>

        <h4 className="text-xl">Last Updated: 11 October 2023</h4>
        <p>
          Welcome to DevLinks, a platform that empowers tech professionals to
          connect and share their links to various online platforms. By using
          our services, you agree to adhere to the following Terms of Service.
          Please read these terms carefully and ensure that you understand and
          accept them. If you do not agree with these terms, please do not use
          our services.
        </p>

        <h4 className="text-xl">1. Acceptance of Terms</h4>
        <p>
          By using DevLinks, you agree to be bound by these Terms of Service. If
          you are using DevLinks on behalf of an organization or entity, you
          represent that you have the authority to bind the entity to these
          terms. In that case, &quot;you&quot; and &quot;your&quot; will refer
          to that entity.
        </p>

        <h4 className="text-xl">2. Use of the Service</h4>
        <p>
          You must be at least 18 years old to use DevLinks. You agree to use
          the service in compliance with all applicable laws and regulations.
        </p>

        <h4 className="text-xl">3. User Accounts</h4>
        <p>
          To access certain features of DevLinks, you may need to create a user
          account. You are responsible for maintaining the security of your
          account and any activities that occur under your account. You must
          provide accurate and complete information during the registration
          process. Please notify us immediately if you become aware of any
          unauthorized use of your account.
        </p>

        <h4 className="text-xl">4. Content Sharing</h4>
        <p>
          DevLinks allows you to share links to online platforms such as GitHub,
          personal portfolios, LinkedIn, YouTube, Twitch, etc. When using our
          platform, you agree to:
        </p>
        <ul className="space-y-6 pl-6">
          <li>
            <p>
              a. Only share links and content that you have the right to share.
            </p>
          </li>
          <li>
            <p>
              b. Respect the rights, privacy, and intellectual property of
              others.
            </p>
          </li>
          <li>
            <p>c. Not use DevLinks for spamming or any unlawful purposes.</p>
          </li>
        </ul>

        <h4 className="text-xl">5. Privacy</h4>
        <p>
          Your use of DevLinks is subject to our Privacy Policy. Please review
          this policy to understand how we collect, use, and protect your data.
        </p>

        <h4 className="text-xl">6. Termination</h4>
        <p>
          We reserve the right to terminate or suspend your account or access to
          our services at our discretion, without notice, for any violation of
          these terms.
        </p>

        <h4 className="text-xl">7. Changes to the Terms</h4>
        <p>
          We may update these Terms of Service from time to time. The &quot;Last
          Updated&quot; date at the top of this page will reflect any changes.
          Your continued use of DevLinks after such changes constitutes your
          acceptance of the updated terms.
        </p>

        <h4 className="text-xl">8. Disclaimer of Warranties</h4>
        <p>
          DevLinks is provided &quot;as is&quot; and &quot;as available.&quot;
          We do not warrant that the service will be error-free, uninterrupted,
          or free from harmful components. You use DevLinks at your own risk.
        </p>

        <h4 className="text-xl">9. Limitation of Liability</h4>
        <p>
          DevLinks shall not be liable for any indirect, consequential, or
          special damages arising out of or related to your use of the service.
        </p>

        <h4 className="text-xl">10. Governing Law</h4>
        <p>
          These Terms of Service are governed by the laws of the multiverse. Any
          disputes arising from these terms or your use of DevLinks shall be
          resolved in the courts of the multiverse.
        </p>

        <h4 className="text-xl">11. Contact Us</h4>
        <p>
          If you have any questions or concerns regarding these Terms of
          Service, please contact us.
        </p>
        <p>
          Thank you for using DevLinks to connect and share your professional
          links. We look forward to serving the tech community and helping you
          build valuable connections.
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default TOSPage;
