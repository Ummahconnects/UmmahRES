
import Layout from "@/components/Layout";
import { Separator } from "@/components/ui/separator";
import PackageHeader from "@/components/packages/PackageHeader";
import PackageGrid from "@/components/packages/PackageGrid";
import PackageFeatureGrid from "@/components/packages/PackageFeatureGrid";
import ReviewsComparisonSection from "@/components/packages/ReviewsComparisonSection";
import { BarChart3, Globe, Sparkles } from "lucide-react";

const PackagesPage = () => {
  const locationFeatures = {
    title: "Location-Based Advertising",
    description: "Our platform features city-specific pages that showcase local businesses to users in their area. When users log in, they are automatically directed to their local city page.",
    gridItems: [
      {
        title: "Platinum Listing Features",
        features: [
          "Featured on your city's local business page",
          "Limited to 6 businesses per city page",
          "Rotate through multiple pages as needed"
        ],
        icon: <Sparkles className="h-5 w-5 text-muslim-blue" />
      },
      {
        title: "Supreme Sponsor Benefits",
        features: [
          "Half-page premium placement",
          "Only 2 major sponsors featured monthly",
          "Global visibility across all city pages"
        ],
        highlight: true,
        icon: <Globe className="h-5 w-5 text-muslim-gold" />
      }
    ]
  };

  const analyticsFeatures = {
    title: "Business Analytics Dashboard",
    description: "Gain valuable insights into your business performance with our analytics dashboard, available for Premium packages and above.",
    gridItems: [
      {
        title: "Premium Analytics",
        features: [
          "Basic dashboard access",
          "View profile visits and contact clicks",
          "Limited to 2 key performance metrics",
          "Monthly performance summary"
        ],
        icon: <BarChart3 className="h-5 w-5 text-muslim-teal" />
      },
      {
        title: "Platinum & Supreme Analytics",
        features: [
          "Full analytics dashboard",
          "Comprehensive visitor data",
          "Location breakdown charts",
          "Performance trends over time",
          "Weekly activity reports"
        ],
        highlight: true,
        icon: <BarChart3 className="h-5 w-5 text-muslim-gold" />
      }
    ]
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <PackageHeader />
        <PackageGrid />
        
        <Separator className="my-16" />
        
        <PackageFeatureGrid 
          title={analyticsFeatures.title}
          description={analyticsFeatures.description}
          gridItems={analyticsFeatures.gridItems}
        />
        
        <PackageFeatureGrid 
          title={locationFeatures.title}
          description={locationFeatures.description}
          gridItems={locationFeatures.gridItems}
        />
        
        <Separator className="my-16" />
        
        <ReviewsComparisonSection />
      </div>
    </Layout>
  );
};

export default PackagesPage;
