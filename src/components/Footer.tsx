
const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-12 bg-black text-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <a href="#home" className="text-2xl font-bold tracking-tighter">PORTFOLIO</a>
          </div>
          
          <div className="flex space-x-6 mb-6 md:mb-0">
            <a href="#" className="hover:text-gray-400 transition-colors">Twitter</a>
            <a href="#" className="hover:text-gray-400 transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-gray-400 transition-colors">GitHub</a>
            <a href="#" className="hover:text-gray-400 transition-colors">Instagram</a>
          </div>
          
          <div>
            <p className="text-sm text-gray-400">
              &copy; {currentYear} John Doe. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
