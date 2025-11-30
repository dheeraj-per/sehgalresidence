import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { supabase } from "@/integrations/supabase/client";
import { MessageSquare, Pencil, Trash2, Reply, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Comment {
  id: string;
  section: string;
  comment: string;
  name: string | null;
  created_at: string;
  updated_at: string;
  parent_id: string | null;
  deleted_at: string | null;
}

interface CommentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sectionId: string;
  sectionTitle: string;
  quotationId: string;
}

export const CommentDialog = ({
  open,
  onOpenChange,
  sectionId,
  sectionTitle,
  quotationId,
}: CommentDialogProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [newName, setNewName] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [editName, setEditName] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [replyName, setReplyName] = useState("");
  const { toast } = useToast();

  const fetchComments = async () => {
    const { data, error } = await supabase
      .from("quotation_comments")
      .select("*")
      .eq("quotation_id", quotationId)
      .eq("section", sectionId)
      .is("deleted_at", null)
      .order("created_at", { ascending: true });

    if (!error && data) {
      setComments(data);
    }
  };

  useEffect(() => {
    if (open) {
      fetchComments();
    }
  }, [open, quotationId, sectionId]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    const { error } = await supabase.from("quotation_comments").insert({
      quotation_id: quotationId,
      section: sectionId,
      comment: newComment.trim(),
      name: newName.trim() || null,
    });

    if (error) {
      toast({ title: "Error", description: "Failed to add comment", variant: "destructive" });
    } else {
      setNewComment("");
      setNewName("");
      fetchComments();
      toast({ title: "Success", description: "Comment added" });
    }
  };

  const handleEdit = async (id: string) => {
    if (!editText.trim()) return;

    const { error } = await supabase
      .from("quotation_comments")
      .update({ comment: editText.trim(), name: editName.trim() || null })
      .eq("id", id);

    if (error) {
      toast({ title: "Error", description: "Failed to update comment", variant: "destructive" });
    } else {
      setEditingId(null);
      setEditText("");
      setEditName("");
      fetchComments();
      toast({ title: "Success", description: "Comment updated" });
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from("quotation_comments")
      .update({ deleted_at: new Date().toISOString() })
      .eq("id", id);

    if (error) {
      toast({ title: "Error", description: "Failed to delete comment", variant: "destructive" });
    } else {
      fetchComments();
      toast({ title: "Success", description: "Comment deleted" });
    }
  };

  const handleReply = async (parentId: string) => {
    if (!replyText.trim()) return;

    const { error } = await supabase.from("quotation_comments").insert({
      quotation_id: quotationId,
      section: sectionId,
      comment: replyText.trim(),
      name: replyName.trim() || null,
      parent_id: parentId,
    });

    if (error) {
      toast({ title: "Error", description: "Failed to add reply", variant: "destructive" });
    } else {
      setReplyingTo(null);
      setReplyText("");
      setReplyName("");
      fetchComments();
      toast({ title: "Success", description: "Reply added" });
    }
  };

  const getReplies = (parentId: string) => {
    return comments.filter((c) => c.parent_id === parentId);
  };

  const topLevelComments = comments.filter((c) => !c.parent_id);

  const CommentItem = ({ comment, isReply = false }: { comment: Comment; isReply?: boolean }) => {
    const isEditing = editingId === comment.id;
    const isReplying = replyingTo === comment.id;
    const replies = getReplies(comment.id);

    return (
      <div className={`space-y-2 ${isReply ? "ml-8 pl-4 border-l-2 border-border" : ""}`}>
        <div className="rounded-lg border border-border bg-card p-3">
          {isEditing ? (
            <div className="space-y-2">
              <Input
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                placeholder="Name (optional)"
                className="text-sm"
              />
              <Textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="text-sm min-h-[60px]"
              />
              <div className="flex gap-2">
                <Button size="sm" onClick={() => handleEdit(comment.id)}>
                  Save
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setEditingId(null);
                    setEditText("");
                    setEditName("");
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-foreground">
                      {comment.name || "Anonymous"}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(comment.created_at).toLocaleString()}
                      {comment.updated_at !== comment.created_at && " (edited)"}
                    </span>
                  </div>
                  <p className="text-sm text-foreground">{comment.comment}</p>
                </div>
                <div className="flex gap-1">
                  {!isReply && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setReplyingTo(comment.id)}
                      className="h-7 w-7 p-0"
                    >
                      <Reply className="h-3 w-3" />
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      setEditingId(comment.id);
                      setEditText(comment.comment);
                      setEditName(comment.name || "");
                    }}
                    className="h-7 w-7 p-0"
                  >
                    <Pencil className="h-3 w-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDelete(comment.id)}
                    className="h-7 w-7 p-0 text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>

        {isReplying && (
          <div className="ml-8 space-y-2 border-l-2 border-border pl-4">
            <Input
              value={replyName}
              onChange={(e) => setReplyName(e.target.value)}
              placeholder="Name (optional)"
              className="text-sm"
            />
            <Textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Write a reply..."
              className="text-sm min-h-[60px]"
            />
            <div className="flex gap-2">
              <Button size="sm" onClick={() => handleReply(comment.id)}>
                Reply
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setReplyingTo(null);
                  setReplyText("");
                  setReplyName("");
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        {replies.map((reply) => (
          <CommentItem key={reply.id} comment={reply} isReply={true} />
        ))}
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-primary" />
            Comments: {sectionTitle}
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-4">
            {topLevelComments.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                No comments yet. Be the first to comment!
              </p>
            ) : (
              topLevelComments.map((comment) => (
                <CommentItem key={comment.id} comment={comment} />
              ))
            )}
          </div>
        </ScrollArea>

        <div className="border-t border-border pt-4 space-y-2">
          <Input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Your name (optional)"
            className="text-sm"
          />
          <Textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="text-sm min-h-[80px]"
          />
          <Button onClick={handleAddComment} className="w-full">
            Add Comment
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
