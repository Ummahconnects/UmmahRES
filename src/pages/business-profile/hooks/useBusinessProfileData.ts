
import { useState, useEffect } from "react";
import { NavigateFunction } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { BusinessProfile } from "@/integrations/supabase/dbTypes";

interface UseBusinessProfileDataProps {
  user: { id: string } | null;
  id?: string;
  isEditing: boolean;
  navigate: NavigateFunction;
  toast: any;
}

const useBusinessProfileData = ({ 
  user, 
  id, 
  isEditing, 
  navigate, 
  toast 
}: UseBusinessProfileDataProps) => {
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState<BusinessProfile | null>(null);
  const [profileSaved, setProfileSaved] = useState(false);
  const [savedProfileId, setSavedProfileId] = useState<string | null>(null);

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

  return {
    loading,
    profileData,
    profileSaved,
    savedProfileId,
    handleProfileSaved
  };
};

export default useBusinessProfileData;
