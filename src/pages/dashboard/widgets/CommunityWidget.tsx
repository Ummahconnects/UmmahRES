
import { MessageCircle, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const CommunityWidget = () => {
  const navigate = useNavigate();
  
  // Mock recent discussions
  const recentDiscussions = [
    {
      id: "d1",
      title: "Recommendations for Halal restaurants in Sydney?",
      author: "Ahmed",
      replies: 12,
      time: "2 days ago"
    },
    {
      id: "d2",
      title: "Prayer times calculation methods",
      author: "Fatima",
      replies: 24,
      time: "1 week ago"
    },
    {
      id: "d3",
      title: "Best Islamic books for new Muslims",
      author: "Michael",
      replies: 18,
      time: "3 days ago"
    }
  ];
  
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {recentDiscussions.map(discussion => (
          <div key={discussion.id} className="p-3 hover:bg-gray-50 rounded-md cursor-pointer">
            <p className="font-medium text-muslim-dark">{discussion.title}</p>
            <div className="flex justify-between text-sm text-gray-500 mt-1">
              <span>{discussion.author}</span>
              <div className="flex items-center">
                <MessageCircle className="h-3 w-3 mr-1" />
                <span>{discussion.replies}</span>
                <span className="mx-2">•</span>
                <span>{discussion.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <Button 
        onClick={() => navigate("/community")}
        className="w-full bg-muslim-teal hover:bg-muslim-teal/90"
      >
        <Users className="h-4 w-4 mr-2" />
        Go to Community
      </Button>
    </div>
  );
};

export default CommunityWidget;
