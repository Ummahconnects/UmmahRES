
import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { 
  Form,
  FormControl,
  FormDescription,
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
import { Phone, Mail, MessageCircle, SendHorizontal, SparklesIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";

// Define form validation schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  businessName: z.string().min(2, { message: "Business name is required" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  investmentLevel: z.enum(["sponsor", "invest", "partner", "other"]),
  message: z.string().min(10, { message: "Please provide more details about your inquiry" }),
});

type FormValues = z.infer<typeof formSchema>;

const SalesPage = () => {
  const { toast } = useToast();
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

  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      businessName: "",
      email: "",
      phone: "",
      investmentLevel: "sponsor",
      message: "",
    },
  });

  // Form submission handler
  const onSubmit = (data: FormValues) => {
    console.log("Form data:", data);
    
    // Show success message
    toast({
      title: "Inquiry Sent",
      description: "Thank you for your interest! Our sales team will contact you within 24 hours.",
    });
    
    // Reset form
    form.reset();
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
        {/* Animated star that moves around */}
        <div 
          className="absolute h-6 w-6 text-amber-300 animate-pulse z-10"
          style={{ top: `${sparklePosition.top}%`, left: `${sparklePosition.left}%` }}
        >
          <Star className="fill-amber-300" />
        </div>
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-muslim-dark mb-4">Strategic Business Opportunities</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Join us in connecting the global Ummah through exclusive sponsorships and strategic partnerships.
            Create Barakat with every transaction.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Sales Information Column */}
          <div>
            <div className="bg-gradient-to-r from-muslim-teal/10 to-muslim-blue/10 p-8 rounded-lg mb-8">
              <h2 className="text-2xl font-bold text-muslim-dark mb-4">Exclusive Sponsorship Opportunities</h2>
              <p className="text-gray-700 mb-6">
                As the premier Muslim business directory, UmmahConnects offers unparalleled visibility 
                to millions of Muslims seeking halal services and products worldwide.
              </p>
              
              <div className="space-y-6">
                <div className="relative pl-10">
                  <div className="absolute left-0 top-1 h-7 w-7 rounded-full bg-muslim-gold flex items-center justify-center">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <h3 className="font-semibold text-lg text-muslim-dark">Major Sponsor Packages</h3>
                  <p className="text-gray-600">
                    Secure one of only two exclusive half-page sponsor spots available each month.
                    Gain global visibility across all regional pages.
                  </p>
                </div>
                
                <div className="relative pl-10">
                  <div className="absolute left-0 top-1 h-7 w-7 rounded-full bg-muslim-gold flex items-center justify-center">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <h3 className="font-semibold text-lg text-muslim-dark">Regional Domination</h3>
                  <p className="text-gray-600">
                    Secure premium visibility in specific cities or regions with our Platinum local listings.
                    Limited to 6 businesses per city page.
                  </p>
                </div>
                
                <div className="relative pl-10">
                  <div className="absolute left-0 top-1 h-7 w-7 rounded-full bg-muslim-gold flex items-center justify-center">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <h3 className="font-semibold text-lg text-muslim-dark">Strategic Partnerships</h3>
                  <p className="text-gray-600">
                    For larger businesses looking to make a significant impact, we offer customized 
                    strategic partnership opportunities.
                  </p>
                </div>
              </div>
            </div>
            
            <Card className="overflow-hidden relative border-muslim-gold">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400"></div>
              <CardContent className="p-6">
                <div className="flex gap-4 mb-6">
                  <div className="flex-shrink-0 bg-amber-50 h-12 w-12 rounded-full flex items-center justify-center">
                    <SparklesIcon className="h-6 w-6 text-muslim-gold" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-muslim-dark">Investment Opportunities</h3>
                    <p className="text-gray-600">Limited opportunity to invest in UmmahConnects' global growth</p>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4">
                  UmmahConnects is expanding rapidly and seeking strategic investors who share our vision of 
                  connecting Muslims worldwide with halal services and products. Inquire about our investment 
                  opportunities with potential for significant returns.
                </p>
                
                <Button 
                  className="w-full bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 text-muslim-dark hover:shadow-lg"
                  onClick={() => {
                    const messageField = document.getElementById('message');
                    if (messageField) {
                      (messageField as HTMLTextAreaElement).focus();
                      form.setValue('investmentLevel', 'invest');
                    }
                  }}
                >
                  Learn About Investing
                </Button>
              </CardContent>
            </Card>
            
            <div className="mt-8 space-y-4">
              <h3 className="font-bold text-xl text-muslim-dark">Contact Our Business Team</h3>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-muslim-teal flex items-center justify-center">
                  <Phone className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-muslim-teal flex items-center justify-center">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-gray-600">sales@ummahconnects.com</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-muslim-teal flex items-center justify-center">
                  <MessageCircle className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-medium">Response Time</p>
                  <p className="text-gray-600">Within 24 hours</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Column */}
          <div className="bg-white shadow-lg rounded-lg p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-muslim-dark mb-6">Get in Touch</h2>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="businessName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your Business LLC" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="you@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="(555) 123-4567" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="investmentLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>I'm interested in</FormLabel>
                      <div className="grid grid-cols-2 gap-3">
                        <Button
                          type="button"
                          variant={field.value === 'sponsor' ? 'default' : 'outline'}
                          className={field.value === 'sponsor' ? 'bg-muslim-teal' : ''}
                          onClick={() => form.setValue('investmentLevel', 'sponsor')}
                        >
                          Exclusive Sponsorship
                        </Button>
                        <Button
                          type="button"
                          variant={field.value === 'invest' ? 'default' : 'outline'}
                          className={field.value === 'invest' ? 'bg-muslim-gold hover:bg-muslim-gold/90 text-muslim-dark' : ''}
                          onClick={() => form.setValue('investmentLevel', 'invest')}
                        >
                          Investment Opportunity
                        </Button>
                        <Button
                          type="button"
                          variant={field.value === 'partner' ? 'default' : 'outline'}
                          className={field.value === 'partner' ? 'bg-muslim-blue' : ''}
                          onClick={() => form.setValue('investmentLevel', 'partner')}
                        >
                          Strategic Partnership
                        </Button>
                        <Button
                          type="button"
                          variant={field.value === 'other' ? 'default' : 'outline'}
                          className={field.value === 'other' ? 'bg-gray-700' : ''}
                          onClick={() => form.setValue('investmentLevel', 'other')}
                        >
                          Other Inquiry
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          id="message"
                          placeholder="Tell us about your business and what you're looking for..." 
                          className="min-h-[120px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full bg-muslim-teal hover:bg-muslim-teal/90">
                  <SendHorizontal className="mr-2 h-4 w-4" /> Submit Inquiry
                </Button>
              </form>
            </Form>
            
            <div className="mt-6 text-center text-gray-500 text-sm">
              <p>All inquiries are confidential. A member of our sales team will contact you within 24 hours.</p>
            </div>
          </div>
        </div>
        
        <Separator className="my-16" />
        
        {/* Testimonials Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center text-muslim-dark mb-8">What Our Partners Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex gap-2 text-amber-400 mb-4">
                <Star className="fill-amber-400" />
                <Star className="fill-amber-400" />
                <Star className="fill-amber-400" />
                <Star className="fill-amber-400" />
                <Star className="fill-amber-400" />
              </div>
              <p className="text-gray-700 mb-4">
                "Becoming a Major Sponsor on UmmahConnects transformed our business. We've seen a 300% 
                increase in Muslim customers since partnering with them."
              </p>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-muslim-teal/20 flex items-center justify-center text-muslim-teal font-bold">
                  AH
                </div>
                <div>
                  <p className="font-medium">Ahmed Hassan</p>
                  <p className="text-gray-500 text-sm">CEO, Halal Delights</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex gap-2 text-amber-400 mb-4">
                <Star className="fill-amber-400" />
                <Star className="fill-amber-400" />
                <Star className="fill-amber-400" />
                <Star className="fill-amber-400" />
                <Star className="fill-amber-400" />
              </div>
              <p className="text-gray-700 mb-4">
                "The regional targeting capabilities are incredible. Our Platinum listing in Chicago 
                has connected us with the exact local Muslim community we wanted to reach."
              </p>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-muslim-blue/20 flex items-center justify-center text-muslim-blue font-bold">
                  SA
                </div>
                <div>
                  <p className="font-medium">Sarah Ahmed</p>
                  <p className="text-gray-500 text-sm">Marketing Director, Al-Baraka Grocery</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex gap-2 text-amber-400 mb-4">
                <Star className="fill-amber-400" />
                <Star className="fill-amber-400" />
                <Star className="fill-amber-400" />
                <Star className="fill-amber-400" />
                <Star className="fill-amber-400" />
              </div>
              <p className="text-gray-700 mb-4">
                "As an early investor in UmmahConnects, I've been impressed by both the financial 
                returns and the positive impact they're making on the global Muslim community."
              </p>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-muslim-gold/20 flex items-center justify-center text-muslim-gold font-bold">
                  MY
                </div>
                <div>
                  <p className="font-medium">Maryam Yusuf</p>
                  <p className="text-gray-500 text-sm">Angel Investor</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SalesPage;
