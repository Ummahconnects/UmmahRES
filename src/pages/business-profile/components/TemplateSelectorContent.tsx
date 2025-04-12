
import { ChangeEvent } from "react";
import BusinessTemplates, { BusinessTemplate } from "@/components/business/BusinessTemplates";
import TemplatePreview from "@/components/business/TemplatePreview";
import { Button } from "@/components/ui/button";

interface TemplateSelectorContentProps {
  businessName: string;
  onBusinessNameChange: (e: ChangeEvent<HTMLInputElement>) => void;
  selectedTemplate: BusinessTemplate | null;
  onSelectTemplate: (template: BusinessTemplate) => void;
  onContinue: () => void;
}

const TemplateSelectorContent = ({
  businessName,
  onBusinessNameChange,
  selectedTemplate,
  onSelectTemplate,
  onContinue
}: TemplateSelectorContentProps) => {
  return (
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
          onChange={onBusinessNameChange}
          placeholder="Enter your business name"
          className="w-full md:w-2/3 p-2 border rounded-md"
        />
      </div>
      
      <BusinessTemplates 
        onSelectTemplate={onSelectTemplate}
        selectedTemplateId={selectedTemplate?.id}
      />
      
      {selectedTemplate && (
        <div className="mt-8">
          <TemplatePreview 
            template={selectedTemplate}
            businessName={businessName}
          />
          
          <Button 
            onClick={onContinue}
            className="mt-6 bg-muslim-teal hover:bg-muslim-teal/90"
          >
            Continue with this template
          </Button>
        </div>
      )}
    </div>
  );
};

export default TemplateSelectorContent;
