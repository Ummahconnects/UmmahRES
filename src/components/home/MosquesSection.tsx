
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import MosqueCard, { MosqueProps } from "@/components/MosqueCard";

// Mock data for mosques
const mockMosques: MosqueProps[] = [
  {
    id: "1",
    name: "Masjid Al-Noor",
    type: "Islamic Center",
    address: "123 Faith Ave, Brooklyn, NY",
    image: "https://images.unsplash.com/photo-1585129918712-9ed816168e2f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
    jumuahTime: "1:30 PM",
    isOpen: true,
    featured: true,
    facilities: ["Women's Section", "Weekend School", "Parking"]
  },
  {
    id: "2",
    name: "Masjid Al-Huda",
    type: "Sunni Mosque",
    address: "456 Peace St, Chicago, IL",
    image: "https://images.unsplash.com/photo-1619982690218-7ad5365b2767?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
    jumuahTime: "1:00 PM",
    isOpen: true,
    facilities: ["Islamic Library", "Funeral Services"]
  },
  {
    id: "3",
    name: "Islamic Foundation Center",
    type: "Islamic Center",
    address: "789 Unity Dr, Houston, TX",
    image: "https://images.unsplash.com/photo-1510060615691-148d98db8d46?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
    jumuahTime: "2:00 PM",
    isOpen: true,
    facilities: ["Weekend School", "Wudu Facilities", "Wheelchair Access"]
  }
];

const MosquesSection = () => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold text-muslim-dark">Mosques & Islamic Centers</h2>
            <p className="text-gray-600 mt-2">Find places of worship in your area</p>
          </div>
          <Link to="/mosques" className="text-muslim-teal hover:text-muslim-teal/80 flex items-center font-medium">
            View All <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockMosques.map((mosque) => (
            <MosqueCard key={mosque.id} {...mosque} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MosquesSection;
