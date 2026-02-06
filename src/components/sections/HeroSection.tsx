import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { SplitText } from "@/components/ui/SpliteText";
import { StarBackground } from "@/components/ui/StarBackground";
import { HeroChip } from "@/components/ui/HeroSectionChip";
import { ArrowRight } from "lucide-react";
import { RollingText } from "@/components/ui/RollingText";

export function Hero() {
  return (
    <section
      id="home"
      className="relative pt-32 pb-0 md:pt-48 md:pb-0 overflow-hidden bg-[#050505] w-full"
    >
      {/* Background Gradients & Effects */}
      <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#FF5E32] rounded-full mix-blend-screen filter blur-[100px] opacity-20 pointer-events-none" />
      <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-[#3a21c0] rounded-full mix-blend-screen filter blur-[120px] opacity-10 pointer-events-none" />

      {/* Noise Texture */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Dynamic Stars */}
      <StarBackground />

      <div className="container max-w-[1440px] mx-auto px-4 flex flex-col items-center text-center relative z-10">
        {/* Badge */}
        <HeroChip />

        {/* Headline */}
        <h1 className="text-4xl md:text-7xl font-semibold tracking-tight mb-6 max-w-5xl text-white leading-none md:leading-[1.1]">
          <SplitText tag="span" text="The Ultimate B2B" className="block" />
          <span className="inline-block">
            <SplitText
              tag="span"
              text="Sourcing Platform "
              className="inline-block"
            />{" "}
            <SplitText
              tag="span"
              text="Proshar"
              className="text-[#FF5E32] ml-2 font-playfair italic font-semibold inline-block"
            />
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-white text-base md:text-lg max-w-2xl mb-10 leading-normal tracking-[-0.4px]">
          <RollingText text="Source directly from the best wholesalers. Compare prices, pick products, and get direct delivery. The all-in-one sourcing platform for retailers." />
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-5 mb-20">
          <Button
            size="lg"
            className="bg-[#3a21c0] hover:bg-[#3a21c0]/90 text-white rounded-[12px] text-base font-semibold h-[56px] px-8 w-full sm:w-[172px]"
          >
            Join Proshar
          </Button>
          <Button
            size="lg"
            className="rounded-[12px] text-base font-semibold h-[56px] px-2 w-full sm:w-[180px] bg-white text-[#808080] border border-[#e8e8e8] hover:bg-gray-50  gap-2"
          >
            <ArrowRight className="w-5 h-5" />
            Schedule Demo
          </Button>
        </div>

        {/* Hero Image / Dashboard Preview */}
        <div className="relative w-full max-w-6xl mx-auto group perspective-1000 mt-12 -mb-20 md:-mb-32">
          {/* Glow behind image */}
          <div className="absolute -inset-1 bg-gradient-to-t from-indigo-500/10 to-transparent rounded-[20px] blur-xl -z-10" />

          {/* Main Glass Container */}
          <div className="interactive-card relative rounded-[20px] border border-white/10 shadow-2xl bg-white/10 backdrop-blur-sm p-5">
            {/* Inner Image */}
            <div className="relative rounded-xl overflow-hidden bg-[#0B0B0F]">
              <Image
                src="/assets/headerbanner.svg"
                alt="Dashboard Interface"
                width={1160}
                height={825}
                className="w-full h-auto object-cover"
                priority
              />
              {/* Dark bottom fade gradient */}
              <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent" />
            </div>
          </div>
        </div>
      </div>

      {/* Section Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050505] to-transparent z-20 pointer-events-none" />
    </section>
  );
}
