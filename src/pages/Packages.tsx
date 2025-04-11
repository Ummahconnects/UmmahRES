
import Layout from "@/components/Layout";
import { Separator } from "@/components/ui/separator";
import PackageHeader from "@/components/packages/PackageHeader";
import PackageGrid from "@/components/packages/PackageGrid";
import PackageFeatureGrid from "@/components/packages/PackageFeatureGrid";
import ReviewsComparisonSection from "@/components/packages/ReviewsComparisonSection";

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
        ]
      },
      {
        title: "Supreme Sponsor Benefits",
        features: [
          "Half-page premium placement",
          "Only 2 major sponsors featured monthly",
          "Global visibility across all city pages"
        ]
      }
    ]
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <PackageHeader />
        <PackageGrid />
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
