import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

interface SendWhatsAppButtonProps {
  className?: string;
}

const SendWhatsAppButton = ({ className }: SendWhatsAppButtonProps) => {
  const { toast } = useToast();

  const handleSend = async () => {
    const { data: comments, error } = await supabase
      .from("quotation_comments")
      .select("*")
      .eq("quotation_id", "sehgal-residence-2025")
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to load comments. Please try again.",
        variant: "destructive",
      });
      return;
    }

    if (!comments || comments.length === 0) {
      toast({
        title: "No comments",
        description: "Please add at least one comment before sending.",
        variant: "destructive",
      });
      return;
    }

    const message = encodeURIComponent(
      "Hey, I have a few questions on the quote..."
    );
    const phoneNumber = "31633461503";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <Button
      onClick={handleSend}
      size="lg"
      className={cn("gap-2", className)}
      aria-label="WhatsApp Questions"
    >
      <Send className="w-4 h-4" />
      <span className="hidden sm:inline">WhatsApp Questions</span>
      <span className="sr-only sm:hidden">WhatsApp Questions</span>
    </Button>
  );
};

export default SendWhatsAppButton;
