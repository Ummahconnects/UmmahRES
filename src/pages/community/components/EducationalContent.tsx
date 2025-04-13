
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Book, Video, BookOpen, Download, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

// Mock data for educational content
const MOCK_ARTICLES = [
  {
    id: "a1",
    title: "Understanding the Five Pillars of Islam",
    description: "An introduction to the fundamental practices of Islam for beginners.",
    author: "Sheikh Abdullah",
    readTime: "12 min read",
    level: "Beginner",
    tags: ["Basics", "Pillars of Islam"],
    savedOffline: false
  },
  {
    id: "a2",
    title: "The History of Ramadan",
    description: "Explore the origins and significance of the holy month of Ramadan.",
    author: "Dr. Aisha Rahman",
    readTime: "15 min read",
    level: "Intermediate",
    tags: ["Ramadan", "History"],
    savedOffline: true
  },
  {
    id: "a3",
    title: "Prayer Positions Explained",
    description: "A detailed guide to the positions and movements during Islamic prayer.",
    author: "Imam Yusuf",
    readTime: "10 min read",
    level: "Beginner",
    tags: ["Prayer", "Practical Guide"],
    savedOffline: false
  }
];

const MOCK_VIDEOS = [
  {
    id: "v1",
    title: "Tajweed Rules for Beginners",
    description: "Learn the basic rules of Quranic recitation with proper pronunciation.",
    author: "Qari Muhammad",
    duration: "24 min",
    level: "Beginner",
    tags: ["Quran", "Tajweed"],
    savedOffline: false
  },
  {
    id: "v2",
    title: "The Life of Prophet Muhammad (PBUH)",
    description: "A biographical series about the life and teachings of the Prophet.",
    author: "Islamic History Channel",
    duration: "45 min",
    level: "All Levels",
    tags: ["Prophet Muhammad", "Biography"],
    savedOffline: false
  },
  {
    id: "v3",
    title: "Understanding Hadith Sciences",
    description: "An academic approach to the study and authentication of Hadith.",
    author: "Dr. Hamza Yusuf",
    duration: "60 min",
    level: "Advanced",
    tags: ["Hadith", "Islamic Studies"],
    savedOffline: true
  }
];

// Progress tracking for learning paths
const MOCK_LEARNING_PATHS = [
  {
    id: "lp1",
    title: "New Muslim Essentials",
    description: "Core knowledge for those new to Islam",
    progress: 45,
    totalModules: 12,
    completedModules: 5
  },
  {
    id: "lp2",
    title: "Quran Recitation Mastery",
    description: "From basic pronunciation to fluent recitation",
    progress: 30,
    totalModules: 20,
    completedModules: 6
  }
];

const EducationalContent = () => {
  const [articles, setArticles] = useState(MOCK_ARTICLES);
  const [videos, setVideos] = useState(MOCK_VIDEOS);
  const [learningPaths, setLearningPaths] = useState(MOCK_LEARNING_PATHS);
  
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
        <div className="grid gap-6">
          {learningPaths.map(path => (
            <Card key={path.id}>
              <CardHeader>
                <CardTitle>{path.title}</CardTitle>
                <CardDescription>{path.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Progress</span>
                    <span className="text-sm font-medium">{path.progress}%</span>
                  </div>
                  <Progress value={path.progress} className="h-2" />
                  <p className="text-sm text-gray-500">
                    {path.completedModules} of {path.totalModules} modules completed
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-muslim-teal hover:bg-muslim-teal/90">
                  Continue Learning
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
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
          {articles.map(article => (
            <Card key={article.id} className="overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="flex-1 p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-xs bg-muslim-teal/10 text-muslim-teal border-muslim-teal/20">
                      {article.level}
                    </Badge>
                    <span className="text-xs text-gray-500">{article.readTime}</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{article.title}</h3>
                  <p className="text-gray-600 mb-4">{article.description}</p>
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <BookOpen className="h-4 w-4 mr-1" />
                    <span>By {article.author}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {article.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex flex-row md:flex-col justify-between p-4 border-t md:border-l md:border-t-0">
                  <Button className="bg-muslim-teal hover:bg-muslim-teal/90">
                    Read Article
                  </Button>
                  <Button 
                    variant="outline" 
                    className="mt-0 md:mt-2"
                    onClick={() => toggleSavedStatus(article.id, 'article')}
                  >
                    <Download className={`h-4 w-4 ${article.savedOffline ? 'text-muslim-teal fill-muslim-teal' : ''}`} />
                    <span className="ml-2">{article.savedOffline ? 'Saved' : 'Save Offline'}</span>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="videos" className="space-y-4">
          {videos.map(video => (
            <Card key={video.id} className="overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="flex-1 p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-xs bg-muslim-teal/10 text-muslim-teal border-muslim-teal/20">
                      {video.level}
                    </Badge>
                    <span className="text-xs text-gray-500">{video.duration}</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{video.title}</h3>
                  <p className="text-gray-600 mb-4">{video.description}</p>
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Star className="h-4 w-4 mr-1" />
                    <span>By {video.author}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {video.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex flex-row md:flex-col justify-between p-4 border-t md:border-l md:border-t-0">
                  <Button className="bg-muslim-teal hover:bg-muslim-teal/90">
                    Watch Video
                  </Button>
                  <Button 
                    variant="outline" 
                    className="mt-0 md:mt-2"
                    onClick={() => toggleSavedStatus(video.id, 'video')}
                  >
                    <Download className={`h-4 w-4 ${video.savedOffline ? 'text-muslim-teal fill-muslim-teal' : ''}`} />
                    <span className="ml-2">{video.savedOffline ? 'Saved' : 'Save Offline'}</span>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EducationalContent;
