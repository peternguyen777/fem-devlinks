import { UserSquare2 } from "lucide-react";

const DemoSection = () => {
  return (
    <section className="">
      <div className="flex flex-col items-center px-4 sm:px-8">
        <h3 className="text-center">
          Connect, Share, Thrive in the Tech Universe
        </h3>
        <p className="text-center text-[#737373]">
          Connecting techies, one link at a time, because programmers need
          friends too!
        </p>
        <div className="mt-16 space-y-10 lg:mt-20 lg:grid lg:max-w-5xl lg:grid-cols-7 lg:gap-16 lg:space-y-0">
          <div className="lg:col-span-2 lg:my-auto">
            <UserSquare2 height={30} width={30} />
            <p className="mb-4 mt-2 font-semibold">
              Create your own profile in under one minute!
            </p>
            <p className="text-[#737373]">
              DevLinks is your gateway to a thriving tech ecosystem. Connect
              with tech professionals, share your achievements, and thrive in
              the ever-evolving world of technology. Join us today and become
              part of a dynamic community that empowers your tech journey.
            </p>
          </div>
          <video
            muted
            autoPlay
            loop
            className="w-full rounded-lg border shadow-md lg:col-span-5"
          >
            <source src="/devlinks-demo.mp4" />
          </video>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;
