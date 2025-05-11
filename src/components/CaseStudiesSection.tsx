
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

interface CaseStudy {
  title: string;
  problem: string;
  solution: string;
  tools: string[];
  impact: string;
  image?: string;
}

const CaseStudiesSection = () => {
  const [activeStudy, setActiveStudy] = useState<number | null>(null);
  
  const caseStudies: CaseStudy[] = [
    {
      title: "E-commerce Conversion Optimization",
      problem: "An e-commerce client was experiencing high cart abandonment rates and poor conversion on product pages.",
      solution: "Implemented A/B testing framework and optimized checkout flow. Reduced form fields and added social proof elements.",
      tools: ["Google Analytics", "Optimizely", "HotJar", "Python"],
      impact: "34% increase in conversion rate and 22% reduction in cart abandonment within 3 months.",
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=2000&auto=format&fit=crop"
    },
    {
      title: "SaaS User Retention Strategy",
      problem: "B2B SaaS client struggling with high churn rates (>8% monthly) and poor feature adoption.",
      solution: "Built an engagement scoring model to identify at-risk accounts. Implemented automated onboarding and education workflows.",
      tools: ["SQL", "Mixpanel", "Customer.io", "Intercom"],
      impact: "Reduced churn to 3.5% and increased feature adoption by 47% across all customer segments.",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop"
    },
    {
      title: "Marketing Attribution Framework",
      problem: "Marketing team unable to accurately attribute conversions across complex multi-channel campaigns.",
      solution: "Built a custom multi-touch attribution model using data from advertising platforms, web analytics, and CRM.",
      tools: ["BigQuery", "Redshift", "dbt", "Tableau"],
      impact: "Reallocated 35% of marketing budget based on findings, yielding 28% improvement in CAC and higher ROI.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop"
    },
  ];

  const toggleStudy = (index: number) => {
    setActiveStudy(activeStudy === index ? null : index);
  };

  return (
    <section id="case-studies" className="py-24 bg-black">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">Case Studies</h2>
          <p className="text-lg text-gray-400">
            Real-world problems solved with a data-driven approach to growth and optimization.
          </p>
        </div>

        <div className="space-y-12">
          {caseStudies.map((study, index) => (
            <Card key={index} className="overflow-hidden border border-gray-800 bg-gray-900/20">
              <CardContent className="p-0">
                <div className="grid md:grid-cols-5">
                  {study.image && (
                    <div className="md:col-span-2 h-64 md:h-auto relative">
                      <img 
                        src={study.image} 
                        alt={study.title} 
                        className="w-full h-full object-cover object-center"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent md:bg-gradient-to-t"></div>
                      <h3 className="absolute bottom-4 left-4 text-2xl font-bold md:hidden text-white">{study.title}</h3>
                    </div>
                  )}
                  <div className={`p-6 md:col-span-${study.image ? '3' : '5'}`}>
                    <h3 className="text-2xl font-bold mb-4 hidden md:block text-white">{study.title}</h3>
                    
                    {activeStudy === index ? (
                      <div className="animate-fade-in">
                        <div className="mb-4">
                          <h4 className="text-lg font-medium mb-2">Problem</h4>
                          <p className="text-gray-400">{study.problem}</p>
                        </div>
                        
                        <div className="mb-4">
                          <h4 className="text-lg font-medium mb-2">Solution</h4>
                          <p className="text-gray-400">{study.solution}</p>
                        </div>
                        
                        <div className="mb-4">
                          <h4 className="text-lg font-medium mb-2">Tools Used</h4>
                          <div className="flex flex-wrap gap-2">
                            {study.tools.map((tool, i) => (
                              <span key={i} className="bg-gray-800 text-gray-300 px-3 py-1 text-sm rounded-full">
                                {tool}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div className="mb-6">
                          <h4 className="text-lg font-medium mb-2">Business Impact</h4>
                          <p className="text-gray-400">{study.impact}</p>
                        </div>
                        
                        <Button 
                          onClick={() => toggleStudy(index)}
                          variant="default"
                          className="bg-black text-white hover:bg-gray-800"
                        >
                          Close
                        </Button>
                      </div>
                    ) : (
                      <div>
                        <p className="text-gray-400 mb-6 line-clamp-2">{study.problem}</p>
                        <Button 
                          onClick={() => toggleStudy(index)}
                          className="bg-black text-white hover:bg-gray-800"
                        >
                          Read Case Study
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
