
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download } from "lucide-react";
import { ReactNode } from "react";

interface ContentCardProps {
  id: string;
  title: string;
  description: string;
  author: string;
  timeInfo: string;
  level: string;
  tags: string[];
  savedOffline: boolean;
  authorIcon: ReactNode;
  onToggleSave: (id: string) => void;
  primaryActionText: string;
  onPrimaryAction?: () => void;
}

const ContentCard = ({
  id,
  title,
  description,
  author,
  timeInfo,
  level,
  tags,
  savedOffline,
  authorIcon,
  onToggleSave,
  primaryActionText,
  onPrimaryAction = () => {},
}: ContentCardProps) => {
  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="flex-1 p-6">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className="text-xs bg-muslim-teal/10 text-muslim-teal border-muslim-teal/20">
              {level}
            </Badge>
            <span className="text-xs text-gray-500">{timeInfo}</span>
          </div>
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-gray-600 mb-4">{description}</p>
          <div className="flex items-center text-sm text-gray-500 mb-4">
            {authorIcon}
            <span>By {author}</span>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map(tag => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        <div className="flex flex-row md:flex-col justify-between p-4 border-t md:border-l md:border-t-0">
          <Button 
            className="bg-muslim-teal hover:bg-muslim-teal/90"
            onClick={onPrimaryAction}
          >
            {primaryActionText}
          </Button>
          <Button 
            variant="outline" 
            className="mt-0 md:mt-2"
            onClick={() => onToggleSave(id)}
          >
            <Download className={`h-4 w-4 ${savedOffline ? 'text-muslim-teal fill-muslim-teal' : ''}`} />
            <span className="ml-2">{savedOffline ? 'Saved' : 'Save Offline'}</span>
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ContentCard;
