import { UserCircle } from "lucide-react";

const DemoSection = () => {
  return (
    <>
      <div className="hidden lg:flex lg:h-[122px]" id="demo"></div>
      <section className="mt-24 lg:mt-0">
        <div className="flex flex-col items-center px-4 sm:px-8">
          <h3 className="text-center">
            Connect, Share, Thrive in the Tech Universe
          </h3>
          <p className="text-center text-[#737373]">
            Connecting techies, one link at a time, because programmers need
            friends too!
          </p>
          <div className="mt-16 flex flex-col-reverse gap-10 lg:mt-20 lg:grid lg:max-w-5xl lg:grid-cols-3 ">
            <video
              muted
              autoPlay
              loop
              className="w-full rounded-lg border shadow-md lg:col-span-2"
            >
              <source src="/devlinks-demo.mp4" />
            </video>
            <div className="lg:col-span-1 lg:flex lg:flex-col lg:justify-center">
              <div className="mb-4 flex items-center gap-4">
                <UserCircle height={30} width={30} className="shrink-0" />
                <p className=" font-semibold">
                  Create a profile in under 60 seconds!
                </p>
              </div>
              <p className="text-[#737373]">
                DevLinks is your gateway to a thriving tech ecosystem. Connect
                with tech professionals, share your achievements, and thrive in
                the ever-evolving world of technology. Join us today and become
                part of a dynamic community that empowers your tech journey.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DemoSection;
