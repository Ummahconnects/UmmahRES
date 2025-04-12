
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MosqueSubmissionForm } from "../../types/mosqueTypes";

interface BasicInfoFieldsProps {
  form: UseFormReturn<MosqueSubmissionForm>;
}

const BasicInfoFields = ({ form }: BasicInfoFieldsProps) => {
  return (
    <>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Mosque Name*</FormLabel>
            <FormControl>
              <Input placeholder="Enter mosque name" required {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="type"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Type*</FormLabel>
            <Select 
              value={field.value}
              onValueChange={field.onChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Islamic Center">Islamic Center</SelectItem>
                <SelectItem value="Sunni Mosque">Sunni Mosque</SelectItem>
                <SelectItem value="Shia Mosque">Shia Mosque</SelectItem>
                <SelectItem value="Sufi Center">Sufi Center</SelectItem>
                <SelectItem value="Prayer Space">Prayer Space</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="address"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Address*</FormLabel>
            <FormControl>
              <Input placeholder="Full address" required {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="jumuahTime"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Jumu'ah Prayer Time</FormLabel>
            <FormControl>
              <Input placeholder="e.g., 1:30 PM" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default BasicInfoFields;
