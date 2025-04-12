
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";

interface SocialMediaLinksProps {
  displayStyle?: "buttons" | "icons";
  className?: string;
}

const SocialMediaLinks = ({ displayStyle = "buttons", className = "" }: SocialMediaLinksProps) => {
  return (
    <>
      {displayStyle === "buttons" ? (
        <div className={`flex flex-wrap items-center gap-4 ${className}`}>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-[#1877F2] text-white px-4 py-2 rounded-md hover:bg-[#1877F2]/90 transition-colors">
            <Facebook size={20} />
            <span>Facebook</span>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-[#1DA1F2] text-white px-4 py-2 rounded-md hover:bg-[#1DA1F2]/90 transition-colors">
            <Twitter size={20} />
            <span>Twitter</span>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCAF45] text-white px-4 py-2 rounded-md hover:opacity-90 transition-opacity">
            <Instagram size={20} />
            <span>Instagram</span>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-[#0A66C2] text-white px-4 py-2 rounded-md hover:bg-[#0A66C2]/90 transition-colors">
            <Linkedin size={20} />
            <span>LinkedIn</span>
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-[#FF0000] text-white px-4 py-2 rounded-md hover:bg-[#FF0000]/90 transition-colors">
            <Youtube size={20} />
            <span>YouTube</span>
          </a>
        </div>
      ) : (
        <div className={`flex justify-center space-x-6 ${className}`}>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-[#1877F2] hover:text-[#1877F2]/80">
            <Facebook size={28} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-[#1DA1F2] hover:text-[#1DA1F2]/80">
            <Twitter size={28} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-[#E4405F] hover:text-[#E4405F]/80">
            <Instagram size={28} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-[#0A66C2] hover:text-[#0A66C2]/80">
            <Linkedin size={28} />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-[#FF0000] hover:text-[#FF0000]/80">
            <Youtube size={28} />
          </a>
        </div>
      )}
    </>
  );
};

export default SocialMediaLinks;
