import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import Features from "@/components/sections/Features";
import HowItWorks from "@/components/sections/HowItWorks";
import Faq from "@/components/sections/Faq";
import Cta from "@/components/sections/Cta";

export default function App() {
  return (
    <div className="flex flex-col items-start w-full">
      <Hero />
      <Problem />
      <Features />
      <HowItWorks />
      <Faq />
      <Cta />
    </div>
  );
}
