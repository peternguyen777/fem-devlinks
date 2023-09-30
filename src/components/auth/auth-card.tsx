/* eslint-disable @typescript-eslint/no-misused-promises */
import type { ReactNode } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

const AuthCard = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  return (
    <main className="md:flex md:min-h-screen md:flex-col md:justify-center md:bg-[#FAFAFA]">
      <div className="md:my-16">
        <div className="p-8 md:flex md:justify-center md:p-0">
          <Image
            priority
            src="/images/logo-devlinks-large.svg"
            alt="devlinks logo"
            width={183}
            height={40}
            className="cursor-pointer"
            onClick={() => router.push("/")}
          />
        </div>
        <div className="mt-0 p-8 md:mx-auto md:mt-12 md:min-h-[612px] md:max-w-[476px] md:rounded-xl md:bg-white md:p-10">
          {children}
        </div>
      </div>
    </main>
  );
};

export default AuthCard;
