
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Checkbox } from "@/components/ui/checkbox";

export default function EmailTest() {
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [testFail, setTestFail] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipient || !subject || !message) {
      toast({
        title: "Missing fields",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke("send-email", {
        body: { to: recipient, subject, message, testFail }
      });
      
      if (error) throw error;
      
      toast({
        title: "Email sent successfully",
        description: `Email sent to ${recipient}`,
      });
      
      // Clear form
      setRecipient("");
      setSubject("");
      setMessage("");
      setTestFail(false);
    } catch (error: any) {
      console.error("Email sending error:", error);
      
      // Display a specific message if it's the simulated failure
      const errorMessage = error.message?.includes("Simulated failure") 
        ? "Test failure was triggered as requested" 
        : error.message || "An unknown error occurred";
        
      toast({
        title: "Error sending email",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Email Test</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="recipient">Recipient Email</Label>
          <Input
            id="recipient"
            type="email"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="recipient@example.com"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="subject">Subject</Label>
          <Input
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Email subject"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Your message here..."
            rows={5}
            required
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="test-fail" 
            checked={testFail}
            onCheckedChange={(checked) => setTestFail(checked === true)}
          />
          <Label htmlFor="test-fail" className="text-sm text-gray-600">
            Simulate failure (for testing)
          </Label>
        </div>
        
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            "Send Email"
          )}
        </Button>
      </form>
    </div>
  );
}
