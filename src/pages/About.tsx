
import { lazy, Suspense } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutSection from "@/components/AboutSection";

const About = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <AboutSection />
      <Footer />
    </div>
  );
};

export default About;
