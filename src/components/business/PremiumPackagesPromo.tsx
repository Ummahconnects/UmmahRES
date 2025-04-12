
import { Button } from "@/components/ui/button";

const PremiumPackagesPromo = () => {
  return (
    <div className="mt-10 bg-gradient-to-r from-muslim-teal/10 to-muslim-blue/10 p-6 rounded-lg">
      <h3 className="text-xl font-bold text-muslim-dark mb-3">Premium Business Packages</h3>
      <p className="text-gray-700 mb-4">
        Upgrade your business listing with our premium packages and reach more customers!
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        <div className="bg-white p-4 rounded-md shadow-sm">
          <h4 className="font-semibold mb-2">Basic</h4>
          <p className="text-sm text-gray-600">Enhanced visibility and basic analytics</p>
          <p className="mt-2 font-medium">$9.99/month</p>
        </div>
        <div className="bg-white p-4 rounded-md shadow-sm border-2 border-muslim-gold">
          <h4 className="font-semibold mb-2">Premium</h4>
          <p className="text-sm text-gray-600">Featured listings, advanced analytics</p>
          <p className="mt-2 font-medium">$19.99/month</p>
        </div>
        <div className="bg-white p-4 rounded-md shadow-sm">
          <h4 className="font-semibold mb-2">Enterprise</h4>
          <p className="text-sm text-gray-600">Global sponsorship, full analytics suite</p>
          <p className="mt-2 font-medium">$49.99/month</p>
        </div>
      </div>
      <Button
        className="bg-muslim-teal hover:bg-muslim-teal/90"
        onClick={() => window.location.href = '/packages'}
      >
        View All Packages
      </Button>
    </div>
  );
};

export default PremiumPackagesPromo;
