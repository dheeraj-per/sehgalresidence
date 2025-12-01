import { useState } from "react";
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CommentDialog } from "@/components/CommentDialog";

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

  return (
    <>
      <div className="relative">
        <div className="flex items-start gap-2">
          <div className="flex-1">{children}</div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setDialogOpen(true)}
            className="h-8 w-8 p-0 print:hidden group"
            aria-label="Add comment"
          >
            <MessageSquare className="h-4 w-4 text-muted-foreground group-hover:text-white transition-colors" />
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
