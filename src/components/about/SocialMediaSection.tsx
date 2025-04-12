
import { Facebook, Instagram, Twitter, Youtube, Linkedin } from "lucide-react";

const SocialMediaSection = () => {
  return (
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
  );
};

export default SocialMediaSection;
