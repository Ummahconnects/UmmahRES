
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/Layout";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2, Save } from "lucide-react";
import MembershipSection from "@/components/business/MembershipSection";
import ReviewSection from "@/components/reviews/ReviewSection";

// Form validation schema
const profileSchema = z.object({
  business_name: z.string().min(2, "Business name must be at least 2 characters"),
  business_description: z.string().min(20, "Description must be at least 20 characters"),
  category: z.string().min(1, "Please select a category"),
  address: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email("Please enter a valid email").optional(),
  website: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
});

// Define business profile type
interface BusinessProfile {
  id: string;
  user_id: string;
  business_name: string;
  business_description: string;
  category: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
}

type ProfileFormValues = z.infer<typeof profileSchema>;

const BusinessProfilePage = () => {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profileData, setProfileData] = useState<BusinessProfile | null>(null);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      business_name: "",
      business_description: "",
      category: "",
      address: "",
      phone: "",
      email: "",
      website: "",
    },
  });

  // Fetch business profile data if editing
  useEffect(() => {
    const fetchProfileData = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        
        if (isEditing && id) {
          // Fetch existing profile with type assertion
          const { data, error } = await supabase
            .from("business_profiles")
            .select("*")
            .eq("id", id)
            .single() as unknown as { data: BusinessProfile | null; error: any };
            
          if (error) throw error;
          
          // Verify ownership
          if (data && data.user_id !== user.id) {
            toast({
              title: "Unauthorized",
              description: "You don't have permission to edit this profile",
              variant: "destructive",
            });
            navigate("/");
            return;
          }
          
          if (data) {
            setProfileData(data);
            form.reset({
              business_name: data.business_name || "",
              business_description: data.business_description || "",
              category: data.category || "",
              address: data.address || "",
              phone: data.phone || "",
              email: data.email || "",
              website: data.website || "",
            });
          }
        } else {
          // Check if user already has a business profile
          const { data, error } = await supabase
            .from("business_profiles")
            .select("id")
            .eq("user_id", user.id)
            .maybeSingle() as unknown as { data: { id: string } | null; error: any };
            
          if (!error && data) {
            toast({
              title: "Profile exists",
              description: "You already have a business profile",
            });
            navigate(`/business-profile/${data.id}`);
            return;
          }
        }
      } catch (error: any) {
        console.error("Error fetching profile:", error);
        toast({
          title: "Error",
          description: error.message || "Failed to load business profile",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [user, id, isEditing, navigate]);

  const onSubmit = async (values: ProfileFormValues) => {
    if (!user) return;
    
    try {
      setSaving(true);
      
      if (isEditing && id) {
        // Update existing profile with type assertion
        const { error } = await supabase
          .from("business_profiles")
          .update(values)
          .eq("id", id) as unknown as { error: any };
          
        if (error) throw error;
        
        toast({
          title: "Profile updated",
          description: "Your business profile has been updated successfully",
        });
      } else {
        // Create new profile with type assertion
        const { data, error } = await supabase
          .from("business_profiles")
          .insert({
            ...values,
            user_id: user.id,
          })
          .select() as unknown as { data: BusinessProfile[]; error: any };
          
        if (error) throw error;
        
        toast({
          title: "Profile created",
          description: "Your business profile has been created successfully",
        });
        
        if (data && data[0]) {
          navigate(`/business-profile/${data[0].id}`);
        }
      }
    } catch (error: any) {
      console.error("Error saving profile:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to save business profile",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (!user) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Please sign in</h1>
            <p className="mb-4">You need to be signed in to access this page</p>
            <Button onClick={() => navigate("/auth")}>
              Sign In / Register
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">
          {isEditing ? "Edit Business Profile" : "Create Business Profile"}
        </h1>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Business Information</CardTitle>
            <CardDescription>
              Provide details about your business to help customers find you
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-muslim-teal" />
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="business_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your Business Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Category</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="retail">Retail</SelectItem>
                            <SelectItem value="food">Food & Restaurant</SelectItem>
                            <SelectItem value="professional">Professional Services</SelectItem>
                            <SelectItem value="healthcare">Healthcare</SelectItem>
                            <SelectItem value="educational">Educational</SelectItem>
                            <SelectItem value="tech">Technology</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="business_description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe your business, products/services, and how you serve the Muslim community..." 
                            className="min-h-[120px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="123 Main St, City, State, ZIP" {...field} />
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
                          <FormLabel>Phone (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="+1 (555) 123-4567" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Business Email (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="contact@yourbusiness.com" {...field} />
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
                            <Input placeholder="https://www.yourbusiness.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <Button type="submit" className="bg-muslim-teal hover:bg-muslim-teal/90" disabled={saving}>
                    {saving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Business Profile
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            )}
          </CardContent>
        </Card>
        
        {isEditing && profileData && (
          <>
            <MembershipSection businessId={id!} />
            <div className="mt-8">
              <ReviewSection 
                entityName={profileData.business_name} 
                entityType="business"
                entityId={id}
                reviewPrompt="Share your experience with this business..."
              />
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default BusinessProfilePage;
