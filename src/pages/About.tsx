
import Navbar from "@/components/Navbar";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import ParticleBackground from "@/components/ParticleBackground";

const About = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <ParticleBackground />
      <Navbar />
      <AboutSection />
      <Footer />
    </div>
  );
};

export default About;
