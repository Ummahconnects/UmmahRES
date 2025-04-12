
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/Layout";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { BusinessProfile } from "@/integrations/supabase/dbTypes";
import { BusinessTemplate } from "@/components/business/BusinessTemplates";
import AuthRequired from "@/components/auth/AuthRequired";
import ProfileContent from "./components/ProfileContent";
import TemplateSelectorContent from "./components/TemplateSelectorContent";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useBusinessProfileData from "./hooks/useBusinessProfileData";

const BusinessProfilePage = () => {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedTemplate, setSelectedTemplate] = useState<BusinessTemplate | null>(null);
  const [activeTab, setActiveTab] = useState<string>(isEditing ? "profile" : "templates");
  const [businessName, setBusinessName] = useState<string>("");
  
  const { 
    loading, 
    profileData, 
    profileSaved, 
    savedProfileId, 
    handleProfileSaved 
  } = useBusinessProfileData({ user, id, isEditing, navigate, toast });

  const handleSelectTemplate = (template: BusinessTemplate) => {
    setSelectedTemplate(template);
  };

  const handleBusinessNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBusinessName(e.target.value);
  };

  const handleContinueWithTemplate = () => {
    if (selectedTemplate) {
      setActiveTab("profile");
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
          <ProfileContent.Skeleton />
        ) : (
          <>
            {!isEditing && (
              <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="templates">Choose Template</TabsTrigger>
                  <TabsTrigger value="profile">Business Details</TabsTrigger>
                </TabsList>
                <TabsContent value="templates" className="mt-6">
                  <TemplateSelectorContent
                    businessName={businessName}
                    onBusinessNameChange={handleBusinessNameChange}
                    selectedTemplate={selectedTemplate}
                    onSelectTemplate={handleSelectTemplate}
                    onContinue={handleContinueWithTemplate}
                  />
                </TabsContent>
                <TabsContent value="profile">
                  <ProfileContent
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
              <ProfileContent
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
          <ProfileContent.AdditionalSections
            businessId={savedProfileId}
            businessName={profileData.business_name}
          />
        )}
      </div>
    </Layout>
  );
};

export default BusinessProfilePage;
