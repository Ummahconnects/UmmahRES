
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Layout from "@/components/Layout";

// Package tier data
const packages = [
  {
    id: "basic",
    name: "Basic",
    price: "Free",
    description: "Essential visibility for your business",
    features: [
      "Basic business listing",
      "Contact information",
      "Business category",
      "Address information",
    ],
    buttonText: "Get Started",
    highlighted: false,
  },
  {
    id: "standard",
    name: "Standard",
    price: "$9.99/month",
    description: "Enhanced visibility with premium features",
    features: [
      "Everything in Basic",
      "Featured in search results",
      "Photo gallery (up to 5 photos)",
      "Business hours listing",
      "Basic analytics",
    ],
    buttonText: "Subscribe Now",
    highlighted: true,
  },
  {
    id: "premium",
    name: "Premium",
    price: "$19.99/month",
    description: "Maximum visibility and promotion",
    features: [
      "Everything in Standard",
      "Top placement in search results",
      "Unlimited photo gallery",
      "Promotional badges",
      "Featured on homepage",
      "Advanced analytics",
      "Customer reviews management",
    ],
    buttonText: "Go Premium",
    highlighted: false,
  },
];

const PackagesPage = () => {
  return (
    <Layout>
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-muslim-dark mb-4">
              Listing Packages
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose the right package to showcase your business to the Muslim community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <Card 
                key={pkg.id} 
                className={`flex flex-col ${
                  pkg.highlighted 
                    ? "border-muslim-teal border-2 shadow-lg relative" 
                    : "border border-gray-200"
                }`}
              >
                {pkg.highlighted && (
                  <div className="absolute top-0 inset-x-0 transform -translate-y-1/2">
                    <span className="bg-muslim-teal text-white text-sm px-3 py-1 rounded-full inline-block">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-xl font-bold">{pkg.name}</CardTitle>
                  <div className="mt-2">
                    <span className="text-3xl font-bold">{pkg.price}</span>
                    {pkg.price !== "Free" && (
                      <span className="text-gray-500 text-sm ml-1">per month</span>
                    )}
                  </div>
                  <CardDescription className="mt-3">{pkg.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-3">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="pt-4">
                  <Button 
                    className={`w-full ${
                      pkg.highlighted 
                        ? "bg-muslim-teal hover:bg-muslim-teal/90" 
                        : ""
                    }`}
                  >
                    {pkg.buttonText}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold text-muslim-dark mb-4">
              Need a Custom Solution?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-6">
              If your business has unique requirements, we offer custom packages tailored to your specific needs.
            </p>
            <Button variant="outline" size="lg">
              Contact Us for Custom Pricing
            </Button>
          </div>

          <div className="mt-16 bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
            <h2 className="text-2xl font-bold text-muslim-dark mb-4">
              Frequently Asked Questions
            </h2>
            <div className="grid gap-6 mt-8">
              <div>
                <h3 className="font-medium text-lg text-muslim-dark">Can I upgrade my package later?</h3>
                <p className="text-gray-600 mt-2">
                  Yes, you can upgrade your package at any time. Your billing will be prorated based on the remaining time in your current billing cycle.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-lg text-muslim-dark">How does billing work?</h3>
                <p className="text-gray-600 mt-2">
                  All paid packages are billed monthly. You can cancel at any time, and your listing will remain active until the end of your current billing period.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-lg text-muslim-dark">What happens after I sign up?</h3>
                <p className="text-gray-600 mt-2">
                  After signing up, you'll be able to create and customize your business listing. Our team will review your listing before it goes live to ensure it meets our community guidelines.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PackagesPage;
