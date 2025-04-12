
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Calendar, Clock } from "lucide-react";

const FreeTrial = () => {
  const navigate = useNavigate();

  const handleStartTrial = () => {
    navigate("/auth?trial=platinum");
  };

  return (
    <Card className="mt-8 border-2 border-amber-300 bg-gradient-to-r from-amber-50 to-white overflow-hidden relative">
      <div className="absolute -top-6 -right-6 w-20 h-20 bg-amber-300 rounded-full opacity-20"></div>
      <div className="absolute top-1/2 -left-6 w-12 h-12 bg-muslim-teal rounded-full opacity-10"></div>
      
      <CardHeader>
        <div className="flex items-center justify-between">
          <Badge className="bg-amber-500 hover:bg-amber-600 mb-2">Limited Time Offer</Badge>
          <Clock className="h-5 w-5 text-amber-500" />
        </div>
        <CardTitle className="text-xl flex items-center">
          <Sparkles className="h-5 w-5 text-amber-500 mr-2" />
          Free 3-Day Platinum Trial
        </CardTitle>
        <CardDescription>
          Experience all premium features and benefits of our Platinum package before you commit
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-2">
          <p className="text-sm text-gray-600 flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-muslim-teal" />
            <span>No credit card required to start your trial</span>
          </p>
          <ul className="space-y-2 mt-3">
            <li className="text-sm flex items-start">
              <span className="text-amber-500 mr-2">✓</span>
              <span>Featured listing in search results</span>
            </li>
            <li className="text-sm flex items-start">
              <span className="text-amber-500 mr-2">✓</span>
              <span>Access to full analytics dashboard</span>
            </li>
            <li className="text-sm flex items-start">
              <span className="text-amber-500 mr-2">✓</span>
              <span>Unlimited photo gallery</span>
            </li>
            <li className="text-sm flex items-start">
              <span className="text-amber-500 mr-2">✓</span>
              <span>Early access to new features</span>
            </li>
          </ul>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button
          onClick={handleStartTrial}
          className="w-full bg-gradient-to-r from-muslim-gold to-amber-500 hover:from-amber-500 hover:to-muslim-gold"
        >
          Start Your Free Trial Now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FreeTrial;
