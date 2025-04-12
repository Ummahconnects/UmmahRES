
import { Button } from "@/components/ui/button";
import { Loader2, Save } from "lucide-react";

interface FormActionsProps {
  saving: boolean;
}

const FormActions = ({ saving }: FormActionsProps) => {
  return (
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
  );
};

export default FormActions;
