
import { Users, Star, Shield } from "lucide-react";

const WhyWeExistSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold text-muslim-dark mb-4">Why We Exist</h2>
          <p className="text-gray-600">
            Born from a moment of helplessness
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg mx-auto">
            <p className="italic text-center text-gray-600 mb-8">
              "I still remember the brother—stranded, in need of a specific service, desperate to find someone who wouldn't compromise his deen. Hours of searching. Dead ends. 'They're out there,' I thought, 'but where?'"
            </p>
            
            <p>
              That day revealed a painful truth: The Ummah has everything we need to thrive, but we're disconnected. Meanwhile, brilliant Muslim entrepreneurs struggle to find clients who value their faith-driven work.
            </p>
            
            <div className="my-8 bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-muslim-blue">We exist to:</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="mr-4 mt-1 bg-muslim-teal/10 p-1 rounded-full">
                    <Users className="h-5 w-5 text-muslim-teal" />
                  </div>
                  <div>
                    <span className="font-semibold">Break the Isolation:</span> No Muslim should ever say, "I couldn't find a believer to help."
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mr-4 mt-1 bg-muslim-teal/10 p-1 rounded-full">
                    <Star className="h-5 w-5 text-muslim-teal" />
                  </div>
                  <div>
                    <span className="font-semibold">Amplify Hidden Heroes:</span> From Muslim funeral directors to mental health therapists—we spotlight services you didn't know existed.
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mr-4 mt-1 bg-muslim-teal/10 p-1 rounded-full">
                    <Shield className="h-5 w-5 text-muslim-teal" />
                  </div>
                  <div>
                    <span className="font-semibold">Build Trust First:</span> Every provider in our network is vetted for integrity (not just skill).
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyWeExistSection;
