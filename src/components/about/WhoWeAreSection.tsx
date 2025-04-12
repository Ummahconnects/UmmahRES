
import { Users, Heart, Briefcase, Handshake } from "lucide-react";

const WhoWeAreSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-muslim-dark mb-6">Who We Are</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              We are the bridge between struggle and solution—a trusted network linking Muslims in need with halal, ethical, and believer-owned services. Whether it's finding a Muslim financial advisor for a widow, a halal-certified mechanic for a traveler, or a brother-owned construction company after a disaster, we make the impossible search simple.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Our goal is to be the most trusted and comprehensive resource for Muslims looking to connect with businesses and services that align with their values and needs.
            </p>
          </div>
          <div className="bg-muslim-light p-8 rounded-lg">
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-4">
                <div className="w-16 h-16 bg-muslim-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-muslim-teal" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Community</h3>
                <p className="text-sm text-gray-600">
                  Building a stronger, more connected Muslim ummah worldwide
                </p>
              </div>
              <div className="text-center p-4">
                <div className="w-16 h-16 bg-muslim-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-muslim-teal" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Support</h3>
                <p className="text-sm text-gray-600">
                  Supporting Muslim-owned businesses and community services
                </p>
              </div>
              <div className="text-center p-4">
                <div className="w-16 h-16 bg-muslim-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="h-8 w-8 text-muslim-teal" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Faith-Driven</h3>
                <p className="text-sm text-gray-600">
                  Promoting businesses that don't compromise on deen
                </p>
              </div>
              <div className="text-center p-4">
                <div className="w-16 h-16 bg-muslim-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Handshake className="h-8 w-8 text-muslim-teal" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Trust</h3>
                <p className="text-sm text-gray-600">
                  Providing vetted and reliable services
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAreSection;
