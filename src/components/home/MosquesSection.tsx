
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import MosqueCard from "@/components/MosqueCard";
import { perthMosques } from "@/data/perthMosques";

const MosquesSection = () => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold text-muslim-dark">Mosques & Islamic Centers</h2>
            <p className="text-gray-600 mt-2">Find places of worship in Perth, Australia</p>
          </div>
          <Link to="/mosques" className="text-muslim-teal hover:text-muslim-teal/80 flex items-center font-medium">
            View All <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {perthMosques.slice(0, 3).map((mosque) => (
            <MosqueCard key={mosque.id} {...mosque} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MosquesSection;
