
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const faqItems = [
  {
    question: "What benefits do I get with a membership?",
    answer: "Membership gives you enhanced visibility in search results, a verified business badge, access to business analytics, priority customer support, and the ability to connect with the wider Muslim community. Different tiers offer different levels of benefits."
  },
  {
    question: "How do I choose the right membership plan?",
    answer: "Basic plan is ideal for new or small businesses just starting out. Premium is perfect for growing businesses that need more visibility and features. Enterprise plan is designed for established businesses that want maximum exposure and premium features."
  },
  {
    question: "Can I upgrade or downgrade my plan later?",
    answer: "Yes, you can upgrade or downgrade your membership plan at any time. When upgrading, you'll have immediate access to new features. When downgrading, your current plan will remain active until the end of your billing cycle."
  },
  {
    question: "How does annual billing work?",
    answer: "Annual billing charges you once per year instead of monthly. You get a significant discount (usually 15-20%) compared to paying monthly. Your membership will be active for the entire 12-month period once payment is processed."
  },
  {
    question: "Is there a free trial available?",
    answer: "Currently, we don't offer a free trial, but we do have a 30-day money-back guarantee if you're not satisfied with your membership for any reason."
  },
  {
    question: "How do I cancel my membership?",
    answer: "You can cancel your membership at any time from your account dashboard. If you cancel, your membership will remain active until the end of your current billing period."
  }
];

const MembershipFAQ = () => {
  return (
    <div className="my-16">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-2">
          <HelpCircle className="h-8 w-8 text-muslim-teal" />
        </div>
        <h2 className="text-2xl font-bold text-muslim-dark mb-2">Frequently Asked Questions</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Find answers to the most common questions about our membership plans
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left font-medium">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default MembershipFAQ;
