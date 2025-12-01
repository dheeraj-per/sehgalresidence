import { useState, useEffect } from "react";
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CommentDialog } from "@/components/CommentDialog";
import { supabase } from "@/integrations/supabase/client";

interface CommentableSectionProps {
  children: React.ReactNode;
  sectionId: string;
  sectionTitle: string;
  quotationId?: string;
}

const CommentableSection = ({
  children,
  sectionId,
  sectionTitle,
  quotationId = "sehgal-residence-2025",
}: CommentableSectionProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [commentCount, setCommentCount] = useState(0);

  useEffect(() => {
    const fetchCommentCount = async () => {
      const { count } = await supabase
        .from("quotation_comments")
        .select("*", { count: "exact", head: true })
        .eq("quotation_id", quotationId)
        .eq("section", sectionId)
        .is("deleted_at", null);
      
      setCommentCount(count || 0);
    };

    fetchCommentCount();
  }, [quotationId, sectionId]);

  return (
    <>
      <div className="relative">
        <div className="flex items-start gap-2">
          <div className="flex-1">{children}</div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setDialogOpen(true)}
            className="h-8 w-8 p-0 print:hidden group relative"
            aria-label="Add comment"
          >
            <MessageSquare className="h-4 w-4 text-muted-foreground group-hover:text-white transition-colors" />
            {commentCount > 0 && (
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-destructive rounded-full flex items-center justify-center">
                <span className="sr-only">{commentCount} comments</span>
              </span>
            )}
          </Button>
        </div>
      </div>

      <CommentDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        sectionId={sectionId}
        sectionTitle={sectionTitle}
        quotationId={quotationId}
      />
    </>
  );
};

export default CommentableSection;
