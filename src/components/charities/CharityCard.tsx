
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import DonationTimer from "./DonationTimer";
import { Heart } from "lucide-react";

export interface CharityInfo {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  isLocal: boolean;
  location: string;
  goalAmount: number;
  currentAmount: number;
  endDate: Date;
  category: string;
}

interface CharityCardProps {
  charity: CharityInfo;
  featured?: boolean;
}

const CharityCard = ({ charity, featured = false }: CharityCardProps) => {
  const { name, description, imageUrl, isLocal, location, goalAmount, currentAmount, endDate } = charity;
  
  return (
    <Card className={`overflow-hidden ${featured ? 'border-muslim-teal border-2' : ''}`}>
      <div className="relative">
        {featured && (
          <div className="absolute top-0 right-0 bg-muslim-teal text-white px-3 py-1 text-xs font-bold uppercase rounded-bl-lg">
            Featured
          </div>
        )}
        {isLocal && (
          <div className="absolute top-0 left-0 bg-yellow-500 text-white px-3 py-1 text-xs font-bold uppercase rounded-br-lg">
            Local
          </div>
        )}
        <img 
          src={imageUrl || "/placeholder.svg"} 
          alt={name} 
          className="w-full h-48 object-cover"
        />
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{name}</CardTitle>
            <CardDescription className="text-sm">{location}</CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
        <DonationTimer 
          endDate={endDate} 
          goalAmount={goalAmount} 
          currentAmount={currentAmount} 
        />
      </CardContent>
      
      <CardFooter>
        <Button className="w-full bg-muslim-teal hover:bg-muslim-teal/90">
          <Heart className="mr-2 h-4 w-4" /> Donate Now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CharityCard;
