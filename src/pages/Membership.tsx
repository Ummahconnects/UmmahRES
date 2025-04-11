
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, ShieldCheck, UserCheck, Users } from "lucide-react";
import MembershipForm from "@/components/membership/MembershipForm";
import MembershipBenefits from "@/components/membership/MembershipBenefits";
import TestimonialsSection from "@/components/membership/TestimonialsSection";

const MembershipPage = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-muslim-dark mb-4">Business Membership</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Join our business membership program to connect with the Ummah and grow your business while supporting the Muslim community.
          </p>
        </div>

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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Basic Membership */}
              <Card className="border-t-4 border-t-gray-400">
                <CardHeader>
                  <CardTitle>Basic Membership</CardTitle>
                  <CardDescription>For new businesses</CardDescription>
                  <div className="text-3xl font-bold mt-2">
                    $19.99<span className="text-sm font-normal text-gray-500">/month</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>Basic business profile</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>Community access</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>Verified member badge</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>Basic networking tools</span>
                    </li>
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
                    $49.99<span className="text-sm font-normal text-gray-500">/month</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>Everything in Basic</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>Priority listing placement</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>Advanced networking tools</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>Monthly business insight reports</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>Featured in community newsletter</span>
                    </li>
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
                    $99.99<span className="text-sm font-normal text-gray-500">/month</span>
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
                      <span>Dedicated account manager</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>Custom marketing campaigns</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>Priority support</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>Quarterly business strategy sessions</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>Featured in community events</span>
                    </li>
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
