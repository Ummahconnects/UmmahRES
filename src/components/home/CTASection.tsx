
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-16 islamic-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-muslim-dark mb-4">
              Are you a Muslim Business Owner?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              List your business or mosque in our directory to connect with the Muslim community and increase your visibility.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                className="bg-muslim-teal hover:bg-muslim-teal/90"
                size="lg"
              >
                List Your Business
              </Button>
              <Button 
                variant="outline"
                size="lg"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
