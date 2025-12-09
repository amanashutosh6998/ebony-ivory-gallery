import { Github, Linkedin, Mail, Heart, Cloud, Bot } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="relative z-50 py-12 bg-gradient-to-t from-black to-transparent text-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0 flex space-x-6">
            <a 
              href="https://github.com/amanashutosh6998" 
              className="hover:text-gray-400 transition-colors flex items-center cursor-pointer" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
            >
              <Github className="w-5 h-5 mr-2" />
              <span>GitHub</span>
            </a>
            <a 
              href="https://www.linkedin.com/in/aman-ashutosh/" 
              className="hover:text-gray-400 transition-colors flex items-center cursor-pointer" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-5 h-5 mr-2" />
              <span>LinkedIn</span>
            </a>
            <a 
              href="mailto:amanashutosh.analytics@gmail.com" 
              className="hover:text-gray-400 transition-colors flex items-center cursor-pointer"
              aria-label="Email Contact"
            >
              <Mail className="w-5 h-5 mr-2" />
              <span>Email</span>
            </a>
          </div>
          
          <div>
            <p className="text-sm text-gray-400 flex items-center gap-2">
              Powered by
              <Tooltip>
                <TooltipTrigger asChild>
                  <a href="https://github.com/amanashutosh6998" target="_blank" rel="noopener noreferrer" className="hover:text-white cursor-pointer">
                    <Github className="w-5 h-5" />
                  </a>
                </TooltipTrigger>
                <TooltipContent>GitHub</TooltipContent>
              </Tooltip>
              <span>+</span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a href="https://lovable.ai" target="_blank" rel="noopener noreferrer" className="hover:text-white cursor-pointer">
                    <Heart className="w-5 h-5" />
                  </a>
                </TooltipTrigger>
                <TooltipContent>Lovable</TooltipContent>
              </Tooltip>
              <span>+</span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a href="https://aws.amazon.com" target="_blank" rel="noopener noreferrer" className="hover:text-white cursor-pointer">
                    <Cloud className="w-5 h-5" />
                  </a>
                </TooltipTrigger>
                <TooltipContent>AWS</TooltipContent>
              </Tooltip>
              <span>+</span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a href="https://claude.ai" target="_blank" rel="noopener noreferrer" className="hover:text-white cursor-pointer">
                    <Bot className="w-5 h-5" />
                  </a>
                </TooltipTrigger>
                <TooltipContent>Claude</TooltipContent>
              </Tooltip>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
