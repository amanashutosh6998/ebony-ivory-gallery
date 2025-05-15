
import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-12 bg-gradient-to-t from-black to-transparent text-white">
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
              GitHub
            </a>
            <a 
              href="https://www.linkedin.com/in/aman-ashutosh/" 
              className="hover:text-gray-400 transition-colors flex items-center cursor-pointer" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-5 h-5 mr-2" />
              LinkedIn
            </a>
            <a 
              href="mailto:amanashutosh.analytics@gmail.com" 
              className="hover:text-gray-400 transition-colors flex items-center cursor-pointer"
              aria-label="Email Contact"
            >
              <Mail className="w-5 h-5 mr-2" />
              Email
            </a>
          </div>
          
          <div>
            <p className="text-sm text-gray-400 flex items-center">
              Powered by <a href="https://github.com/amanashutosh6998" target="_blank" rel="noopener noreferrer" className="mx-1 inline-flex items-center hover:text-white cursor-pointer"><Github className="w-4 h-4 mr-1" />GitHub</a> + <a href="https://lovable.ai" target="_blank" rel="noopener noreferrer" className="ml-1 hover:text-white cursor-pointer">Lovable</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
