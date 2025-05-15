
import React from 'react';
import { Button } from "@/components/ui/button";
import { Download, FileText, Github, Linkedin, Mail, Briefcase, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";

const ResumeSection = () => {
  return (
    <section id="resume" className="py-24 relative bg-gradient-to-b from-black to-gray-900 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-[100px] transform -translate-y-1/2 -translate-x-1/4 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-[100px] transform translate-y-1/2 translate-x-1/4 animate-pulse" style={{animationDelay: "1s"}}></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-4xl mx-auto mb-16 text-center animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">Aman Ashutosh</h2>
          <div className="flex flex-wrap justify-center space-x-4 mb-8">
            <a href="mailto:amanashutosh.analytics@gmail.com" className="text-gray-300 hover:text-white flex items-center">
              <Mail className="mr-2 h-5 w-5" />
              amanashutosh.analytics@gmail.com
            </a>
            <a href="https://github.com/amanashutosh6998" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white flex items-center">
              <Github className="mr-2 h-5 w-5" />
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/aman-ashutosh/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white flex items-center">
              <Linkedin className="mr-2 h-5 w-5" />
              LinkedIn
            </a>
          </div>
          <p className="text-lg text-gray-300 animate-fade-in" style={{animationDelay: "200ms"}}>
            Growth Analyst with expertise in data analytics, marketing, and product development.
            Skilled in building ETL pipelines, CRM management, and driving business growth through data-driven strategies.
          </p>
        </div>

        <div className="grid gap-10 animate-fade-in" style={{animationDelay: "300ms"}}>
          {/* Experience Section */}
          <Card className="p-6 bg-black/40 backdrop-blur-lg border border-gray-800">
            <h3 className="text-2xl font-bold mb-6 text-white/90 flex items-center">
              <Briefcase className="mr-3 h-6 w-6" />
              Experience
            </h3>
            
            <div className="space-y-8">
              <div className="animate-fade-in" style={{animationDelay: "400ms"}}>
                <div className="flex flex-wrap justify-between items-start mb-2">
                  <h4 className="text-xl font-semibold text-white">Growth Analyst (Founder's Office)</h4>
                  <span className="text-gray-400 text-sm flex items-center">
                    <Calendar className="mr-1 h-4 w-4" />
                    04/2024 - Present
                  </span>
                </div>
                <h5 className="text-blue-400 mb-2 flex items-center">
                  <a href="https://www.gokenko.com/" target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center">
                    Kenko AI
                    <span className="ml-2 text-sm text-gray-400">(US B2B SaaS Booking/Fitness Software), Bengaluru</span>
                  </a>
                </h5>
                <ul className="text-gray-300 list-disc pl-5 space-y-2">
                  <li>
                    Built end-to-end ETL pipelines using Python and AWS-native tools to centralize data from CRM, billing, support, and product platforms. Designed a unified Customer Data Platform to enable company-wide reporting while ensuring GDPR-compliant data handling.
                  </li>
                  <li>
                    Developed an AI-powered outbound engine using Claude (Bedrock) for content generation, SendGrid for automated email delivery, and Vapi for voice-based follow-ups—enhancing personalization and increasing demo bookings by 25%.
                  </li>
                  <li>
                    CRM Cleanup & Data Governance: As the HubSpot owner, led structural cleanup and normalization of CRM data—fixing object associations, lifecycle stage misalignments, and integration gaps. Enhanced lead assignment logic and ensured cross-platform data consistency.
                  </li>
                  <li>
                    Growth Marketing & Attribution: Engineered performance analytics across CAC, ROAS, and CLTV for outbound marketing, improving ad spend efficiency by 38%. Built custom attribution models that reduced CAC by 22% through channel and cohort-level optimization.
                  </li>
                  <li>
                    Built sales analytics for SDRs, AEs, and TSMs —tracking outbound lead flow, deal movement, and territory activity. Designed lead scoring models and workflows that improved funnel visibility and informed sales strategy.
                  </li>
                  <li>
                    Customer Success & Churn Frameworks: Tracked feature adoption, onboarding progress, and revenue retention. Developed churn risk models and product engagement analytics that improved Pulse and reduced churn by 8%.
                  </li>
                  <li>
                    Product Feedback & Engineering Analytics: Built reporting using Linear and Intercom to track bug resolution timelines and product feature requests. Enabled the Product team to prioritize development efforts based on ticket volume, closure trends, and user-reported feedback.
                  </li>
                  <li>
                    Automated MIS & Cross-functional Reporting: Built and maintained fully automated MIS reports using Google Sheets, covering Sales, Marketing, Finance, and Customer Success. Enabled real-time visibility into business KPIs and reduced manual reporting efforts by 90%.
                  </li>
                </ul>
              </div>
              
              <div className="animate-fade-in" style={{animationDelay: "500ms"}}>
                <div className="flex flex-wrap justify-between items-start mb-2">
                  <h4 className="text-xl font-semibold text-white">Marketing Analyst Intern</h4>
                  <span className="text-gray-400 text-sm flex items-center">
                    <Calendar className="mr-1 h-4 w-4" />
                    11/2023 - 04/2024
                  </span>
                </div>
                <h5 className="text-blue-400 mb-2 flex items-center">
                  <a href="https://www.newtonschool.co/" target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center">
                    Newton School
                    <span className="ml-2 text-sm text-gray-400">(EdTech company offering online and bachelor's programs), Bengaluru</span>
                  </a>
                </h5>
                <ul className="text-gray-300 list-disc pl-5 space-y-2">
                  <li>
                    Built SQL queries and Power BI dashboards to track key marketing KPIs (CTR, CPL, CPP, CAC, ROAS), driving campaign optimization.
                  </li>
                  <li>
                    Performed statistical analysis to identify high-performing segments, enabling an 18% increase in overall conversion rates through budget reallocation.
                  </li>
                  <li>
                    Conducted A/B tests and ad hoc analyses to support performance strategy and forecasting.
                  </li>
                </ul>
              </div>
            </div>
          </Card>
          
          {/* Education Section */}
          <Card className="p-6 bg-black/40 backdrop-blur-lg border border-gray-800 animate-fade-in" style={{animationDelay: "600ms"}}>
            <h3 className="text-2xl font-bold mb-6 text-white/90 flex items-center">
              <FileText className="mr-3 h-6 w-6" />
              Education
            </h3>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-xl font-semibold text-white">PGP - Data Science and Analytics</h4>
                  <span className="text-gray-400 text-sm">12/2022 - 08/2023</span>
                </div>
                <h5 className="text-blue-400">Imarticus Learning, Bengaluru</h5>
              </div>
              
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-xl font-semibold text-white">PGDM - Marketing Management</h4>
                  <span className="text-gray-400 text-sm">01/2022 - 12/2022</span>
                </div>
                <h5 className="text-blue-400">Himalayan University, Itanagar</h5>
              </div>

              <div>
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-xl font-semibold text-white">B.Com (Honours)</h4>
                  <span className="text-gray-400 text-sm">06/2018 - 11/2021</span>
                </div>
                <h5 className="text-blue-400">Patna University, Patna</h5>
              </div>
            </div>
          </Card>
          
          {/* Skills Section */}
          <Card className="p-6 bg-black/40 backdrop-blur-lg border border-gray-800 animate-fade-in" style={{animationDelay: "700ms"}}>
            <h3 className="text-2xl font-bold mb-6 text-white/90 flex items-center">
              <FileText className="mr-3 h-6 w-6" />
              Skills
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <div className="bg-gray-900/50 p-3 rounded-md">SQL</div>
              <div className="bg-gray-900/50 p-3 rounded-md">Python</div>
              <div className="bg-gray-900/50 p-3 rounded-md">Prompt Engineering</div>
              <div className="bg-gray-900/50 p-3 rounded-md">Google Sheets</div>
              <div className="bg-gray-900/50 p-3 rounded-md">AWS RedShift</div>
              <div className="bg-gray-900/50 p-3 rounded-md">AWS S3</div>
              <div className="bg-gray-900/50 p-3 rounded-md">AWS Lambda</div>
              <div className="bg-gray-900/50 p-3 rounded-md">AWS Step Function</div>
              <div className="bg-gray-900/50 p-3 rounded-md">AWS Athena</div>
              <div className="bg-gray-900/50 p-3 rounded-md">AWS Bedrock</div>
              <div className="bg-gray-900/50 p-3 rounded-md">Power BI/Looker Studio</div>
              <div className="bg-gray-900/50 p-3 rounded-md">HubSpot</div>
              <div className="bg-gray-900/50 p-3 rounded-md">PostHog</div>
              <div className="bg-gray-900/50 p-3 rounded-md">Mix Panel</div>
              <div className="bg-gray-900/50 p-3 rounded-md">ETL</div>
              <div className="bg-gray-900/50 p-3 rounded-md">Google Analytics 4</div>
              <div className="bg-gray-900/50 p-3 rounded-md">Funnel Analysis</div>
              <div className="bg-gray-900/50 p-3 rounded-md">Web Analytics</div>
              <div className="bg-gray-900/50 p-3 rounded-md">CRM Ops</div>
              <div className="bg-gray-900/50 p-3 rounded-md">Revenue Ops</div>
              <div className="bg-gray-900/50 p-3 rounded-md">Lifecycle Cohort Analysis</div>
              <div className="bg-gray-900/50 p-3 rounded-md">CRM Analytics</div>
              <div className="bg-gray-900/50 p-3 rounded-md">Data Analytics</div>
              <div className="bg-gray-900/50 p-3 rounded-md">Product Analytics</div>
              <div className="bg-gray-900/50 p-3 rounded-md">Problem Solving</div>
              <div className="bg-gray-900/50 p-3 rounded-md">Data Reporting</div>
            </div>
          </Card>
        </div>

        <div className="mt-12 flex justify-center animate-fade-in" style={{animationDelay: "800ms"}}>
          <Button 
            className="bg-black/50 backdrop-blur-sm text-white hover:bg-gray-800 border border-gray-700 flex items-center gap-2 px-8 py-6 text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20"
            asChild
          >
            <a href="/resume.pdf" download="Aman_Ashutosh_Resume.pdf">
              <Download className="w-5 h-5" />
              <span>Download Full Resume</span>
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ResumeSection;
