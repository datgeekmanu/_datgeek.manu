import HowItWorks from "@/components/HowItWorks";
import CTA from "@/components/Cta";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import Expertise from "@/components/Expertise";
import ProjectsSection from "@/components/ProjectsSection";
import CtaShowcase from "@/components/CtaShowcase";
import WhyWorkWithMe from "@/components/WhyWorkWithMe";
import Testimonials from "@/components/Testimonials";
import AboutMe from "@/components/AboutMe";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <WhyWorkWithMe />
      <Expertise />
      <ProjectsSection />
      <AboutMe />
      <Testimonials />
      <HowItWorks />
      <CtaShowcase />
      {/* <CTA /> */}
      <Footer />
    </div>
  );
}
