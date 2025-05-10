
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import ParticleBackground from "@/components/ParticleBackground";

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <ParticleBackground />
      <Navbar />
      <HeroSection />
      <Footer />
    </div>
  );
};

export default Index;
