
import { useParams } from "react-router-dom";
import { MapPin } from "lucide-react";
import Layout from "@/components/Layout";
import { perthMosques } from "@/data/perthMosques";
import { mockMosques } from "@/pages/mosques/mockMosques";
import ReviewSection from "@/components/reviews/ReviewSection";

// Import components
import MosqueDetailHeader from "./components/MosqueDetailHeader";
import PrayerTimesCard from "./components/PrayerTimesCard";
import CommunityGallery from "./components/CommunityGallery";
import MosqueSidebar from "./components/MosqueSidebar";
import MosqueNotFound from "./components/MosqueNotFound";

const MosqueDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  
  // Combine both mock and Perth mosques data
  const allMosques = [...mockMosques, ...perthMosques];
  const mosque = allMosques.find(m => m.id === id);

  if (!mosque) {
    return (
      <Layout>
        <MosqueNotFound />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <MosqueDetailHeader mosque={mosque} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <PrayerTimesCard mosque={mosque} />
            <CommunityGallery mosque={mosque} />
            
            {/* Reviews Section */}
            <ReviewSection 
              entityName={mosque.name}
              entityType="mosque"
              entityId={mosque.id}
              reviewPrompt={`Share your experience visiting ${mosque.name}...`}
            />
          </div>

          {/* Sidebar */}
          <MosqueSidebar mosque={mosque} />
        </div>
      </div>
    </Layout>
  );
};

export default MosqueDetailPage;
