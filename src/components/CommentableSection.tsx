import { useState } from "react";
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface CommentableSectionProps {
  children: React.ReactNode;
  sectionId: string;
  sectionTitle: string;
  onCommentAdded?: () => void;
}

const CommentableSection = ({ 
  children, 
  sectionId, 
  sectionTitle,
  onCommentAdded 
}: CommentableSectionProps) => {
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [comment, setComment] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleAddComment = async () => {
    if (!comment.trim()) {
      toast({
        title: "Empty comment",
        description: "Please write a comment before saving.",
        variant: "destructive",
      });
      return;
    }

    const { error } = await supabase
      .from("quotation_comments")
      .insert({
        quotation_id: "sehgal-residence-2025",
        section: sectionTitle,
        comment: comment.trim(),
      });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to save comment. Please try again.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Comment added",
      description: "Your comment has been saved successfully.",
    });

    setComment("");
    setIsHighlighted(true);
    setIsOpen(false);
    onCommentAdded?.();
  };

  return (
    <div
      className={`relative transition-all duration-200 ${
        isHighlighted ? "bg-primary/5 border-l-4 border-primary pl-4 -ml-4" : ""
      }`}
    >
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="absolute -right-12 top-0 print:hidden"
          >
            <MessageSquare className="w-4 h-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="space-y-3">
            <h4 className="font-semibold text-sm">Add Comment</h4>
            <p className="text-xs text-muted-foreground">{sectionTitle}</p>
            <Textarea
              placeholder="Write your question or comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
            />
            <Button onClick={handleAddComment} className="w-full">
              Save Comment
            </Button>
          </div>
        </PopoverContent>
      </Popover>
      {children}
    </div>
  );
};

export default CommentableSection;
