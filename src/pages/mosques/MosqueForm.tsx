
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

export type MosqueSubmissionForm = {
  name: string;
  type: string;
  address: string;
  jumuahTime: string;
  facilities: string;
  additionalInfo: string;
  contactEmail: string;
};

interface MosqueFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const MosqueForm = ({ isOpen, onOpenChange }: MosqueFormProps) => {
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
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Add a Mosque or Islamic Center</DialogTitle>
          <DialogDescription>
            Submit mosque details for review. Once approved, it will appear in the directory.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmitMosque)} className="space-y-4">
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
      </DialogContent>
    </Dialog>
  );
};

export default MosqueForm;
