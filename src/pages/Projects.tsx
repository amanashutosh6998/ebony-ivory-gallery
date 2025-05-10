
import Navbar from "@/components/Navbar";
import ProjectsSection from "@/components/ProjectsSection";
import Footer from "@/components/Footer";
import ParticleBackground from "@/components/ParticleBackground";

const Projects = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <ParticleBackground />
      <Navbar />
      <ProjectsSection />
      <Footer />
    </div>
  );
};

export default Projects;
