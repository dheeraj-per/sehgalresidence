import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/integrations/supabase/client";
import { MessageSquare } from "lucide-react";

interface Comment {
  id: string;
  section: string;
  comment: string;
  created_at: string;
}

interface CommentsPanelProps {
  refreshTrigger?: number;
}

const CommentsPanel = ({ refreshTrigger }: CommentsPanelProps) => {
  const [comments, setComments] = useState<Comment[]>([]);

  const fetchComments = async () => {
    const { data, error } = await supabase
      .from("quotation_comments")
      .select("*")
      .eq("quotation_id", "sehgal-residence-2025")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setComments(data);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [refreshTrigger]);

  if (comments.length === 0) {
    return null;
  }

  return (
    <Card className="p-6 print:block">
      <div className="flex items-center gap-2 mb-4">
        <MessageSquare className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">
          Client Comments ({comments.length})
        </h3>
      </div>
      <ScrollArea className="h-[300px]">
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id}>
              <div className="space-y-2">
                <div className="text-sm font-semibold text-primary">
                  {comment.section}
                </div>
                <p className="text-sm text-muted-foreground">{comment.comment}</p>
                <div className="text-xs text-muted-foreground">
                  {new Date(comment.created_at).toLocaleString()}
                </div>
              </div>
              <Separator className="my-3" />
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};

export default CommentsPanel;
