import { Button } from "../ui/button";
import Link from "next/link";
import HeroPhone from "./hero-phone";

const HeroBanner = () => {
  return (
    <section className="flex max-w-5xl flex-col-reverse px-4 sm:px-8 lg:grid lg:grid-cols-2 lg:gap-[125px] lg:px-0">
      <div className="flex flex-col justify-center gap-10">
        <h1 className="text-center text-[48px] font-bold leading-[48px] lg:text-left lg:text-[80px] lg:leading-[80px] ">
          Code. Connect. Collaborate.
        </h1>
        <p className="text-center text-[#737373] lg:text-left">
          <span className="font-bold">Devlinks</span> is the ultimate platform
          for developers to seamlessly connect, showcase their portfolios, and
          foster collaboration within a thriving tech community.
        </p>
        <div className="flex items-center justify-center gap-4 lg:justify-start">
          <Link href="/sign-up">
            <Button
              variant="dlPrimary"
              className="h-auto w-fit px-[27px] py-[11px]"
            >
              Get started
            </Button>
          </Link>
          <Link href="/#demo">
            <Button
              variant="dlSecondary"
              className="h-auto w-fit px-[27px] py-[11px]"
            >
              Learn more
            </Button>
          </Link>
        </div>
      </div>
      <HeroPhone />
    </section>
  );
};

export default HeroBanner;
