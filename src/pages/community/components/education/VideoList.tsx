
import { Star } from "lucide-react";
import ContentCard from "./ContentCard";
import { Video } from "./types";

interface VideoListProps {
  videos: Video[];
  onToggleSave: (id: string) => void;
}

const VideoList = ({ videos, onToggleSave }: VideoListProps) => {
  return (
    <>
      {videos.map(video => (
        <ContentCard
          key={video.id}
          id={video.id}
          title={video.title}
          description={video.description}
          author={video.author}
          timeInfo={video.duration}
          level={video.level}
          tags={video.tags}
          savedOffline={video.savedOffline}
          authorIcon={<Star className="h-4 w-4 mr-1" />}
          onToggleSave={onToggleSave}
          primaryActionText="Watch Video"
        />
      ))}
    </>
  );
};

export default VideoList;
