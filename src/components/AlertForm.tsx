
import { useState } from "react";
import { useAlert } from "@/hooks/useAlert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";

const AlertForm = () => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const { sendAlert, isLoading } = useAlert();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !message) return;
    
    try {
      await sendAlert(subject, message);
      setSubject("");
      setMessage("");
    } catch (error) {
      // Error is already handled in the hook
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-6 border rounded-md">
      <h2 className="text-xl font-bold">Send Alert</h2>
      
      <div className="space-y-2">
        <label htmlFor="subject" className="text-sm font-medium">
          Subject
        </label>
        <Input
          id="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Alert subject"
          required
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium">
          Message
        </label>
        <Textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Alert message"
          rows={5}
          required
        />
      </div>
      
      <Button type="submit" disabled={isLoading || !subject || !message} className="w-full">
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          "Send Alert"
        )}
      </Button>
    </form>
  );
};

export default AlertForm;
