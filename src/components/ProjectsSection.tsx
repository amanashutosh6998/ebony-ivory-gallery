
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
      title: "ETL + Analytics",
      category: "Data Engineering",
      description: "End-to-end Customer Data Platform with analytics pipeline using S3, Lambda, Redshift & Step Functions.",
      github: "https://github.com/amanashutosh6998/aws-cdp-pipeline",
      path: "/aws-cdp-pipeline"
    },
    {
      title: "CRM Administrator",
      category: "Marketing Automation",
      description: "Deduplication, batch associations, and lifecycle stage mapping automation.",
      github: "https://github.com/amanashutosh6998/hubspot-crm-cleanup",
      path: "/hubspot-expert"
    },
  ];

  const operationsProjects: Project[] = [
    {
      title: "Lead Scoring Engine",
      category: "Marketing Ops",
      description: "Automated lead scoring and qualification system with behavioral tracking and predictive analytics.",
      github: "https://github.com/amanashutosh6998/lead-scoring-engine"
    },
    {
      title: "Campaign Attribution",
      category: "Marketing Ops", 
      description: "Multi-touch attribution modeling for campaign performance analysis and ROI optimization.",
      github: "https://github.com/amanashutosh6998/campaign-attribution"
    },
    {
      title: "Sales Pipeline Automation",
      category: "Sales Ops",
      description: "Automated deal progression, task assignments, and notification workflows for sales teams.",
      github: "https://github.com/amanashutosh6998/sales-pipeline-automation"
    },
    {
      title: "Territory Management",
      category: "Sales Ops",
      description: "Dynamic territory assignment and lead routing based on geographic and demographic criteria.",
      github: "https://github.com/amanashutosh6998/territory-management"
    }
  ];

  return (
    <section id="projects" className="py-24 bg-black">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">Featured Projects</h2>
          <p className="text-lg text-gray-400">
            A collection of my work focused on growth engineering, data pipelines, and automation.
          </p>
        </div>

        {/* Featured Projects */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16">
          {projects.map((project, index) => (
            <Card key={index} className="overflow-hidden border border-gray-800 bg-gray-900/50 hover:-translate-y-1 transition-transform duration-300">
              <CardContent className="p-6">
                <div className="px-2">
                  <div className="flex justify-between items-start mb-4">
                    <p className="text-sm text-gray-500 mb-2">{project.category}</p>
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

        {/* Operations and Automations Section */}
        <div className="mb-16">
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight">Operations and Automations</h3>
            <p className="text-lg text-gray-400">
              Streamlining business processes through intelligent automation and operational excellence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {operationsProjects.map((project, index) => (
              <Card key={index} className="overflow-hidden border border-gray-800 bg-gray-900/50 hover:-translate-y-1 transition-transform duration-300">
                <CardContent className="p-6">
                  <div className="px-2">
                    <div className="flex justify-between items-start mb-4">
                      <span className={`text-sm px-3 py-1 rounded-full ${
                        project.category === 'Marketing Ops' 
                          ? 'bg-blue-500/20 text-blue-400' 
                          : 'bg-green-500/20 text-green-400'
                      }`}>
                        {project.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-white">{project.title}</h3>
                    <p className="text-gray-400 mb-4">{project.description}</p>
                    <Button variant="secondary" className="bg-transparent border-white text-white hover:bg-white hover:text-black w-full" asChild>
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        View Project
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
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
