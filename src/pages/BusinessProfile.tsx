
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/Layout";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import MembershipSection from "@/components/business/MembershipSection";
import ReviewSection from "@/components/reviews/ReviewSection";
import ProfileForm from "@/components/business/ProfileForm";
import ProfileFormSkeleton from "@/components/business/ProfileFormSkeleton";
import AuthRequired from "@/components/auth/AuthRequired";
import { BusinessProfile } from "@/integrations/supabase/dbTypes";
import BusinessTemplates, { BusinessTemplate } from "@/components/business/BusinessTemplates";
import TemplatePreview from "@/components/business/TemplatePreview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

const BusinessProfilePage = () => {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState<BusinessProfile | null>(null);
  const [profileSaved, setProfileSaved] = useState(false);
  const [savedProfileId, setSavedProfileId] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<BusinessTemplate | null>(null);
  const [activeTab, setActiveTab] = useState<string>(isEditing ? "profile" : "templates");
  const [businessName, setBusinessName] = useState<string>("");

  // Fetch business profile data if editing
  useEffect(() => {
    const fetchProfileData = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        
        if (isEditing && id) {
          // Fetch existing profile
          const { data, error } = await supabase
            .from("business_profiles")
            .select("*")
            .eq("id", id)
            .single();
            
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
            setSavedProfileId(id);
            setProfileSaved(true);
            setBusinessName(data.business_name || "");
          }
        } else {
          // Check if user already has a business profile
          const { data, error } = await supabase
            .from("business_profiles")
            .select("id")
            .eq("user_id", user.id)
            .maybeSingle();
            
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

  const handleProfileSaved = (profileId: string) => {
    setSavedProfileId(profileId);
    setProfileSaved(true);
    if (!isEditing) {
      navigate(`/business-profile/${profileId}`);
    }
  };

  const handleSelectTemplate = (template: BusinessTemplate) => {
    setSelectedTemplate(template);
  };

  const handleBusinessNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBusinessName(e.target.value);
  };

  const handleContinueWithTemplate = () => {
    if (selectedTemplate) {
      setActiveTab("profile");
      // Here you would typically pass the template data to the ProfileForm
      // For now, we'll just switch to the profile tab
    }
  };
  
  if (!user) {
    return (
      <Layout>
        <AuthRequired>
          <p>You need to be logged in to access this page.</p>
        </AuthRequired>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">
          {isEditing ? "Edit Business Profile" : "Create Business Profile"}
        </h1>
        
        {loading ? (
          <ProfileFormSkeleton />
        ) : (
          <>
            {!isEditing && (
              <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="templates">Choose Template</TabsTrigger>
                  <TabsTrigger value="profile">Business Details</TabsTrigger>
                </TabsList>
                <TabsContent value="templates" className="mt-6">
                  <div className="space-y-6">
                    <div className="bg-muslim-teal/10 border border-muslim-teal/20 rounded-lg p-4 mb-6">
                      <h2 className="font-medium text-muslim-teal mb-2">No Logo or Branding? No Problem!</h2>
                      <p className="text-sm">
                        Our templates make it easy to create a professional business profile without custom graphics.
                        Choose a template below to get started.
                      </p>
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="businessName" className="block text-sm font-medium mb-1">
                        Business Name
                      </label>
                      <input
                        type="text"
                        id="businessName"
                        value={businessName}
                        onChange={handleBusinessNameChange}
                        placeholder="Enter your business name"
                        className="w-full md:w-2/3 p-2 border rounded-md"
                      />
                    </div>
                    
                    <BusinessTemplates 
                      onSelectTemplate={handleSelectTemplate}
                      selectedTemplateId={selectedTemplate?.id}
                    />
                    
                    {selectedTemplate && (
                      <div className="mt-8">
                        <TemplatePreview 
                          template={selectedTemplate}
                          businessName={businessName}
                        />
                        
                        <Button 
                          onClick={handleContinueWithTemplate}
                          className="mt-6 bg-muslim-teal hover:bg-muslim-teal/90"
                        >
                          Continue with this template
                        </Button>
                      </div>
                    )}
                  </div>
                </TabsContent>
                <TabsContent value="profile">
                  <ProfileForm
                    user={user}
                    profileData={profileData}
                    isEditing={isEditing}
                    id={id}
                    onProfileSaved={handleProfileSaved}
                    templateData={selectedTemplate}
                    initialBusinessName={businessName}
                  />
                </TabsContent>
              </Tabs>
            )}
            
            {isEditing && (
              <ProfileForm
                user={user}
                profileData={profileData}
                isEditing={isEditing}
                id={id}
                onProfileSaved={handleProfileSaved}
              />
            )}
          </>
        )}
        
        {isEditing && profileData && savedProfileId && (
          <>
            <MembershipSection businessId={savedProfileId} />
            <div className="mt-8">
              <ReviewSection 
                entityName={profileData.business_name} 
                entityType="business"
                entityId={savedProfileId}
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
