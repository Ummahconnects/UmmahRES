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
            .single() as { data: BusinessProfile; error: any };
            
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
          }
        } else {
          // Check if user already has a business profile
          const { data, error } = await supabase
            .from("business_profiles")
            .select("id")
            .eq("user_id", user.id)
            .maybeSingle() as { data: { id: string } | null; error: any };
            
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
          <ProfileForm
            user={user}
            profileData={profileData}
            isEditing={isEditing}
            id={id}
            onProfileSaved={handleProfileSaved}
          />
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
