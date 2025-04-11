
import React from "react";
import ReviewSection from "@/components/reviews/ReviewSection";

const ReviewsComparisonSection = () => {
  return (
    <div className="mb-12">
      <h2 className="text-3xl font-bold text-muslim-dark mb-6 text-center">Reviews & Feedback</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div>
          <h3 className="text-xl font-semibold text-muslim-dark mb-4 text-center">What Customers Say About Our Listed Businesses</h3>
          <ReviewSection 
            entityName="Listed Businesses" 
            entityType="business"
            reviewPrompt="Share your experience with this business..."
          />
        </div>
        
        <div>
          <h3 className="text-xl font-semibold text-muslim-dark mb-4 text-center">Feedback From Our Business Partners</h3>
          <ReviewSection 
            entityName="Ummah Connects Platform" 
            entityType="business"
            reviewPrompt="How can we improve our service for your business?"
          />
        </div>
      </div>
    </div>
  );
};

export default ReviewsComparisonSection;
