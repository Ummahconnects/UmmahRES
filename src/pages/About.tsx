
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { Heart, Users, Globe, Shield, Facebook, Instagram, Twitter, Youtube, Linkedin, Briefcase, Handshake, MapPin, Star } from "lucide-react";
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-muslim-blue text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Connecting the Ummah, One Need at a Time</h1>
            <p className="text-xl leading-relaxed mb-8">
              The bridge between struggle and solution—linking Muslims with halal, ethical, and believer-owned services.
            </p>
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
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

      {/* Why We Exist Section */}
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

      {/* Our Promise Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-muslim-dark mb-8">Our Promise</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-10">
              <div className="bg-muslim-light p-8 rounded-lg text-center">
                <div className="w-16 h-16 bg-muslim-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-muslim-teal" />
                </div>
                <p className="text-lg font-medium text-muslim-dark">
                  "If a Muslim offers it, we'll find them."
                </p>
              </div>
              
              <div className="bg-muslim-light p-8 rounded-lg text-center">
                <div className="w-16 h-16 bg-muslim-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="h-8 w-8 text-muslim-teal" />
                </div>
                <p className="text-lg font-medium text-muslim-dark">
                  "If they don't exist yet, we'll help build them."
                </p>
              </div>
            </div>
            
            <div className="mt-10">
              <h3 className="text-xl font-bold mb-6">Join Us</h3>
              <p className="text-gray-600 mb-8">
                Are you a Muslim business owner? Get listed and connect with the Ummah.
              </p>
              <Link to="/business-profile">
                <Button className="bg-muslim-teal hover:bg-muslim-teal/90" size="lg">
                  List Your Business
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-muslim-dark mb-4">Our Story</h2>
            <p className="text-gray-600">
              How Muslim Directory was born and our journey so far
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg mx-auto">
              <p>
                Muslim Directory was founded in 2023 by a group of Muslims who experienced firsthand the difficulty of finding halal restaurants, Muslim-owned businesses, and mosques when traveling or moving to new areas.
              </p>
              <p>
                We noticed that while there were some resources available, there wasn't a comprehensive, user-friendly platform dedicated to connecting the Muslim community with the services they need. We saw an opportunity to create something that would truly serve our community.
              </p>
              <p>
                Starting with just a few hundred listings in major cities, we've grown to include thousands of businesses and mosques across multiple countries. Our team has expanded from a small group of passionate founders to a diverse team of developers, content creators, and community managers all working together to serve the Muslim ummah.
              </p>
              <p>
                Today, Muslim Directory is accessed by thousands of Muslims daily, helping them find everything from halal restaurants and grocery stores to Islamic schools, healthcare providers, and professional services that align with their values.
              </p>
              <p>
                We continue to grow and improve our platform based on feedback from our community, always keeping our mission at the forefront: to connect Muslims with the resources they need to thrive in their daily lives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-muslim-dark mb-4">Connect With Us</h2>
            <p className="text-gray-600 mb-8">
              Follow us on social media to stay updated with the latest news, events, and additions to our directory
            </p>
            
            <div className="flex justify-center space-x-6">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-muslim-teal hover:text-muslim-blue transition-colors">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-muslim-teal/10 rounded-full flex items-center justify-center mb-2">
                    <Facebook className="h-6 w-6" />
                  </div>
                  <span className="text-sm">Facebook</span>
                </div>
              </a>
              
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-muslim-teal hover:text-muslim-blue transition-colors">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-muslim-teal/10 rounded-full flex items-center justify-center mb-2">
                    <Instagram className="h-6 w-6" />
                  </div>
                  <span className="text-sm">Instagram</span>
                </div>
              </a>
              
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muslim-teal hover:text-muslim-blue transition-colors">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-muslim-teal/10 rounded-full flex items-center justify-center mb-2">
                    <Twitter className="h-6 w-6" />
                  </div>
                  <span className="text-sm">Twitter</span>
                </div>
              </a>
              
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-muslim-teal hover:text-muslim-blue transition-colors">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-muslim-teal/10 rounded-full flex items-center justify-center mb-2">
                    <Youtube className="h-6 w-6" />
                  </div>
                  <span className="text-sm">YouTube</span>
                </div>
              </a>
              
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muslim-teal hover:text-muslim-blue transition-colors">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-muslim-teal/10 rounded-full flex items-center justify-center mb-2">
                    <Linkedin className="h-6 w-6" />
                  </div>
                  <span className="text-sm">LinkedIn</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-muslim-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-muslim-dark mb-6">Get in Touch</h2>
            <p className="text-gray-600 mb-8">
              Have questions, feedback, or want to partner with us? We'd love to hear from you!
            </p>
            <Link to="/help">
              <Button
                className="bg-muslim-teal hover:bg-muslim-teal/90"
                size="lg"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;
