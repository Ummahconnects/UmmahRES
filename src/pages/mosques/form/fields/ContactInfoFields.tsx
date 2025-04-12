
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MosqueSubmissionForm } from "../../types/mosqueTypes";

interface ContactInfoFieldsProps {
  form: UseFormReturn<MosqueSubmissionForm>;
}

const ContactInfoFields = ({ form }: ContactInfoFieldsProps) => {
  return (
    <FormField
      control={form.control}
      name="contactEmail"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Contact Email*</FormLabel>
          <FormControl>
            <Input 
              type="email"
              placeholder="Your email for verification"
              required
              {...field}
            />
          </FormControl>
          <p className="text-xs text-gray-500 mt-1">
            We'll use this to contact you about your submission
          </p>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ContactInfoFields;
