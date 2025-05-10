
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Project {
  title: string;
  category: string;
  description: string;
  image: string;
}

const ProjectsSection = () => {
  const projects: Project[] = [
    {
      title: "Agency Website",
      category: "Web Design",
      description: "A clean, modern website for a digital agency with animated interactions",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop"
    },
    {
      title: "E-commerce Platform",
      category: "Web Development",
      description: "Full-featured online shop with custom product filtering and checkout",
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=2000&auto=format&fit=crop"
    },
    {
      title: "Mobile Banking App",
      category: "UI/UX Design",
      description: "User-friendly mobile banking experience with focus on accessibility",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=2000&auto=format&fit=crop"
    },
  ];

  return (
    <section id="projects" className="py-24 bg-black">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">My Projects</h2>
          <p className="text-lg text-gray-400">
            Here's a selection of my recent work. Each project was approached with careful attention to design, functionality, and user experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="overflow-hidden border-0 bg-transparent hover:-translate-y-1 transition-transform duration-300">
              <CardContent className="p-0">
                <div className="relative aspect-[16/10] mb-4 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="px-2">
                  <p className="text-sm text-gray-500 mb-2">{project.category}</p>
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-400 mb-4">{project.description}</p>
                  <Button variant="outline" className="border-white text-white hover:bg-gray-900">
                    View Project
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button className="bg-white text-black hover:bg-gray-200">
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
