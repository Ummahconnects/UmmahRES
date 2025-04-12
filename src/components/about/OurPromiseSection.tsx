
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin, Briefcase } from "lucide-react";

const OurPromiseSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-muslim-dark mb-8">Our Promise</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <div className="bg-muslim-light p-8 rounded-lg text-center">
              <div className="w-16 h-16 bg-muslim-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-muslim-teal" />
              </div>
              <p className="text-lg font-medium text-muslim-dark">
                "If a Muslim offers it, we'll find them."
              </p>
            </div>
            
            <div className="bg-muslim-light p-8 rounded-lg text-center">
              <div className="w-16 h-16 bg-muslim-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="h-8 w-8 text-muslim-teal" />
              </div>
              <p className="text-lg font-medium text-muslim-dark">
                "If they don't exist yet, we'll help build them."
              </p>
            </div>
          </div>
          
          <div className="mt-10">
            <h3 className="text-xl font-bold mb-6">Join Us</h3>
            <p className="text-gray-600 mb-8">
              Are you a Muslim business owner? Get listed and connect with the Ummah.
            </p>
            <Link to="/business-profile">
              <Button className="bg-muslim-teal hover:bg-muslim-teal/90" size="lg">
                List Your Business
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurPromiseSection;
