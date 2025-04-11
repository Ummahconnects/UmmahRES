import Layout from "@/components/Layout";
import ReviewSection from "@/components/reviews/ReviewSection";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Check, SparklesIcon, Star } from "lucide-react";
import { useEffect, useState } from "react";

const PackagesPage = () => {
  const [sparklePosition, setSparklePosition] = useState({ top: 0, left: 0 });
  
  // Animation for the sparkling stars
  useEffect(() => {
    const interval = setInterval(() => {
      setSparklePosition({
        top: Math.floor(Math.random() * 100),
        left: Math.floor(Math.random() * 100)
      });
    }, 700);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-muslim-dark mb-4">Business Listing Packages</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            List your Muslim business on Ummah Connects and create Barakat with every transaction,
            supporting Muslims Services by Muslims, for the Sake of Allah.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {/* Basic Package */}
          <Card className="border-t-4 border-t-gray-400 relative">
            <CardHeader>
              <CardTitle>Basic Listing</CardTitle>
              <CardDescription>Perfect for small businesses</CardDescription>
              <div className="text-3xl font-bold mt-2">
                $9.99<span className="text-sm font-normal text-gray-500">/month</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span>Basic business listing</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span>Contact information</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span>Business hours</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span>1 category listing</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-gray-500 hover:bg-gray-600">
                Get Started
              </Button>
            </CardFooter>
          </Card>

          {/* Premium Package */}
          <Card className="border-t-4 border-t-muslim-teal relative">
            <CardHeader>
              <CardTitle>Premium</CardTitle>
              <CardDescription>Ideal for growing businesses</CardDescription>
              <div className="text-3xl font-bold mt-2">
                $24.99<span className="text-sm font-normal text-gray-500">/month</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span>Enhanced business profile</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span>Featured in search results</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span>Photo gallery (up to 10 images)</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span>Customer reviews & ratings</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span>3 category listings</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span>Basic analytics</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-muslim-teal hover:bg-muslim-teal/90">
                Start Premium
              </Button>
            </CardFooter>
          </Card>

          {/* Platinum Package */}
          <Card className="border-t-4 border-t-muslim-blue relative">
            <CardHeader>
              <CardTitle>Platinum</CardTitle>
              <CardDescription>For established businesses</CardDescription>
              <div className="text-3xl font-bold mt-2">
                $49.99<span className="text-sm font-normal text-gray-500">/month</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span>Everything in Premium</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span>Featured listing (6 per city page)</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span>Promotional offers & coupons</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span>Unlimited photo gallery</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span>Advanced analytics dashboard</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span>Unlimited category listings</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span>City-specific promotion</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-muslim-blue hover:bg-muslim-blue/90">
                Go Platinum
              </Button>
            </CardFooter>
          </Card>

          {/* Supreme Package with Gold Banner and Sparkling Effect */}
          <Card className="border-t-4 border-t-muslim-gold relative md:scale-105 shadow-xl overflow-hidden">
            {/* Gold Banner at the top */}
            <div className="absolute -top-4 right-0 left-0 mx-auto w-max px-4 py-1 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 text-muslim-dark text-sm font-bold rounded-full border border-amber-300 shadow-md animate-pulse">
              Major Sponsor
            </div>
            
            {/* Gold corner ribbons */}
            <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-amber-400 via-yellow-300 to-amber-400 transform -rotate-45 -translate-x-10 -translate-y-10"></div>
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-amber-400 via-yellow-300 to-amber-400 transform rotate-45 translate-x-10 -translate-y-10"></div>
            
            {/* Animated sparkling stars */}
            <div 
              className="absolute h-6 w-6 text-amber-300 animate-pulse z-10"
              style={{ top: `${sparklePosition.top}%`, left: `${sparklePosition.left}%` }}
            >
              <Star className="fill-amber-300" />
            </div>
            
            <CardHeader className="relative z-10 bg-gradient-to-b from-amber-50 to-transparent">
              <CardTitle className="text-muslim-dark">Supreme</CardTitle>
              <CardDescription>Exclusive sponsorship opportunity</CardDescription>
              <div className="text-3xl font-bold mt-2">
                $299.99<span className="text-sm font-normal text-gray-500">/month</span>
              </div>
            </CardHeader>
            <CardContent className="relative z-10 bg-white bg-opacity-90">
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span>Everything in Platinum</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span>Half-page featured sponsor spot</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-amber-600 mr-2 shrink-0 font-bold" />
                  <span className="font-bold text-amber-700">Limited to only 2 businesses per month</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span>Premium homepage placement</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span>Featured in newsletter</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span>Social media promotion</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span>Global visibility across all regions</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter className="flex flex-col gap-2 relative z-10 bg-white">
              <Button className="w-full bg-muslim-gold hover:bg-amber-500 font-bold">
                Become a Major Sponsor
              </Button>
              <Button variant="outline" className="w-full border-muslim-gold text-muslim-gold hover:bg-amber-50">
                Reserve Spot for Next Month
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg mb-16">
          <h2 className="text-2xl font-bold text-muslim-dark mb-4">Location-Based Advertising</h2>
          <p className="text-gray-600 mb-4">
            Our platform features city-specific pages that showcase local businesses to users in their area. When users log in, they are automatically directed to their local city page.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg mb-2">Platinum Listing Features</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span>Featured on your city's local business page</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span>Limited to 6 businesses per city page</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span>Rotate through multiple pages as needed</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg mb-2">Supreme Sponsor Benefits</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span>Half-page premium placement</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span>Only 2 major sponsors featured monthly</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span>Global visibility across all city pages</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <Separator className="my-16" />

        {/* Reviews section with the two types of reviews */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-muslim-dark mb-6 text-center">Reviews & Feedback</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div>
              <h3 className="text-xl font-semibold text-muslim-dark mb-4 text-center">What Customers Say About Our Listed Businesses</h3>
              <ReviewSection 
                entityName="Listed Businesses" 
                entityType="business"
                reviewPrompt="Share your experience with this business..."
              />
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-muslim-dark mb-4 text-center">Feedback From Our Business Partners</h3>
              <ReviewSection 
                entityName="Ummah Connects Platform" 
                entityType="business"
                reviewPrompt="How can we improve our service for your business?"
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PackagesPage;
