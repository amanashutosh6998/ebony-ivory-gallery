
import Navbar from "@/components/Navbar";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ParticleBackground from "@/components/ParticleBackground";

const Contact = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <ParticleBackground />
      <Navbar />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Contact;
