
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutSection from "@/components/AboutSection";
import ColorParticles from "@/components/ColorParticles";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col relative bg-black text-white">
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <ColorParticles colorScheme="blue-cyan" />
      </div>
      <Navbar className="relative z-10" />
      <AboutSection className="relative z-10" />
      <div className="mt-auto relative z-10">
        <Footer />
      </div>
    </div>
  );
};

export default About;
