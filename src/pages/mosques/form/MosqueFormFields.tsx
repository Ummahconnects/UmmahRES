
import React from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { MosqueSubmissionForm } from "../types/mosqueTypes";
import BasicInfoFields from "./fields/BasicInfoFields";
import ContactInfoFields from "./fields/ContactInfoFields";
import AdditionalInfoFields from "./fields/AdditionalInfoFields";

interface MosqueFormFieldsProps {
  onOpenChange: (open: boolean) => void;
}

const MosqueFormFields = ({ onOpenChange }: MosqueFormFieldsProps) => {
  const { toast } = useToast();

  const form = useForm<MosqueSubmissionForm>({
    defaultValues: {
      name: "",
      type: "Islamic Center",
      address: "",
      jumuahTime: "",
      facilities: "",
      additionalInfo: "",
      contactEmail: "",
    },
  });

  const handleSubmitMosque = (data: MosqueSubmissionForm) => {
    const facilitiesArray = data.facilities
      .split(',')
      .map(facility => facility.trim())
      .filter(facility => facility !== '');

    toast({
      title: "Mosque submitted for approval",
      description: "Thank you for your contribution. Your submission will be reviewed by our team.",
    });

    console.log("Mosque submission:", {
      ...data,
      facilities: facilitiesArray,
    });

    onOpenChange(false);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmitMosque)} className="space-y-4">
        <BasicInfoFields form={form} />
        <ContactInfoFields form={form} />
        <AdditionalInfoFields form={form} />
        
        <DialogFooter className="mt-6">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button type="submit">Submit for Approval</Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default MosqueFormFields;
