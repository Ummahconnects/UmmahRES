
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { Heart, Users, Globe, Shield, Facebook, Instagram, Twitter, Youtube, Linkedin } from "lucide-react";

const AboutPage = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-muslim-blue text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Muslim Directory</h1>
            <p className="text-xl leading-relaxed mb-8">
              Connecting the Muslim community with halal businesses, mosques, and services worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-muslim-dark mb-6">Our Mission</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                At Muslim Directory, our mission is to strengthen the global Muslim community by creating a comprehensive platform that connects Muslims with the resources, businesses, and services they need.
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                We believe in supporting Muslim-owned businesses and making it easier for Muslims worldwide to find halal options for food, services, education, healthcare, and more. By creating this network, we aim to foster economic growth within our community and make daily life more convenient for Muslims everywhere.
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
                    <Globe className="h-8 w-8 text-muslim-teal" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Global</h3>
                  <p className="text-sm text-gray-600">
                    Connecting Muslims across countries and continents
                  </p>
                </div>
                <div className="text-center p-4">
                  <div className="w-16 h-16 bg-muslim-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-muslim-teal" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Trust</h3>
                  <p className="text-sm text-gray-600">
                    Providing verified and reliable information
                  </p>
                </div>
              </div>
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

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-muslim-dark mb-4">Meet Our Team</h2>
            <p className="text-gray-600">
              The dedicated people behind Muslim Directory
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-muslim-teal to-muslim-blue opacity-10"></div>
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80"
                  alt="Team Member"
                  className="rounded-full w-full h-full object-cover"
                />
              </div>
              <h3 className="font-semibold text-lg">Sarah Ahmed</h3>
              <p className="text-gray-500">Founder & CEO</p>
            </div>
            <div className="text-center">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-muslim-teal to-muslim-blue opacity-10"></div>
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80"
                  alt="Team Member"
                  className="rounded-full w-full h-full object-cover"
                />
              </div>
              <h3 className="font-semibold text-lg">Mohammed Ali</h3>
              <p className="text-gray-500">CTO</p>
            </div>
            <div className="text-center">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-muslim-teal to-muslim-blue opacity-10"></div>
                <img
                  src="https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80"
                  alt="Team Member"
                  className="rounded-full w-full h-full object-cover"
                />
              </div>
              <h3 className="font-semibold text-lg">Yusuf Khan</h3>
              <p className="text-gray-500">Head of Partnerships</p>
            </div>
            <div className="text-center">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-muslim-teal to-muslim-blue opacity-10"></div>
                <img
                  src="https://images.unsplash.com/photo-1579626349272-a48c9a4388a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80"
                  alt="Team Member"
                  className="rounded-full w-full h-full object-cover"
                />
              </div>
              <h3 className="font-semibold text-lg">Fatima Rahman</h3>
              <p className="text-gray-500">Community Manager</p>
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
            <Button
              className="bg-muslim-teal hover:bg-muslim-teal/90"
              size="lg"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;
