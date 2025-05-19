
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { Link } from "react-router-dom";

interface Project {
  title: string;
  category: string;
  description: string;
  github: string;
  path?: string;
}

const ProjectsSection = () => {
  const projects: Project[] = [
    {
      title: "AWS CDP Pipeline",
      category: "Data Engineering",
      description: "End-to-end Customer Data Platform using S3, Lambda, Redshift & Step Functions.",
      github: "https://github.com/amanashutosh6998/aws-cdp-pipeline"
    },
    {
      title: "HubSpot Expert",
      category: "Marketing Automation",
      description: "Deduplication, batch associations, and lifecycle stage mapping automation.",
      github: "https://github.com/amanashutosh6998/hubspot-crm-cleanup",
      path: "/hubspot-expert"
    },
    {
      title: "Intercom ETL Automation",
      category: "Data Pipeline",
      description: "Async pipeline to extract, clean, and enrich support conversations.",
      github: "https://github.com/amanashutosh6998/intercom-etl"
    },
  ];

  return (
    <section id="projects" className="py-24 bg-black">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">Featured Projects</h2>
          <p className="text-lg text-gray-400">
            A collection of my GitHub projects focused on growth engineering, data pipelines, and automation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="overflow-hidden border border-gray-800 bg-gray-900/50 hover:-translate-y-1 transition-transform duration-300">
              <CardContent className="p-6">
                <div className="px-2">
                  <div className="flex justify-between items-start mb-4">
                    <p className="text-sm text-gray-500 mb-2">{project.category}</p>
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
                      <Github size={20} />
                    </a>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white">{project.title}</h3>
                  <p className="text-gray-400 mb-4">{project.description}</p>
                  <Button variant="secondary" className="bg-transparent border-white text-white hover:bg-white hover:text-black w-full" asChild>
                    {project.path ? (
                      <Link to={project.path}>
                        View Project
                      </Link>
                    ) : (
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        View Project
                      </a>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button className="bg-white text-black hover:bg-gray-200" asChild>
            <a href="https://github.com/amanashutosh6998" target="_blank" rel="noopener noreferrer">
              View All Projects
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
