/* eslint-disable @typescript-eslint/no-misused-promises */
import { CheckCircle, CheckCircle2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Separator } from "../ui/separator";
import { cn } from "~/lib/utils";
import { Button } from "../ui/button";
import { useRouter } from "next/router";

interface PricingCardProps {
  title: string;
  description: string;
  price: string;
  properties: string[];
  className?: string;
  includeButton?: boolean;

  includeComingSoon?: boolean;
}

const PricingCard = ({
  title,
  description,
  price,
  properties,
  className,
  includeButton = false,
  includeComingSoon = false,
}: PricingCardProps) => {
  const router = useRouter();

  return (
    <Card
      className={cn(
        "relative cursor-pointer transition-all duration-200 sm:hover:scale-105 sm:hover:shadow-lg sm:hover:outline sm:hover:outline-2 sm:hover:outline-offset-2 sm:hover:outline-[#633CFF]",
        className,
      )}
    >
      {includeComingSoon && (
        <div className="absolute bottom-0 left-1/2 z-10 -translate-x-1/2 translate-y-1/2 transform rounded-lg bg-[#633CFF] px-4">
          <p className="font-semibold text-white">Coming soon!</p>
        </div>
      )}
      <CardHeader>
        <CardTitle className="">{title}</CardTitle>
        <CardDescription className="text-[#737373]">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col justify-between">
        <div>
          <span className="flex text-2xl font-bold">{`${price}`}</span>
          <div className="mt-6">
            {properties.map((item, index) => (
              <>
                <div className="flex items-center gap-2" key={item}>
                  {index === 0 ? <CheckCircle /> : <CheckCircle2 />}
                  <p className="text-sm">{item}</p>
                </div>
                {index < properties.length - 1 && (
                  <Separator className="my-2" />
                )}
              </>
            ))}
          </div>
        </div>
      </CardContent>
      {includeButton && (
        <CardFooter className="lg:absolute lg:bottom-0 lg:w-full">
          <Button
            className="w-full"
            variant="dlPrimary"
            onClick={() => router.push("/sign-up")}
          >
            Get Started!
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

const Pricing = () => {
  return (
    <section
      className="container mt-16 px-4 pb-16 sm:px-8 sm:pb-28 lg:mt-20"
      id="pricing"
    >
      <div className="mx-auto max-w-4xl">
        <h3 className="text-center">Pricing</h3>
        <p className="text-center text-[#737373]">
          Feature-packed tiers for every user
        </p>
        <div className="mt-16 grid grid-cols-1 gap-6 lg:mt-20 lg:grid-cols-3">
          <PricingCard
            title="Trial"
            description="Create a personalized DevLinks profile."
            price="Free"
            properties={["5 included links", "Unlimited link sharing"]}
            includeButton
          />
          <PricingCard
            title="Premium"
            description="DevLinks profile with extended customization options."
            price="$10 / month"
            properties={[
              "Unlimited Links",
              "Extended Themes",
              "Featured in Devlinks Gallery",
            ]}
            includeComingSoon
            className="md:scale-105 md:shadow-lg"
          />
          <PricingCard
            title="Professional"
            description="DevLinks profile for businesses with SEO and payment integrations."
            price="$20 / month"
            properties={[
              "Unlimited Links",
              "Extended Themes",
              "Featured in Devlinks Gallery",
              "LinkedIn integration",
              "Search engine optimization",
            ]}
            includeComingSoon
          />
        </div>
      </div>
    </section>
  );
};

export default Pricing;
