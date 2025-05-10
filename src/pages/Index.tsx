
import { lazy, Suspense } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Lazy load non-critical components
const HeroSection = lazy(() => import('@/components/HeroSection'));
const AboutSection = lazy(() => import('@/components/AboutSection'));
const ParticleBackground = lazy(() => import('@/components/ParticleBackground'));

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Suspense fallback={<div className="min-h-screen bg-black"></div>}>
        <ParticleBackground />
      </Suspense>
      <Navbar />
      
      <Suspense fallback={
        <div className="h-screen flex items-center justify-center">
          <div className="text-2xl text-gray-500">Loading...</div>
        </div>
      }>
        <HeroSection />
      </Suspense>
      
      <Suspense fallback={<div className="h-96 bg-gradient-to-b from-black to-[#050516]"></div>}>
        <AboutSection />
      </Suspense>
      
      <Footer />
    </div>
  );
};

export default Index;
