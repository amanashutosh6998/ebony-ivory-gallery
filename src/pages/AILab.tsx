
import Navbar from "@/components/Navbar";
import AILabSection from "@/components/AILabSection";
import Footer from "@/components/Footer";
import ParticleBackground from "@/components/ParticleBackground";

const AILab = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <ParticleBackground />
      <Navbar />
      <AILabSection />
      <Footer />
    </div>
  );
};

export default AILab;
