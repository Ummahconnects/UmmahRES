
import React from "react";
import FormContainer from "./form/FormContainer";

interface MosqueFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const MosqueForm = ({ isOpen, onOpenChange }: MosqueFormProps) => {
  return (
    <FormContainer 
      isOpen={isOpen} 
      onOpenChange={onOpenChange} 
    />
  );
};

export default MosqueForm;
