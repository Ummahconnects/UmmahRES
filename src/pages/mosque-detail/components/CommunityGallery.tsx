
import { Upload, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent 
} from "@/components/ui/card";
import { MosqueProps } from "@/components/MosqueCard";

interface CommunityGalleryProps {
  mosque: MosqueProps;
}

const CommunityGallery = ({ mosque }: CommunityGalleryProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4">Community Gallery</h2>
        <p className="text-gray-600 mb-4">
          Help build our community by sharing photos of {mosque.name}. We encourage community members to contribute up to 2 images per mosque.
        </p>
        
        <div className="mt-6">
          {mosque.communityImages && mosque.communityImages.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {mosque.communityImages.map((img, index) => (
                <div key={index} className="aspect-square rounded-md overflow-hidden">
                  <img 
                    src={img} 
                    alt={`Community image ${index + 1} of ${mosque.name}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
              <Camera className="h-12 w-12 mx-auto text-gray-400 mb-3" />
              <p className="text-gray-500 mb-2">No community images yet</p>
              <p className="text-gray-500 text-sm mb-4">Be the first to contribute!</p>
            </div>
          )}
        </div>
        
        <div className="mt-6">
          <Button className="w-full flex items-center justify-center">
            <Upload className="h-4 w-4 mr-2" />
            Contribute Images
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CommunityGallery;
