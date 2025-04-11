
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Globe, LineChart, MessageSquare, Search, Shield, Star, Users } from "lucide-react";

const benefitsData = [
  {
    title: "Enhanced Visibility",
    description: "Get featured in search results and gain more visibility in the Muslim community.",
    icon: <Search className="h-10 w-10 text-muslim-teal" />,
  },
  {
    title: "Verified Business Badge",
    description: "A trust badge that shows users your business has been verified by Ummah Connects.",
    icon: <Shield className="h-10 w-10 text-muslim-teal" />,
  },
  {
    title: "Community Networking",
    description: "Connect with other Muslim business owners for partnerships and collaboration.",
    icon: <Users className="h-10 w-10 text-muslim-teal" />,
  },
  {
    title: "Business Analytics",
    description: "Access detailed analytics about how users interact with your business listing.",
    icon: <LineChart className="h-10 w-10 text-muslim-teal" />,
  },
  {
    title: "Global Reach",
    description: "Extend your reach to Muslims around the world looking for halal products and services.",
    icon: <Globe className="h-10 w-10 text-muslim-teal" />,
  },
  {
    title: "Trust & Credibility",
    description: "Build trust with verified reviews and ratings from Muslim customers.",
    icon: <Star className="h-10 w-10 text-muslim-teal" />,
  },
  {
    title: "Priority Support",
    description: "Get priority customer support to address any issues or questions promptly.",
    icon: <MessageSquare className="h-10 w-10 text-muslim-teal" />,
  },
  {
    title: "Exclusive Offers",
    description: "Ability to post exclusive offers and discounts for community members.",
    icon: <CheckCircle2 className="h-10 w-10 text-muslim-teal" />,
  },
];

const MembershipBenefits = () => {
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-muslim-dark mb-2">The Benefits of Membership</h2>
        <p className="text-gray-600">
          Join our network of Muslim-owned businesses and enjoy these exclusive benefits
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {benefitsData.map((benefit, index) => (
          <Card key={index} className="h-full">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4">{benefit.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-muslim-teal/10 rounded-lg p-6 mt-8">
        <h3 className="text-xl font-semibold text-muslim-dark mb-4">How Membership Helps the Ummah</h3>
        <p className="text-gray-700 mb-4">
          When Muslims support Muslim-owned businesses, we create an economic ecosystem that strengthens our community.
          Your membership helps us connect Muslims with quality halal products and services while supporting the
          growth of Islamic entrepreneurship worldwide.
        </p>
        <p className="text-gray-700">
          A portion of all membership fees goes toward supporting Islamic charitable causes and community development projects,
          making your membership a form of ongoing Sadaqah.
        </p>
      </div>
    </div>
  );
};

export default MembershipBenefits;
