
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Award, 
  BadgeDollarSign, 
  ChevronRight, 
  Globe, 
  Sparkles,
  Star
} from "lucide-react";

interface SponsorData {
  id: string;
  name: string;
  description: string;
  logo: string;
  link: string;
  tagline: string;
}

const sponsorData: SponsorData[] = [
  {
    id: "1",
    name: "Global Halal Ventures",
    description: "Supporting ethical businesses worldwide with premium investment opportunities and sustainable growth strategies.",
    logo: "https://images.unsplash.com/photo-1556742393-d75f468bfcb0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    link: "/business-profile/global-halal",
    tagline: "Ethical Investments, Global Impact"
  },
  {
    id: "2",
    name: "Al-Baraka International",
    description: "Connecting businesses across borders with innovative Shariah-compliant solutions and trusted partnership networks.",
    logo: "https://images.unsplash.com/photo-1551038247-3d9af20df552?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    link: "/business-profile/al-baraka",
    tagline: "Building Bridges, Creating Value"
  }
];

const MajorSponsorCampaign = () => {
  const [currentSponsor, setCurrentSponsor] = useState<SponsorData>(sponsorData[0]);
  const [animating, setAnimating] = useState(false);
  
  useEffect(() => {
    if (sponsorData.length <= 1) return;
    
    const interval = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        const currentIndex = sponsorData.findIndex(s => s.id === currentSponsor.id);
        const nextIndex = (currentIndex + 1) % sponsorData.length;
        setCurrentSponsor(sponsorData[nextIndex]);
        setTimeout(() => setAnimating(false), 100);
      }, 500);
    }, 15000);
    
    return () => clearInterval(interval);
  }, [currentSponsor]);

  return (
    <section className="relative py-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-muslim-light via-white to-amber-50 opacity-80 z-0"></div>
      
      <div className="absolute inset-0 z-0">
        {[...Array(20)].map((_, i) => (
          <Star
            key={i}
            className="absolute text-amber-300 animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: Math.random() * 0.7 + 0.3,
              width: `${Math.random() * 20 + 10}px`,
              height: `${Math.random() * 20 + 10}px`,
            }}
            fill="currentColor"
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-amber-400 to-muslim-gold text-white font-bold text-sm">
            <BadgeDollarSign className="h-4 w-4 mr-2" />
            CORPORATE SPONSOR SPOTLIGHT
          </div>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold text-center text-muslim-dark mb-4">
          Our Distinguished Corporate Sponsors
        </h2>
        
        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
          Showcasing organizations committed to supporting the Muslim business ecosystem worldwide
        </p>
        
        <div 
          className={`relative bg-white rounded-xl shadow-xl overflow-hidden transition-all duration-500 ${animating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}
        >
          <div className="absolute inset-0 border-4 border-muslim-gold rounded-xl"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            <div className="h-64 md:h-auto overflow-hidden relative flex items-center justify-center p-6">
              <img 
                src={currentSponsor.logo} 
                alt={currentSponsor.name} 
                className="object-contain max-h-full max-w-full rounded-lg shadow-md"
              />
              <div className="absolute top-4 left-4">
                <div className="flex items-center bg-muslim-gold text-white px-3 py-1 rounded-full text-sm font-medium">
                  <Award className="h-4 w-4 mr-1" />
                  Corporate Sponsor
                </div>
              </div>
            </div>
            
            <div className="p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-2xl font-bold text-muslim-dark">
                    {currentSponsor.name}
                  </h3>
                  <Sparkles className="h-6 w-6 text-muslim-gold" />
                </div>
                
                <p className="text-muslim-gold font-medium italic mb-4">
                  "{currentSponsor.tagline}"
                </p>
                
                <p className="text-gray-600 mb-6">
                  {currentSponsor.description}
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  className="bg-muslim-gold hover:bg-muslim-gold/90 flex-1"
                >
                  <Link to={currentSponsor.link}>
                    View Profile <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
                
                <Button
                  asChild
                  variant="outline"
                  className="border-muslim-gold text-muslim-gold hover:bg-muslim-gold/10 flex-1"
                >
                  <Link to="/sales">
                    Become a Sponsor <Globe className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          
          {sponsorData.length > 1 && (
            <div className="flex justify-center p-4">
              {sponsorData.map((sponsor) => (
                <button
                  key={sponsor.id}
                  onClick={() => setCurrentSponsor(sponsor)}
                  className={`h-2 w-2 mx-1 rounded-full transition-all ${
                    sponsor.id === currentSponsor.id 
                      ? 'bg-muslim-gold w-6' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`View ${sponsor.name}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MajorSponsorCampaign;
