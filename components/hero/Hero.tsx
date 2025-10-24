
import { Button } from "@/components/ui/button";

interface HeroProps {
  heading?: string;
  description?: string;
  buttons?: {
    primary?: {
      text: string;
      url: string;
    }
  }
}

const Hero = ({
  heading = "More than just shorter links",
  description = "Build your brand's recognition and get detailed insights on how your links are perfoming",
  buttons = {
    primary: {
      text: "Get Started",
      url: "#",
    }
  },

}: HeroProps) => {
  return (
    <section className="container mx-auto max-w-6xl p-4 mt-10">
      <div className="grid items-center gap-10 md:grid-cols-2">

        {/* To Action */}
        <div className="order-2 md:order1 mx-auto flex flex-col items-center text-center md:ml-auto lg:max-w-3xl lg:items-start lg:text-left">
          <h1 className="my-6 text-pretty text-4xl font-bold lg:text-6xl xl:text-7xl">
            {heading}
          </h1>
          <p className="text-gray-400 mb-8 max-w-xl lg:text-xl">
            {description}
          </p>

          <div className="flex w-full flex-col items-center gap-2 sm:flex-row lg:justify-start">
            {buttons.primary && (
              <Button asChild variant="blue400" className="text-xl p-6 w-2/3 md:w-1/2 lg:w-1/3">
                <a href={buttons.primary.url}>{buttons.primary.text}</a>
              </Button>
            )}
          </div>
        </div>

        {/* Hero Image */}
        <div className="order-1 md:order-2 flex">
          <img
            src="/illustration-working.svg"
            alt="hero shortener"
            className="max-h-[600px] w-full rounded-md object-cover md:max-h-[800px]"
          />
        </div>

      </div>
    </section>
  );
};

export { Hero };
