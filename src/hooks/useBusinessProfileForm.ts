
import { useState, useEffect } from "react";
import { z } from "zod";
import { UseFormReturn, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { BusinessProfile } from "@/integrations/supabase/dbTypes";
import { BusinessTemplate } from "@/components/business/BusinessTemplates";

// Form validation schema
export const profileSchema = z.object({
  business_name: z.string().min(2, "Business name must be at least 2 characters"),
  business_description: z.string().min(20, "Description must be at least 20 characters"),
  category: z.string().min(1, "Please select a category"),
  address: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email("Please enter a valid email").optional(),
  website: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
});

// Define business profile type
export type ProfileFormValues = z.infer<typeof profileSchema>;

interface UseBusinessProfileFormProps {
  user: { id: string };
  profileData: BusinessProfile | null;
  isEditing: boolean;
  id?: string;
  onProfileSaved: (profileId: string) => void;
  templateData?: BusinessTemplate | null;
  initialBusinessName?: string;
}

export const useBusinessProfileForm = ({
  user,
  profileData,
  isEditing,
  id,
  onProfileSaved,
  templateData,
  initialBusinessName
}: UseBusinessProfileFormProps) => {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      business_name: profileData?.business_name || initialBusinessName || "",
      business_description: profileData?.business_description || "",
      category: profileData?.category || templateData?.id || "",
      address: profileData?.address || "",
      phone: profileData?.phone || "",
      email: profileData?.email || "",
      website: profileData?.website || "",
    },
  });

  // Update form values when initialBusinessName changes
  useEffect(() => {
    if (initialBusinessName && !profileData?.business_name) {
      form.setValue('business_name', initialBusinessName);
    }
  }, [initialBusinessName, form, profileData?.business_name]);

  // Update form values when templateData changes
  useEffect(() => {
    if (templateData?.id && !profileData?.category) {
      form.setValue('category', templateData.id);
    }
  }, [templateData, form, profileData?.category]);

  const onSubmit = async (values: ProfileFormValues) => {
    if (!user) return;
    
    try {
      setSaving(true);
      
      if (isEditing && id) {
        // Update existing profile
        const { error } = await supabase
          .from("business_profiles")
          .update(values)
          .eq("id", id);
          
        if (error) throw error;
        
        toast({
          title: "Profile updated",
          description: "Your business profile has been updated successfully",
        });
        
        onProfileSaved(id);
      } else {
        // Create new profile
        const { data, error } = await supabase
          .from("business_profiles")
          .insert({
            ...values,
            user_id: user.id,
          })
          .select();
          
        if (error) throw error;
        
        toast({
          title: "Profile created",
          description: "Your business profile has been created successfully",
        });
        
        if (data && data[0]) {
          onProfileSaved(data[0].id);
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

  return {
    form,
    saving,
    onSubmit,
  };
};
