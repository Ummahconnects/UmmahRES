
import React from 'react';
import { Calendar, DollarSign } from "lucide-react";
import FlashingBanner from './FlashingBanner';

const EventsBanner = () => {
  return (
    <FlashingBanner 
      icon={<Calendar className="h-4 w-4" />}
      message="Submit your community event with a small $5 (or equivalent in your local currency) donation to support local initiatives!"
      colorScheme="warning"
    />
  );
};

export default EventsBanner;
