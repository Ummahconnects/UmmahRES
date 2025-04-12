
import Layout from "@/components/Layout";
import { Separator } from "@/components/ui/separator";
import PackageHeader from "@/components/packages/PackageHeader";
import PackageGrid from "@/components/packages/PackageGrid";
import PackageFeatureGrid from "@/components/packages/PackageFeatureGrid";
import ReviewsComparisonSection from "@/components/packages/ReviewsComparisonSection";
import CustomPackageForm from "@/components/packages/CustomPackageForm";
import FlashingBanner from "@/components/FlashingBanner";
import { BarChart3, BadgeCheck, Church, Globe, HeartHandshake, Sparkles } from "lucide-react";

const PackagesPage = () => {
  const locationFeatures = {
    title: "Sponsorship Opportunities",
    description: "Our platform offers exclusive sponsorship packages that provide maximum visibility and impact across our global business ecosystem.",
    gridItems: [
      {
        title: "Sponsorship Benefits",
        features: [
          "Featured on city and global business pages",
          "Limited sponsorship per month",
          "Targeted exposure to Muslim business community"
        ],
        icon: <Sparkles className="h-5 w-5 text-muslim-blue" />
      },
      {
        title: "Ultimate Sponsorship",
        features: [
          "Half-page premium placement",
          "Only 2 sponsors monthly per country",
          "Global visibility across all platforms"
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
        title: "Platinum & Ultimate Analytics",
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

  const verificationFeatures = {
    title: "Building Trust Through Verification",
    description: "Every provider in our network is verified for integrity by the people they provided services for. This builds trust and confidence in our marketplace.",
    gridItems: [
      {
        title: "Verification Process",
        features: [
          "Minimum of 3 customer verifications required",
          "Customers confirm service quality",
          "Transparent review system",
          "Public verification badge display"
        ],
        icon: <BadgeCheck className="h-5 w-5 text-muslim-teal" />
      },
      {
        title: "Verified Business Benefits",
        features: [
          "Increased trust and credibility",
          "Higher click-through rates",
          "Badge displayed prominently",
          "Priority in search results",
          "Featured in verified business section"
        ],
        highlight: true,
        icon: <BadgeCheck className="h-5 w-5 text-muslim-gold fill-amber-100" />
      }
    ]
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-6">
          <FlashingBanner 
            icon={<HeartHandshake className="h-4 w-4" />}
            message="We support our community! Listing charities and mosques is completely FREE. Events listings just request a small donation of $5 to support community initiatives."
            colorScheme="primary"
          />
        </div>
        
        <PackageHeader />
        <PackageGrid />
        
        <Separator className="my-16" />
        
        <PackageFeatureGrid 
          title={verificationFeatures.title}
          description={verificationFeatures.description}
          gridItems={verificationFeatures.gridItems}
        />
        
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
        
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-muslim-dark mb-6 text-center">Need a Custom Solution?</h2>
          <p className="text-gray-600 mb-10 text-center max-w-3xl mx-auto">
            If our standard packages don't meet your specific requirements, we'd be happy to create a 
            tailored solution for your business. Tell us what you need below.
          </p>
          <CustomPackageForm />
        </div>
        
        <ReviewsComparisonSection />
      </div>
    </Layout>
  );
};

export default PackagesPage;
