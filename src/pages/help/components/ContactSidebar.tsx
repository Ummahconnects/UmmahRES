
import { Card } from "@/components/ui/card";

const ContactSidebar = () => {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-500">Email</h3>
          <p className="text-muslim-teal">support@ummah-connects.com</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">Phone</h3>
          <p>+1 (555) 123-4567</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">Hours</h3>
          <p>Monday to Friday: 9AM - 5PM</p>
          <p>Saturday: 10AM - 2PM</p>
          <p>Sunday: Closed</p>
        </div>
      </div>
    </Card>
  );
};

export default ContactSidebar;
