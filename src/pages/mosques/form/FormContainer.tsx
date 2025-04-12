
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import MosqueFormFields from "./MosqueFormFields";
import { MosqueSubmissionForm } from "../types/mosqueTypes";

interface FormContainerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const FormContainer = ({ isOpen, onOpenChange }: FormContainerProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Add a Mosque or Islamic Center</DialogTitle>
          <DialogDescription>
            Submit mosque details for review. Once approved, it will appear in the directory.
          </DialogDescription>
        </DialogHeader>
        
        <MosqueFormFields onOpenChange={onOpenChange} />
      </DialogContent>
    </Dialog>
  );
};

export default FormContainer;
