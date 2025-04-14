
import { useState } from "react";
import { useAuth } from "@/hooks/auth/useAuth";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, ThumbsUp, Users, Bookmark, Clock } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

// Mock data for initial display
const MOCK_DISCUSSIONS = [
  {
    id: "1",
    title: "Recommendations for Halal restaurants in Sydney?",
    content: "I'm visiting Sydney next month and looking for good Halal dining options. Any suggestions?",
    author: "Ahmed",
    date: "2 days ago",
    replies: 12,
    likes: 8,
    category: "Food & Dining"
  },
  {
    id: "2",
    title: "Prayer times calculation methods",
    content: "What calculation methods do you use for prayer times? I've noticed differences between apps.",
    author: "Fatima",
    date: "1 week ago",
    replies: 24,
    likes: 15,
    category: "Prayer"
  },
  {
    id: "3",
    title: "Best Islamic books for new Muslims",
    content: "Can anyone recommend beginner-friendly books for someone who recently converted to Islam?",
    author: "Michael",
    date: "3 days ago",
    replies: 18,
    likes: 22,
    category: "Education"
  }
];

const ForumSection = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [discussions, setDiscussions] = useState(MOCK_DISCUSSIONS);
  const [newPost, setNewPost] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleNewPost = () => {
    if (!newPost.trim()) {
      toast({
        title: "Empty post",
        description: "Please write something before posting.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const newDiscussion = {
        id: `${Date.now()}`,
        title: newPost.split('\n')[0] || "New Discussion",
        content: newPost,
        author: user?.email?.split('@')[0] || "Anonymous",
        date: "Just now",
        replies: 0,
        likes: 0,
        category: "General"
      };
      
      setDiscussions([newDiscussion, ...discussions]);
      setNewPost("");
      setIsSubmitting(false);
      
      toast({
        title: "Posted successfully",
        description: "Your discussion has been posted to the forum.",
      });
    }, 1000);
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Start a Discussion</CardTitle>
          <CardDescription>Share your questions or insights with the community</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea 
            placeholder="What would you like to discuss?"
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            className="min-h-[120px]"
          />
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button 
            onClick={handleNewPost} 
            disabled={isSubmitting || !newPost.trim()}
            className="bg-muslim-teal hover:bg-muslim-teal/90"
          >
            {isSubmitting ? "Posting..." : "Post Discussion"}
          </Button>
        </CardFooter>
      </Card>
      
      <div className="grid grid-cols-1 gap-4">
        {discussions.map(discussion => (
          <Card key={discussion.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{discussion.title}</CardTitle>
                <span className="text-xs bg-muslim-teal/10 text-muslim-teal px-2 py-1 rounded-full">
                  {discussion.category}
                </span>
              </div>
              <CardDescription className="flex items-center gap-2">
                <span>{discussion.author}</span>
                <span>•</span>
                <Clock className="h-3 w-3" />
                <span>{discussion.date}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{discussion.content}</p>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
              <div className="flex space-x-4">
                <Button variant="ghost" size="sm" className="flex items-center gap-1">
                  <ThumbsUp className="h-4 w-4" /> 
                  <span>{discussion.likes}</span>
                </Button>
                <Button variant="ghost" size="sm" className="flex items-center gap-1">
                  <MessageCircle className="h-4 w-4" /> 
                  <span>{discussion.replies}</span>
                </Button>
              </div>
              <div>
                <Button variant="ghost" size="sm">
                  <Bookmark className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ForumSection;
