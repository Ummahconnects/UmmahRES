
import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  Users, 
  TrendingUp, 
  Link as LinkIcon, 
  Share2, 
  Award, 
  DollarSign, 
  Percent,
  CheckCircle2 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

// Define form validation schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  website: z.string().url({ message: "Please enter a valid website URL" }).or(z.string().length(0)),
  socialMedia: z.string().min(2, { message: "Social media handle/URL is required" }),
  followers: z.string().min(1, { message: "Please enter your follower count" }),
  experience: z.string().min(10, { message: "Please tell us about your experience" }),
});

type FormValues = z.infer<typeof formSchema>;

const AffiliatesPage = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("affiliates");
  const [referralCode, setReferralCode] = useState("");
  
  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      website: "",
      socialMedia: "",
      followers: "",
      experience: "",
    },
  });

  // Form submission handler
  const onSubmit = (data: FormValues) => {
    console.log("Form data:", data);
    
    // Generate a mock referral code for demonstration
    const generatedCode = `UC-${data.name.substring(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setReferralCode(generatedCode);
    
    // Show success message
    toast({
      title: "Application Received",
      description: "Thank you for your interest! Our team will review your application and contact you soon.",
    });
  };

  const copyReferralLink = () => {
    const link = `https://ummahconnects.com/?ref=${referralCode}`;
    navigator.clipboard.writeText(link);
    toast({
      title: "Link Copied",
      description: "Referral link has been copied to clipboard!",
    });
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-muslim-dark mb-4">Partner With UmmahConnects</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Join our affiliate program and influencer network to earn while helping connect 
            the global Muslim community with halal services and products.
          </p>
        </div>

        <Tabs defaultValue="affiliates" className="mb-12" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="affiliates">Affiliate Program</TabsTrigger>
            <TabsTrigger value="influencers">Influencer Partnerships</TabsTrigger>
          </TabsList>
          
          <TabsContent value="affiliates" className="pt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-gradient-to-r from-muslim-teal/10 to-muslim-blue/10 p-8 rounded-lg">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-12 w-12 rounded-full bg-muslim-teal flex items-center justify-center">
                      <LinkIcon className="h-6 w-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-muslim-dark">Affiliate Program</h2>
                  </div>
                  
                  <p className="text-gray-700 mb-6">
                    Our affiliate program allows you to earn commission by referring businesses and mosques 
                    to UmmahConnects. Each successful referral that results in a paid subscription earns you
                    a generous commission.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card className="bg-white border-muslim-teal/20">
                      <CardContent className="pt-6">
                        <div className="text-center">
                          <div className="h-12 w-12 bg-muslim-teal/10 rounded-full mx-auto flex items-center justify-center mb-4">
                            <Percent className="h-6 w-6 text-muslim-teal" />
                          </div>
                          <h3 className="text-xl font-bold text-muslim-dark mb-2">15%</h3>
                          <p className="text-sm text-gray-600">Commission Rate</p>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-white border-muslim-teal/20">
                      <CardContent className="pt-6">
                        <div className="text-center">
                          <div className="h-12 w-12 bg-muslim-teal/10 rounded-full mx-auto flex items-center justify-center mb-4">
                            <DollarSign className="h-6 w-6 text-muslim-teal" />
                          </div>
                          <h3 className="text-xl font-bold text-muslim-dark mb-2">$50+</h3>
                          <p className="text-sm text-gray-600">Per Referral</p>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-white border-muslim-teal/20">
                      <CardContent className="pt-6">
                        <div className="text-center">
                          <div className="h-12 w-12 bg-muslim-teal/10 rounded-full mx-auto flex items-center justify-center mb-4">
                            <TrendingUp className="h-6 w-6 text-muslim-teal" />
                          </div>
                          <h3 className="text-xl font-bold text-muslim-dark mb-2">30 Days</h3>
                          <p className="text-sm text-gray-600">Cookie Duration</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-4">How It Works</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="h-6 w-6 flex-shrink-0 mt-1">
                        <CheckCircle2 className="h-6 w-6 text-muslim-teal" />
                      </div>
                      <p>Sign up for our affiliate program and get a unique referral link</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-6 w-6 flex-shrink-0 mt-1">
                        <CheckCircle2 className="h-6 w-6 text-muslim-teal" />
                      </div>
                      <p>Share your referral link with businesses and mosques in your network</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-6 w-6 flex-shrink-0 mt-1">
                        <CheckCircle2 className="h-6 w-6 text-muslim-teal" />
                      </div>
                      <p>Earn 15% commission on every paid subscription from your referrals</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-6 w-6 flex-shrink-0 mt-1">
                        <CheckCircle2 className="h-6 w-6 text-muslim-teal" />
                      </div>
                      <p>Get paid via PayPal or bank transfer on a monthly basis</p>
                    </li>
                  </ul>
                </div>
                
                {referralCode && (
                  <div className="mt-8 p-6 border border-muslim-gold bg-amber-50 rounded-lg">
                    <h3 className="text-lg font-bold text-muslim-dark mb-4">Your Referral Link</h3>
                    <div className="flex items-center gap-2">
                      <Input value={`https://ummahconnects.com/?ref=${referralCode}`} readOnly className="bg-white" />
                      <Button onClick={copyReferralLink} className="bg-muslim-teal hover:bg-muslim-teal/90">Copy</Button>
                    </div>
                    <p className="mt-4 text-sm text-gray-600">
                      Share this link with businesses and mosques. You'll earn 15% commission on 
                      every paid subscription for a full year!
                    </p>
                  </div>
                )}
              </div>
              
              <div>
                <Card className="overflow-hidden">
                  <CardHeader className="bg-muslim-teal text-white">
                    <CardTitle>Apply Now</CardTitle>
                    <CardDescription className="text-white/80">
                      Join our affiliate program today
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Your name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email Address</FormLabel>
                              <FormControl>
                                <Input placeholder="you@example.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="website"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Website (Optional)</FormLabel>
                              <FormControl>
                                <Input placeholder="https://yourwebsite.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="socialMedia"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Social Media</FormLabel>
                              <FormControl>
                                <Input placeholder="@yourusername or profile URL" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="followers"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Followers/Audience Size</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g., 1000+" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="experience"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Your Experience</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Tell us about your experience, audience, and why you want to join our affiliate program"
                                  className="min-h-[100px]"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <Button type="submit" className="w-full bg-muslim-teal hover:bg-muslim-teal/90">
                          Submit Application
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="influencers" className="pt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-gradient-to-r from-muslim-blue/10 to-muslim-gold/10 p-8 rounded-lg">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-12 w-12 rounded-full bg-muslim-blue flex items-center justify-center">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-muslim-dark">Influencer Partnerships</h2>
                  </div>
                  
                  <p className="text-gray-700 mb-6">
                    As an influencer partner, you'll collaborate with UmmahConnects to promote our platform
                    to your audience. We offer competitive compensation based on your reach and the results
                    you generate.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <Card className="bg-white border-muslim-blue/20">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Content Creator Partnerships</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="h-5 w-5 text-muslim-blue flex-shrink-0 mt-0.5" />
                            <span>Sponsored content opportunities</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="h-5 w-5 text-muslim-blue flex-shrink-0 mt-0.5" />
                            <span>Brand ambassador programs</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="h-5 w-5 text-muslim-blue flex-shrink-0 mt-0.5" />
                            <span>Co-created content series</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-white border-muslim-blue/20">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Community Leader Partnerships</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="h-5 w-5 text-muslim-blue flex-shrink-0 mt-0.5" />
                            <span>Community engagement programs</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="h-5 w-5 text-muslim-blue flex-shrink-0 mt-0.5" />
                            <span>Event speaking opportunities</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="h-5 w-5 text-muslim-blue flex-shrink-0 mt-0.5" />
                            <span>Advisory roles with compensation</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-4">Partnership Benefits</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="h-10 w-10 bg-muslim-blue/10 rounded-full flex items-center justify-center mb-3">
                        <DollarSign className="h-5 w-5 text-muslim-blue" />
                      </div>
                      <h4 className="font-semibold text-muslim-dark mb-1">Competitive Compensation</h4>
                      <p className="text-sm text-gray-600">Fixed fees and performance bonuses based on results</p>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="h-10 w-10 bg-muslim-blue/10 rounded-full flex items-center justify-center mb-3">
                        <Share2 className="h-5 w-5 text-muslim-blue" />
                      </div>
                      <h4 className="font-semibold text-muslim-dark mb-1">Exposure & Growth</h4>
                      <p className="text-sm text-gray-600">Cross-promotion to our growing user base</p>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="h-10 w-10 bg-muslim-blue/10 rounded-full flex items-center justify-center mb-3">
                        <Award className="h-5 w-5 text-muslim-blue" />
                      </div>
                      <h4 className="font-semibold text-muslim-dark mb-1">Exclusive Access</h4>
                      <p className="text-sm text-gray-600">Early access to new features and events</p>
                    </div>
                  </div>
                  
                  <div className="bg-muslim-gold/10 p-6 rounded-lg border border-muslim-gold/30">
                    <h4 className="font-semibold text-muslim-dark mb-2">Featured Influencer Partners</h4>
                    <p className="text-sm text-gray-700 mb-4">
                      Join our growing network of Muslim influencers making an impact:
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <div className="bg-white px-3 py-1 rounded-full text-sm border border-muslim-gold/30">
                        @muslimfoodie
                      </div>
                      <div className="bg-white px-3 py-1 rounded-full text-sm border border-muslim-gold/30">
                        @hijabistyle
                      </div>
                      <div className="bg-white px-3 py-1 rounded-full text-sm border border-muslim-gold/30">
                        @halaltraveler
                      </div>
                      <div className="bg-white px-3 py-1 rounded-full text-sm border border-muslim-gold/30">
                        @islamicfinance
                      </div>
                      <div className="bg-white px-3 py-1 rounded-full text-sm border border-muslim-gold/30">
                        And many more...
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <Card className="overflow-hidden">
                  <CardHeader className="bg-muslim-blue text-white">
                    <CardTitle>Become a Partner</CardTitle>
                    <CardDescription className="text-white/80">
                      Apply to join our influencer network
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Your name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email Address</FormLabel>
                              <FormControl>
                                <Input placeholder="you@example.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="socialMedia"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Social Media Handles</FormLabel>
                              <FormControl>
                                <Input placeholder="@yourusername or profile URL" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="followers"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Followers/Audience Size</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g., 10K+" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="experience"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Your Content & Audience</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Tell us about your content, audience demographics, and previous brand collaborations"
                                  className="min-h-[100px]"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <Button type="submit" className="w-full bg-muslim-blue hover:bg-muslim-blue/90">
                          Submit Application
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <Separator className="my-16" />
        
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center text-muslim-dark mb-8">Success Stories</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex gap-2 text-amber-400 mb-4">
                <div className="h-12 w-12 rounded-full bg-muslim-teal/20 flex items-center justify-center text-muslim-teal font-bold">
                  YK
                </div>
                <div>
                  <p className="font-medium">Yasir Khan</p>
                  <p className="text-gray-500 text-sm">Affiliate Partner</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                "I've referred 12 businesses to UmmahConnects in the past 3 months, earning over $600 
                in commissions. The platform sells itself once businesses see the value!"
              </p>
              <div className="text-sm text-gray-500">
                Earnings: $600+ | Referrals: 12
              </div>
            </Card>
            
            <Card className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex gap-2 text-amber-400 mb-4">
                <div className="h-12 w-12 rounded-full bg-muslim-blue/20 flex items-center justify-center text-muslim-blue font-bold">
                  FA
                </div>
                <div>
                  <p className="font-medium">Fatima Ali</p>
                  <p className="text-gray-500 text-sm">Influencer Partner</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                "Partnering with UmmahConnects has been great for my audience of Muslim mothers. 
                I'm able to connect them with halal businesses while earning from my content."
              </p>
              <div className="text-sm text-gray-500">
                Audience: 50K+ | Partnership: 6 months
              </div>
            </Card>
            
            <Card className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex gap-2 text-amber-400 mb-4">
                <div className="h-12 w-12 rounded-full bg-muslim-gold/20 flex items-center justify-center text-muslim-gold font-bold">
                  IH
                </div>
                <div>
                  <p className="font-medium">Ibrahim Hassan</p>
                  <p className="text-gray-500 text-sm">Community Leader</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                "As a mosque community leader, I've referred several local businesses to UmmahConnects. 
                It's created a stronger community while helping me fund our programs."
              </p>
              <div className="text-sm text-gray-500">
                Community Size: 2,000+ | Monthly Income: $300+
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AffiliatesPage;
