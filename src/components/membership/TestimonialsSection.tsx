
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote } from "lucide-react";
import StarRating from "../reviews/StarRating";

const testimonials = [
  {
    id: 1,
    name: "Ahmed Abdullah",
    business: "Halal Delights Bakery",
    image: "",
    initials: "AA",
    testimonial: "Since joining Ummah Connects, our bakery has seen a 40% increase in Muslim customers. The verified badge has built trust with our community and the networking opportunities have been invaluable.",
    rating: 5,
    membershipTier: "Premium"
  },
  {
    id: 2,
    name: "Fatima Hassan",
    business: "Modest Fashion Boutique",
    image: "",
    initials: "FH",
    testimonial: "Alhamdulillah, joining as a premium member has transformed my boutique's visibility. I've connected with Muslim customers who specifically seek out modest fashion, and the business analytics have helped me improve my offerings.",
    rating: 5,
    membershipTier: "Premium"
  },
  {
    id: 3,
    name: "Omar Khan",
    business: "Halal Investment Services",
    image: "",
    initials: "OK",
    testimonial: "The enterprise membership has provided me with quality leads for my Islamic finance business. Being featured in the newsletter and events has positioned us as a trusted advisor in the community.",
    rating: 4.5,
    membershipTier: "Enterprise"
  },
  {
    id: 4,
    name: "Aisha Mohammed",
    business: "Barakah Health Clinic",
    image: "",
    initials: "AM",
    testimonial: "Even with the basic membership, we've seen tremendous value. The verified badge has helped establish our credibility as a Muslim-owned health service, and patients appreciate knowing they're supporting the Ummah.",
    rating: 4,
    membershipTier: "Basic"
  }
];

const TestimonialsSection = () => {
  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-muslim-dark mb-4">What Our Members Say</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Hear from businesses that have grown with Ummah Connects membership
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12 border-2 border-muslim-teal">
                  {testimonial.image ? (
                    <AvatarImage src={testimonial.image} alt={testimonial.name} />
                  ) : (
                    <AvatarFallback className="bg-muslim-teal/20 text-muslim-teal">
                      {testimonial.initials}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-gray-500 mb-1">{testimonial.business}</div>
                  <div className="flex items-center gap-2">
                    <StarRating rating={testimonial.rating} size="sm" />
                    <span className="text-xs bg-muslim-teal/10 text-muslim-teal px-2 py-0.5 rounded-full">
                      {testimonial.membershipTier}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-4 relative pl-6">
                <Quote className="absolute left-0 top-0 h-5 w-5 text-muslim-teal/40 -translate-y-1" />
                <p className="text-gray-700 italic">{testimonial.testimonial}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsSection;
