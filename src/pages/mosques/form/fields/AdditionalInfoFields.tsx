
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MosqueSubmissionForm } from "../../types/mosqueTypes";

interface AdditionalInfoFieldsProps {
  form: UseFormReturn<MosqueSubmissionForm>;
}

const AdditionalInfoFields = ({ form }: AdditionalInfoFieldsProps) => {
  return (
    <>
      <FormField
        control={form.control}
        name="facilities"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Facilities</FormLabel>
            <FormControl>
              <Input 
                placeholder="e.g., Women's Section, Parking, Wheelchair Access" 
                {...field} 
              />
            </FormControl>
            <p className="text-xs text-gray-500 mt-1">
              Separate facilities with commas
            </p>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="additionalInfo"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Additional Information</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Add any additional details about the mosque"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default AdditionalInfoFields;
