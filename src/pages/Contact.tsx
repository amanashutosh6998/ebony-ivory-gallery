
import Navbar from "@/components/Navbar";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ColorParticles from "@/components/ColorParticles";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      <div className="absolute inset-0 overflow-hidden">
        <ColorParticles colorScheme="purple-pink" />
      </div>
      <Navbar />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Contact;
