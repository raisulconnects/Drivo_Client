import AvailableCarsSection from "@/components/Pages/HomePage/AvailableCarsSection";
import WhyChooseDrivo from "@/components/Pages/HomePage/ChooseSection";
import HeroSection from "@/components/Pages/HomePage/HeroSection";
import HowItWorks from "@/components/Pages/HomePage/HowItWorkSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AvailableCarsSection />
      <WhyChooseDrivo />
      <HowItWorks />
    </>
  );
}
