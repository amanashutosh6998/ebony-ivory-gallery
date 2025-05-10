
import Navbar from "@/components/Navbar";
import CaseStudiesSection from "@/components/CaseStudiesSection";
import Footer from "@/components/Footer";
import ParticleBackground from "@/components/ParticleBackground";

const CaseStudies = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <ParticleBackground />
      <Navbar />
      <CaseStudiesSection />
      <Footer />
    </div>
  );
};

export default CaseStudies;
