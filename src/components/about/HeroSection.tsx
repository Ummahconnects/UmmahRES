
import { ReactNode } from "react";

interface HeroSectionProps {
  title: string;
  description: ReactNode;
}

const HeroSection = ({ title, description }: HeroSectionProps) => {
  return (
    <section className="bg-muslim-blue text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{title}</h1>
          <p className="text-xl leading-relaxed mb-8">{description}</p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
