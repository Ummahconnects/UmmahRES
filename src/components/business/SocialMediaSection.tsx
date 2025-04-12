
import SocialMediaLinks from "./SocialMediaLinks";

interface SocialMediaSectionProps {
  variant: "desktop" | "mobile";
}

const SocialMediaSection = ({ variant }: SocialMediaSectionProps) => {
  if (variant === "desktop") {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm mb-6 w-full">
        <h3 className="text-lg font-semibold text-muslim-dark mb-4">Follow Us on Social Media</h3>
        <p className="text-gray-600 mb-4">Stay connected with the latest business updates and community news</p>
        <SocialMediaLinks displayStyle="buttons" />
      </div>
    );
  } else {
    return (
      <div className="mt-6 bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-muslim-dark mb-4">Connect With Us</h3>
        <SocialMediaLinks displayStyle="icons" />
      </div>
    );
  }
};

export default SocialMediaSection;
