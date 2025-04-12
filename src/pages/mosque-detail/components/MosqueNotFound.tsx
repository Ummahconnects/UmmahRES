
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const MosqueNotFound = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-muslim-dark mb-4">Mosque Not Found</h1>
        <p className="text-gray-600 mb-6">The mosque you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link to="/mosques">Back to Mosques</Link>
        </Button>
      </div>
    </div>
  );
};

export default MosqueNotFound;
