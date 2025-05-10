
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 animate-fade-in">Get In Touch</h2>
          <p className="text-lg text-gray-300 animate-fade-in" style={{animationDelay: "200ms"}}>
            I'm currently open to new opportunities. Whether you have a project idea or just want to connect, feel free to reach out!
          </p>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{animationDelay: "400ms"}}>
          <Button 
            className="bg-black text-white hover:bg-gray-800 px-8 py-6 text-lg transition-transform hover:scale-105"
            asChild
          >
            <a href="mailto:amanshutosh.analytics@gmail.com">
              Email Me
            </a>
          </Button>
          
          <Button 
            variant="outline" 
            className="bg-black text-white hover:bg-gray-700 border-gray-700 flex items-center gap-2 px-8 py-6 text-lg transition-transform hover:scale-105" 
            asChild
          >
            <a href="/resume.pdf" download="Aman_Ashutosh_Resume.pdf">
              <Download className="w-5 h-5" />
              <span>Download Resume</span>
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
