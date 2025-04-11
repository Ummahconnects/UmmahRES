
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Mail, HelpCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muslim-blue text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold font-montserrat tracking-wide">UMMAH-<span className="text-muslim-gold">CONNECTS</span></h3>
            <p className="text-sm text-gray-300">
              Creating Barakat with every transaction, for supporting Muslims Services and Organisations by Muslims, for the Sake of Allah.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Mail size={20} />
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-gray-300 hover:text-white">Home</Link></li>
              <li><Link to="/businesses" className="text-gray-300 hover:text-white">Businesses</Link></li>
              <li><Link to="/mosques" className="text-gray-300 hover:text-white">Mosques</Link></li>
              <li><Link to="/community-events" className="text-gray-300 hover:text-white">Community Events</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white">About Us</Link></li>
              <li><Link to="/packages" className="text-gray-300 hover:text-white">Packages</Link></li>
              <li><Link to="/sales" className="text-gray-300 hover:text-white">Sponsorships</Link></li>
              <li><Link to="/affiliates" className="text-gray-300 hover:text-white">Affiliates & Influencers</Link></li>
              <li><Link to="/help" className="text-gray-300 hover:text-white">Help & Support</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/businesses?category=restaurants" className="text-gray-300 hover:text-white">Restaurants</Link></li>
              <li><Link to="/businesses?category=grocery" className="text-gray-300 hover:text-white">Grocery Stores</Link></li>
              <li><Link to="/businesses?category=healthcare" className="text-gray-300 hover:text-white">Healthcare</Link></li>
              <li><Link to="/businesses?category=trades" className="text-gray-300 hover:text-white">Professional Trades</Link></li>
              <li><Link to="/businesses?category=education" className="text-gray-300 hover:text-white">Education</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-300">Email: info@ummah-connects.com</li>
              <li className="text-gray-300">Phone: +1 (555) 123-4567</li>
              <li className="text-gray-300">Address: 123 Main St, City, Country</li>
              <li className="mt-4">
                <Link to="/help" className="inline-flex items-center text-muslim-gold hover:text-muslim-gold/80">
                  <HelpCircle className="h-4 w-4 mr-1" /> Need Help? Visit Support
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-sm text-gray-400 text-center">
          <p>&copy; {new Date().getFullYear()} Ummah-Connects. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
