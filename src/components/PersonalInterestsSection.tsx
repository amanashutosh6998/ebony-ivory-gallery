
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Music, Headphones } from "lucide-react";

const PersonalInterestsSection = () => {
  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-b from-black to-gray-900">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-0 w-1/3 h-1/3 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-[100px] transform translate-x-1/2"></div>
        <div className="absolute bottom-1/4 left-0 w-1/3 h-1/3 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-full blur-[100px] transform -translate-x-1/2"></div>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            Personal Interests
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Beyond data and analytics, I explore creative pursuits that fuel my passion for innovation
          </p>
        </div>

        {/* Music Production Card */}
        <div className="max-w-2xl mx-auto">
          <Card className="overflow-hidden border border-gray-800 bg-gray-800/30 backdrop-blur-sm hover:bg-gray-800/50 transition-all duration-300 animate-fade-in" style={{ animationDelay: "300ms" }}>
            <CardContent className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg">
                  <Music className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Music Production</h3>
                  <p className="text-gray-400">Audio Engineering & Creative Expression</p>
                </div>
              </div>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                I channel my analytical mindset into music production, working with various artists and genres. 
                This creative outlet helps me approach problem-solving from different angles and brings balance 
                to my technical work.
              </p>
              
              <div className="flex items-center gap-4 mb-6">
                <Headphones className="h-5 w-5 text-purple-400" />
                <span className="text-gray-400">Production portfolio showcasing collaborative work across multiple genres</span>
              </div>
              
              <Button 
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 border-0 w-full transition-all duration-300 transform hover:scale-105"
                asChild
              >
                <Link to="/music-production">
                  Explore My Music Work
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PersonalInterestsSection;
