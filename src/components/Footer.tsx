
import { Github } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-12 bg-black text-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <a href="#home" className="text-2xl font-bold tracking-tighter">Aman Ashutosh</a>
          </div>
          
          <div className="flex space-x-6 mb-6 md:mb-0">
            <a href="https://github.com/amanashutosh6998" className="hover:text-gray-400 transition-colors" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://linkedin.com/in/amanashutosh" className="hover:text-gray-400 transition-colors" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="mailto:amanshutosh.analytics@gmail.com" className="hover:text-gray-400 transition-colors">Email</a>
          </div>
          
          <div>
            <p className="text-sm text-gray-400 flex items-center">
              Powered by <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="mx-1 inline-flex items-center hover:text-white"><Github className="w-4 h-4 mr-1" />GitHub</a> + <a href="https://lovable.ai" target="_blank" rel="noopener noreferrer" className="ml-1 hover:text-white">Lovable</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
