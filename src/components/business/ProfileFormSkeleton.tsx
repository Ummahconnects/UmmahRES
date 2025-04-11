
import { Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ProfileFormSkeleton = () => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Business Information</CardTitle>
        <CardDescription>
          Provide details about your business to help customers find you
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-muslim-teal" />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileFormSkeleton;
