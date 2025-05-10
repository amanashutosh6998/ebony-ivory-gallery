
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    
    // Simulate form submission
    toast({
      title: "Message sent!",
      description: "Thanks for reaching out. I'll get back to you soon.",
    });
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  return (
    <section id="contact" className="py-24 bg-gray-900">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">Get In Touch</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Interested in working together? Feel free to contact me for any project ideas or collaborations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-bold mb-4">Contact Information</h3>
              <p className="mb-6 text-gray-400">
                I'm currently available for freelance work and full-time positions. 
                Don't hesitate to reach out if you have a project in mind.
              </p>
              
              <div className="space-y-4">
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-gray-400">amanshutosh.analytics.com</p>
                </div>
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-gray-400">Bengaluru, KA</p>
                </div>
                <div>
                  <p className="font-medium">Social</p>
                  <div className="flex space-x-4 mt-2">
                    <a href="#" className="text-white hover:text-gray-400 transition-colors">Twitter</a>
                    <a href="#" className="text-white hover:text-gray-400 transition-colors">LinkedIn</a>
                    <a href="#" className="text-white hover:text-gray-400 transition-colors">GitHub</a>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <Input
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="border-gray-700 bg-gray-800/50 focus:border-white focus-visible:ring-0 text-white"
                    />
                  </div>
                  <div>
                    <Input
                      name="email"
                      type="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="border-gray-700 bg-gray-800/50 focus:border-white focus-visible:ring-0 text-white"
                    />
                  </div>
                  <div>
                    <Textarea
                      name="message"
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="border-gray-700 bg-gray-800/50 focus:border-white focus-visible:ring-0 text-white"
                    />
                  </div>
                  <Button 
                    type="submit"
                    className="w-full bg-white text-black hover:bg-gray-200"
                  >
                    Send Message
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
