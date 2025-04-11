
import { useState, useRef, useEffect } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Bot, User, Paperclip } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ChatMessage {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const HelpPage = () => {
  const [activeTab, setActiveTab] = useState("live-chat");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      content: "Assalamu alaikum! Welcome to Ummah-Connects Support. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return;

    const newUserMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponses = [
        "Jazak'Allah khair for your question. Let me help you with that.",
        "Thank you for reaching out to Ummah-Connects support. I'm here to assist you.",
        "I understand your concern. Here's how we can address this issue.",
        "That's a great question! Let me provide you with some information.",
        "I'll look into this matter for you right away.",
      ];

      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];

      const newBotMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        content: randomResponse,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, newBotMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-muslim-dark mb-4">Help & Support</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our team is here to assist you with any questions or issues you may have with Ummah-Connects.
            Use our live chat for immediate assistance or browse through our knowledge base.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
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
          </div>

          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full mb-4 grid grid-cols-2">
                <TabsTrigger value="live-chat">Live Chat Support</TabsTrigger>
                <TabsTrigger value="faq">FAQs & Knowledge Base</TabsTrigger>
              </TabsList>
              
              <TabsContent value="live-chat" className="border rounded-lg h-[500px] flex flex-col">
                <div className="bg-muslim-teal/10 p-4 rounded-t-lg">
                  <h3 className="font-medium flex items-center">
                    <Bot className="h-5 w-5 mr-2 text-muslim-teal" />
                    AI Support Assistant
                  </h3>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.sender === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.sender === "user"
                            ? "bg-muslim-teal text-white"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        <div className="flex items-center mb-1">
                          {message.sender === "bot" ? (
                            <Bot className="h-4 w-4 mr-1" />
                          ) : (
                            <User className="h-4 w-4 mr-1" />
                          )}
                          <span className="text-xs opacity-70">
                            {message.sender === "bot" ? "AI Assistant" : "You"}
                          </span>
                        </div>
                        <p>{message.content}</p>
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 text-gray-800 p-3 rounded-lg">
                        <div className="flex items-center">
                          <Bot className="h-4 w-4 mr-1" />
                          <span className="text-xs opacity-70">AI Assistant</span>
                        </div>
                        <div className="flex space-x-1 mt-2">
                          <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                          <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
                
                <div className="p-4 border-t">
                  <div className="flex space-x-2">
                    <Button variant="outline" size="icon">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Input
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleSendMessage();
                      }}
                      placeholder="Type your message here..."
                      className="flex-1"
                    />
                    <Button onClick={handleSendMessage} className="bg-muslim-teal hover:bg-muslim-teal/90">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="faq" className="border rounded-lg p-6 h-[500px] overflow-y-auto">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-muslim-dark mb-2">
                      What is Ummah-Connects?
                    </h3>
                    <p className="text-gray-600">
                      Ummah-Connects is a platform designed to connect Muslims with Muslim-owned businesses, 
                      mosques, and community events worldwide. Our mission is to strengthen the global Muslim 
                      community by promoting and supporting Muslim businesses and services.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-muslim-dark mb-2">
                      How can I list my business on Ummah-Connects?
                    </h3>
                    <p className="text-gray-600">
                      To list your business, register an account on our platform and select the "Add Business" 
                      option from your dashboard. Fill in the required information about your business, 
                      upload photos, and select the appropriate category. After review, your business will 
                      be live on our platform.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-muslim-dark mb-2">
                      Is Ummah-Connects free to use?
                    </h3>
                    <p className="text-gray-600">
                      Basic use of Ummah-Connects is free for users searching for businesses and services. 
                      Business owners can create a basic listing for free, with premium features and 
                      enhanced visibility available through our subscription packages.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-muslim-dark mb-2">
                      How can I promote my business on Ummah-Connects?
                    </h3>
                    <p className="text-gray-600">
                      We offer various promotional packages to increase your business visibility on our platform. 
                      These include featured listings, banner ads, and sponsorship opportunities. Visit our 
                      "Sponsorships" page to learn more about our promotional options.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-muslim-dark mb-2">
                      Can I post community events on Ummah-Connects?
                    </h3>
                    <p className="text-gray-600">
                      Yes! We encourage posting community events on our platform. There is a small fee/donation 
                      for posting events as part of our community engagement initiative. This helps us maintain 
                      the platform and ensure quality content.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HelpPage;
