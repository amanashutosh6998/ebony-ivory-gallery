import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 bg-black">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">Get In Touch</h2>
          <p className="text-lg text-gray-400">
            I'm currently open to new opportunities. Whether you have a project idea or just want to connect, feel free to reach out!
          </p>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <a href="mailto:amanshutosh.analytics@gmail.com" className="text-lg">
              Email Me
            </a>
          </Button>
          
          <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black flex items-center gap-2" asChild>
            <a href="/resume.pdf" download="Aman_Ashutosh_Resume.pdf">
              <Download className="w-4 h-4" />
              <span>Download Resume</span>
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
