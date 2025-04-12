
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ContactCTASection = () => {
  return (
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
  );
};

export default ContactCTASection;
