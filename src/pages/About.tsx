
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutSection from "@/components/AboutSection";
import ColorParticles from "@/components/ColorParticles";

const About = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="absolute inset-0 overflow-hidden">
        <ColorParticles colorScheme="blue-cyan" />
      </div>
      <Navbar />
      <AboutSection />
      <Footer />
    </div>
  );
};

export default About;
