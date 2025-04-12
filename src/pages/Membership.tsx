
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, ShieldCheck, UserCheck, Users } from "lucide-react";
import MembershipForm from "@/components/membership/MembershipForm";
import MembershipBenefits from "@/components/membership/MembershipBenefits";
import TestimonialsSection from "@/components/membership/TestimonialsSection";
import BetaOfferBanner from "@/components/membership/BetaOfferBanner";
import { useState, useEffect } from "react";
import { planDetails } from "@/types/membershipTypes";
import { extractNumericPrice, useLocalCurrency } from "@/utils/currencyUtils";

const MembershipPage = () => {
  const [userCity, setUserCity] = useState<string>("your city");
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");
  const { convertAndFormat, localCurrencyInfo } = useLocalCurrency();
  
  // Simulate getting user's city - in a real app this would come from geolocation or user profile
  useEffect(() => {
    // Simulated cities for demo
    const cities = ["London", "New York", "Dubai", "Sydney", "Toronto", "Kuala Lumpur"];
    const randomCity = cities[Math.floor(Math.random() * cities.length)];
    setUserCity(randomCity);
  }, []);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-muslim-dark mb-4">Business Membership</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Join our business membership program to connect with the Ummah and grow your business while supporting the Muslim community.
          </p>
        </div>

        <BetaOfferBanner city={userCity} />

        <Tabs defaultValue="plans" className="w-full mb-16">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="plans">
              <Users className="h-4 w-4 mr-2" />
              Membership Plans
            </TabsTrigger>
            <TabsTrigger value="benefits">
              <ShieldCheck className="h-4 w-4 mr-2" />
              Benefits
            </TabsTrigger>
            <TabsTrigger value="apply">
              <UserCheck className="h-4 w-4 mr-2" />
              Apply Now
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="plans">
            <div className="mb-6">
              <Tabs 
                defaultValue="monthly" 
                className="w-full max-w-md mx-auto"
                onValueChange={(value) => setBillingCycle(value as "monthly" | "annual")}
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="monthly">Monthly Billing</TabsTrigger>
                  <TabsTrigger value="annual">Annual Billing (Save)</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Basic Membership */}
              <Card className="border-t-4 border-t-gray-400">
                <CardHeader>
                  <CardTitle>Basic Membership</CardTitle>
                  <CardDescription>For new businesses</CardDescription>
                  <div className="text-3xl font-bold mt-2">
                    {billingCycle === "monthly" ? (
                      <>{planDetails.basic.price}</>
                    ) : (
                      <>{planDetails.basic.annualPrice}</>
                    )}
                  </div>
                  
                  {billingCycle === "annual" && (
                    <div className="text-sm text-green-600 font-medium mt-1">
                      {planDetails.basic.annualSavings}
                    </div>
                  )}
                  
                  {localCurrencyInfo.code !== 'USD' && (
                    <div className="text-sm text-gray-500 italic mt-1">
                      {billingCycle === "monthly" ? (
                        <>{convertAndFormat(extractNumericPrice(planDetails.basic.price))}/month</>
                      ) : (
                        <>{convertAndFormat(extractNumericPrice(planDetails.basic.annualPrice))}/year</>
                      )}
                    </div>
                  )}
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {planDetails.basic.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-gray-500 hover:bg-gray-600">
                    Select Basic
                  </Button>
                </CardFooter>
              </Card>

              {/* Premium Membership */}
              <Card className="border-t-4 border-t-muslim-teal md:scale-105 shadow-lg">
                <CardHeader>
                  <CardTitle>Premium Membership</CardTitle>
                  <CardDescription>For growing businesses</CardDescription>
                  <div className="text-3xl font-bold mt-2">
                    {billingCycle === "monthly" ? (
                      <>{planDetails.premium.price}</>
                    ) : (
                      <>{planDetails.premium.annualPrice}</>
                    )}
                  </div>
                  
                  {billingCycle === "annual" && (
                    <div className="text-sm text-green-600 font-medium mt-1">
                      {planDetails.premium.annualSavings}
                    </div>
                  )}
                  
                  {localCurrencyInfo.code !== 'USD' && (
                    <div className="text-sm text-gray-500 italic mt-1">
                      {billingCycle === "monthly" ? (
                        <>{convertAndFormat(extractNumericPrice(planDetails.premium.price))}/month</>
                      ) : (
                        <>{convertAndFormat(extractNumericPrice(planDetails.premium.annualPrice))}/year</>
                      )}
                    </div>
                  )}
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {planDetails.premium.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-muslim-teal hover:bg-muslim-teal/90">
                    Select Premium
                  </Button>
                </CardFooter>
              </Card>

              {/* Enterprise Membership */}
              <Card className="border-t-4 border-t-muslim-blue">
                <CardHeader>
                  <CardTitle>Enterprise Membership</CardTitle>
                  <CardDescription>For established businesses</CardDescription>
                  <div className="text-3xl font-bold mt-2">
                    {billingCycle === "monthly" ? (
                      <>{planDetails.enterprise.price}</>
                    ) : (
                      <>{planDetails.enterprise.annualPrice}</>
                    )}
                  </div>
                  
                  {billingCycle === "annual" && (
                    <div className="text-sm text-green-600 font-medium mt-1">
                      {planDetails.enterprise.annualSavings}
                    </div>
                  )}
                  
                  {localCurrencyInfo.code !== 'USD' && (
                    <div className="text-sm text-gray-500 italic mt-1">
                      {billingCycle === "monthly" ? (
                        <>{convertAndFormat(extractNumericPrice(planDetails.enterprise.price))}/month</>
                      ) : (
                        <>{convertAndFormat(extractNumericPrice(planDetails.enterprise.annualPrice))}/year</>
                      )}
                    </div>
                  )}
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {planDetails.enterprise.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-muslim-blue hover:bg-muslim-blue/90">
                    Select Enterprise
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="benefits">
            <MembershipBenefits />
          </TabsContent>

          <TabsContent value="apply">
            <MembershipForm />
          </TabsContent>
        </Tabs>

        <TestimonialsSection />
      </div>
    </Layout>
  );
};

export default MembershipPage;
