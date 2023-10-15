import { cn } from "~/lib/utils";
import { Card, CardContent, CardFooter } from "../ui/card";
import { QUOTES } from "./testimonal-quotes";
import Image from "next/image";
import { useState } from "react";
import { Button } from "../ui/button";

interface Testimonial {
  name: string;
  title: string;
  testimonial: string;
  source: string;
  image: string;
}

const TestimonalCard = ({
  quotes,
  className,
}: {
  quotes: Testimonial[];
  className?: string;
}) => (
  <div className={cn("col-span-1 flex flex-col gap-4", className)}>
    {quotes.map((item) => (
      <Card
        key={item.name}
        className="cursor-pointer transition-all duration-200 hover:shadow-lg"
      >
        <CardContent className="pt-6">
          <p className="text-[#737373]">&quot;{item.testimonial}&quot;</p>
        </CardContent>
        <CardFooter className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Image
              src={item.image}
              alt="profile picture"
              height={40}
              width={40}
              className="h-10 w-10 flex-none rounded-full object-contain"
            />
            <div className="flex flex-col items-start">
              <p className="font-semibold">{item.name}</p>
              <h6>{item.title}</h6>
            </div>
          </div>
          <Image
            src={`/images/icon-${item.source}.svg`}
            alt="platform icon"
            height={24}
            width={24}
          />
        </CardFooter>
      </Card>
    ))}
  </div>
);

const Testimonials = () => {
  const [readMore, setReadMore] = useState(false);
  const firstThirdIndex = Math.floor(QUOTES.length / 3);
  const secondThirdIndex = 2 * firstThirdIndex;

  const firstThird = QUOTES.slice(0, firstThirdIndex);
  const secondThird = QUOTES.slice(firstThirdIndex, secondThirdIndex);
  const lastThird = QUOTES.slice(secondThirdIndex);

  return (
    <>
      <div className="hidden lg:flex lg:h-[122px]" id="testimonials"></div>
      <section className="container relative mt-24 px-4 sm:px-8 lg:mt-0">
        <div
          className={`mx-auto max-w-5xl  ${
            readMore ? "max-h-[none]" : "max-h-[800px] overflow-hidden "
          }`}
        >
          <h3 className="text-center">
            Join thousands of users already using devlinks
          </h3>
          <p className="text-center text-[#737373]">Why people love devlinks</p>
          <div className="mt-16 grid grid-cols-1 gap-4 lg:grid-cols-3">
            <TestimonalCard quotes={firstThird} />
            <TestimonalCard quotes={secondThird} className="hidden lg:flex" />
            <TestimonalCard quotes={lastThird} className="hidden lg:flex" />
          </div>
        </div>
        {!readMore && (
          <>
            <div className="absolute bottom-20 left-0 right-0 h-[200px] w-full bg-gradient-to-t from-[#FAFAFA] to-transparent" />
            <Button
              type="button"
              variant="dlPrimary"
              onClick={() => setReadMore(true)}
              className="z-20 mx-auto mt-10 flex px-7"
            >
              Read More
            </Button>
          </>
        )}
      </section>
    </>
  );
};

export default Testimonials;
