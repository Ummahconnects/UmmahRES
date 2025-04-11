
import Layout from "@/components/Layout";
import ReviewSection from "@/components/reviews/ReviewSection";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Check } from "lucide-react";

const PackagesPage = () => {
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

          {/* Supreme Package */}
          <Card className="border-t-4 border-t-muslim-orange relative md:scale-105 shadow-lg">
            <div className="absolute -top-4 right-0 left-0 mx-auto w-max px-4 py-1 bg-muslim-orange text-white text-sm rounded-full">
              Major Sponsor
            </div>
            <CardHeader>
              <CardTitle>Supreme</CardTitle>
              <CardDescription>Exclusive sponsorship opportunity</CardDescription>
              <div className="text-3xl font-bold mt-2">
                $299.99<span className="text-sm font-normal text-gray-500">/month</span>
              </div>
            </CardHeader>
            <CardContent>
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
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span><strong>Limited to only 2 businesses per month</strong></span>
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
            <CardFooter>
              <Button className="w-full bg-muslim-orange hover:bg-muslim-orange/90">
                Become a Major Sponsor
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

        {/* Review section demonstration */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-muslim-dark mb-6 text-center">What Our Users Are Saying</h2>
          <ReviewSection 
            entityName="Ummah Connects" 
            entityType="business" 
            averageRating={4.8} 
            totalReviews={42} 
          />
        </div>
      </div>
    </Layout>
  );
};

export default PackagesPage;
