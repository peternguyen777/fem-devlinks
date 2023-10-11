import { type NextPage } from "next";
import Head from "next/head";
import Footer from "~/components/footer/footer";
import MainHeader from "~/components/header/main/main-header";
import { api } from "~/utils/api";

const PrivacyPolicyPage: NextPage = () => {
  const { data } = api.profile.getProfile.useQuery();
  return (
    <div className="flex min-h-screen flex-col">
      <Head>
        <title>Devlinks - Privacy Policy</title>
        <meta
          name="WoofAi AI powered dog icon generator"
          content="privacy policy page for dog icon generator app"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainHeader data={data} />
      <main className="container mx-auto my-8 flex max-w-[1024px] flex-1 flex-col space-y-6 sm:my-12">
        <h3>Privacy Policy</h3>
        <h4 className="text-xl">Last updated: 11 October 2023</h4>
        <p>
          Thank you for choosing DevLinks, a platform that enables tech
          professionals to share their links to various online platforms and
          build meaningful connections. At DevLinks, we take your privacy
          seriously, and we are committed to protecting your personal
          information. This Privacy Policy explains how we collect, use,
          disclose, and safeguard your information when you use our services.
        </p>
        <p>
          Please take the time to read this Privacy Policy carefully to
          understand our practices regarding your personal data. By accessing or
          using the DevLinks website and services (the &quot;Service&quot;), you
          acknowledge that you have read and agreed to the terms of this Privacy
          Policy.
        </p>

        <h4 className="text-xl">1. Information We Collect</h4>
        <ul className="space-y-6 pl-6">
          <li>
            <h4>1.1 Information You Provide</h4>
            <p>
              When you use DevLinks, we may collect the following types of
              information that you voluntarily provide:
            </p>
          </li>
          <ul className="space-y-6">
            <li>
              <p>
                <strong>a. Profile Information:</strong> This includes your
                name, email address, profile picture, and any other personal
                information you choose to provide.
              </p>
            </li>
            <li>
              <p>
                <strong>b. Links and Descriptions:</strong> We collect the links
                you add to your DevLinks profile, along with any descriptions or
                additional information you provide for each link. This
                information is visible to other users of the platform.
              </p>
            </li>
            <li>
              <p>
                <strong>c. User-Generated Content:</strong> Any content,
                messages, comments, or other information you post on DevLinks,
                including in public or private messages, forums, or your
                profile.
              </p>
            </li>
            <li>
              <p>
                <strong>d. Communication:</strong> Any communications you have
                with us, such as customer support inquiries or feedback.
              </p>
            </li>
          </ul>
          <li>
            <h4>1.2 Automatically Collected Information</h4>
            <p>
              We may also collect certain information automatically when you use
              our Service, including:
            </p>
          </li>
          <ul className="space-y-6">
            <li>
              <p>
                <strong>a. Usage Information:</strong> We collect data about
                your interactions with the Service, such as the pages you visit,
                your search queries, and your interactions with other users.
              </p>
            </li>
            <li>
              <p>
                <strong>b. Device and Log Information:</strong> Information
                about your device, browser, and IP address, as well as your
                access times and the pages you view.
              </p>
            </li>
            <li>
              <p>
                <strong>c. Cookies and Similar Technologies:</strong> We use
                cookies and similar technologies to collect information about
                your activities on our website. You can manage your cookie
                preferences through your browser settings.
              </p>
            </li>
          </ul>
        </ul>

        <h4 className="text-xl">2. How We Use Your Information</h4>
        <p>
          We use the information we collect for various purposes, including but
          not limited to:
        </p>
        <ul className="space-y-6 pl-6">
          <li>
            <p>
              <strong>a. Providing and Improving Our Service:</strong> To
              operate, maintain, and enhance the DevLinks platform, including
              personalizing your experience and offering new features.
            </p>
          </li>
          <li>
            <p>
              <strong>b. Communication:</strong> To communicate with you
              regarding updates, news, and promotional materials related to
              DevLinks, and to respond to your inquiries and requests.
            </p>
          </li>
          <li>
            <p>
              <strong>c. Analytics:</strong> To analyze and understand how users
              interact with our Service, so we can improve it and offer a better
              user experience.
            </p>
          </li>
          <li>
            <p>
              <strong>d. Legal Compliance:</strong> To comply with legal
              obligations and protect our rights, privacy, safety, and property,
              as well as the rights, privacy, safety, and property of our users
              and others.
            </p>
          </li>
        </ul>

        <h4 className="text-xl">3. Sharing Your Information</h4>
        <p>DevLinks may share your information with the following parties:</p>
        <ul className="space-y-6 pl-6">
          <li>
            <p>
              <strong>a. Other Users:</strong> Your profile information and the
              links you share are visible to other users of DevLinks. Be mindful
              of the information you choose to disclose.
            </p>
          </li>
          <li>
            <p>
              <strong>b. Service Providers:</strong> We may share information
              with third-party service providers who assist us in providing the
              Service.
            </p>
          </li>
          <li>
            <p>
              <strong>c. Legal Requirements:</strong> We may disclose your
              information if required to do so by law or in response to a
              subpoena or court order.
            </p>
          </li>
        </ul>

        <h4 className="text-xl">4. Data Security</h4>
        <p>
          We take data security seriously and employ reasonable security
          measures to protect your personal information. However, no system is
          entirely foolproof, so we cannot guarantee the absolute security of
          your data.
        </p>

        <h4 className="text-xl">5. Your Choices</h4>
        <p>You have the right to:</p>
        <ul className="space-y-6 pl-6">
          <li>
            <p>
              a. Access, correct, update, or delete your personal information.
            </p>
          </li>
          <li>
            <p>b. Object to the processing of your personal information.</p>
          </li>
          <li>
            <p>c. Opt-out of marketing communications.</p>
          </li>
        </ul>

        <h4 className="text-xl">6. Changes to this Privacy Policy</h4>
        <p>
          We may update this Privacy Policy from time to time. Any changes will
          be posted on this page, and the &quot;Last Updated&quot; date at the
          top of this page will be revised.
        </p>

        <h4 className="text-xl">7. Contact Us</h4>
        <p>
          If you have any questions or concerns about this Privacy Policy or our
          data practices, please contact us.
        </p>
        <p>
          Thank you for choosing DevLinks, and we look forward to helping you
          build valuable connections in the tech community.
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;
