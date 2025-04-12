
import { Form } from "@/components/ui/form";
import { BusinessProfile } from "@/integrations/supabase/dbTypes";
import { BusinessTemplate } from "./BusinessTemplates";
import BusinessInfoSection from "./form/BusinessInfoSection";
import ContactInfoSection from "./form/ContactInfoSection";
import FormActions from "./form/FormActions";
import FormCard from "./form/FormCard";
import { useBusinessProfileForm } from "@/hooks/useBusinessProfileForm";

// Define business profile props
export interface ProfileFormProps {
  user: { id: string };
  profileData: BusinessProfile | null;
  isEditing: boolean;
  id?: string;
  onProfileSaved: (profileId: string) => void;
  templateData?: BusinessTemplate | null;
  initialBusinessName?: string;
}

const ProfileForm = ({
  user,
  profileData,
  isEditing,
  id,
  onProfileSaved,
  templateData,
  initialBusinessName,
}: ProfileFormProps) => {
  const { form, saving, onSubmit } = useBusinessProfileForm({
    user,
    profileData,
    isEditing,
    id,
    onProfileSaved,
    templateData,
    initialBusinessName,
  });

  return (
    <FormCard
      title="Business Information"
      description="Provide details about your business to help customers find you"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <BusinessInfoSection form={form} />
          <ContactInfoSection form={form} />
          <FormActions saving={saving} />
        </form>
      </Form>
    </FormCard>
  );
};

export default ProfileForm;
