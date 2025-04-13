
import { ReactNode } from "react";
import ProfileForm from "@/components/business/ProfileForm";
import ProfileFormSkeleton from "@/components/business/ProfileFormSkeleton";
import MembershipSection from "@/components/business/MembershipSection";
import ReviewSection from "@/components/reviews/ReviewSection";
import { BusinessProfile } from "@/integrations/supabase/dbTypes";
import { BusinessTemplate } from "@/components/business/BusinessTemplates";

interface ProfileContentProps {
  user: { id: string };
  profileData: BusinessProfile | null;
  isEditing: boolean;
  id?: string;
  onProfileSaved: (profileId: string) => void;
  templateData?: BusinessTemplate | null;
  initialBusinessName?: string;
}

const ProfileContent = ({
  user,
  profileData,
  isEditing,
  id,
  onProfileSaved,
  templateData,
  initialBusinessName,
}: ProfileContentProps) => {
  return (
    <ProfileForm
      user={user}
      profileData={profileData}
      isEditing={isEditing}
      id={id}
      onProfileSaved={onProfileSaved}
      templateData={templateData}
      initialBusinessName={initialBusinessName}
    />
  );
};

// Skeleton loader for profile content
const Skeleton = () => <ProfileFormSkeleton />;

// Additional sections that appear when editing an existing profile
interface AdditionalSectionsProps {
  businessId: string;
  businessName: string;
}

const AdditionalSections = ({ businessId, businessName }: AdditionalSectionsProps) => {
  return (
    <>
      <MembershipSection businessId={businessId} />
      <div className="mt-8">
        <ReviewSection 
          entityName={businessName} 
          entityType="business"
          businessId={businessId}
          reviewPrompt="Share your experience with this business..."
        />
      </div>
    </>
  );
};

// Add components as properties of ProfileContent
ProfileContent.Skeleton = Skeleton;
ProfileContent.AdditionalSections = AdditionalSections;

export default ProfileContent;
