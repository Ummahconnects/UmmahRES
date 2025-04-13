
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Book, Video } from "lucide-react";
import LearningPaths from "./education/LearningPaths";
import ArticleList from "./education/ArticleList";
import VideoList from "./education/VideoList";
import { Article, Video as VideoType, LearningPath } from "./education/types";

// Mock data for educational content
import { MOCK_ARTICLES, MOCK_VIDEOS, MOCK_LEARNING_PATHS } from "./education/mockData";

const EducationalContent = () => {
  const [articles, setArticles] = useState<Article[]>(MOCK_ARTICLES);
  const [videos, setVideos] = useState<VideoType[]>(MOCK_VIDEOS);
  const [learningPaths] = useState<LearningPath[]>(MOCK_LEARNING_PATHS);
  
  const toggleSavedStatus = (id: string, type: 'article' | 'video') => {
    if (type === 'article') {
      setArticles(articles.map(item => 
        item.id === id ? {...item, savedOffline: !item.savedOffline} : item
      ));
    } else {
      setVideos(videos.map(item => 
        item.id === id ? {...item, savedOffline: !item.savedOffline} : item
      ));
    }
  };
  
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-muslim-dark mb-4">Continue Learning</h2>
        <LearningPaths learningPaths={learningPaths} />
      </div>
      
      <Tabs defaultValue="articles">
        <TabsList className="mb-4">
          <TabsTrigger value="articles">
            <Book className="h-4 w-4 mr-2" />
            Articles
          </TabsTrigger>
          <TabsTrigger value="videos">
            <Video className="h-4 w-4 mr-2" />
            Videos
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="articles" className="space-y-4">
          <ArticleList 
            articles={articles}
            onToggleSave={(id) => toggleSavedStatus(id, 'article')}
          />
        </TabsContent>
        
        <TabsContent value="videos" className="space-y-4">
          <VideoList 
            videos={videos}
            onToggleSave={(id) => toggleSavedStatus(id, 'video')}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EducationalContent;
