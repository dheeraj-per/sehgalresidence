import { useEffect, useState, memo } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { supabase } from "@/integrations/supabase/client";
import { MessageSquare, Pencil, Trash2, Reply } from "lucide-react";
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

interface CommentItemProps {
  comment: Comment;
  isReply?: boolean;
  onEdit: (id: string, text: string, name: string) => void;
  onDelete: (id: string) => void;
  onStartReply: (id: string) => void;
  onStartEdit: (id: string, text: string, name: string) => void;
  isEditing: boolean;
  isReplying: boolean;
  editText: string;
  editName: string;
  replyText: string;
  replyName: string;
  onEditTextChange: (text: string) => void;
  onEditNameChange: (name: string) => void;
  onReplyTextChange: (text: string) => void;
  onReplyNameChange: (name: string) => void;
  onCancelEdit: () => void;
  onCancelReply: () => void;
  onSubmitReply: (parentId: string) => void;
  replies: Comment[];
}

interface CommentItemInternalProps extends CommentItemProps {
  getReplies: (parentId: string) => Comment[];
  editingId: string | null;
  replyingTo: string | null;
}

const CommentItem = memo(({
  comment,
  isReply = false,
  onEdit,
  onDelete,
  onStartReply,
  onStartEdit,
  isEditing,
  isReplying,
  editText,
  editName,
  replyText,
  replyName,
  onEditTextChange,
  onEditNameChange,
  onReplyTextChange,
  onReplyNameChange,
  onCancelEdit,
  onCancelReply,
  onSubmitReply,
  replies,
  getReplies,
  editingId,
  replyingTo,
}: CommentItemInternalProps) => {
  return (
    <div className={`space-y-2 ${isReply ? "ml-8 pl-4 border-l-2 border-border" : ""}`}>
      <div className="rounded-lg border border-border bg-card p-3">
        {isEditing ? (
          <div className="space-y-2">
            <Input
              value={editName}
              onChange={(e) => onEditNameChange(e.target.value)}
              placeholder="Name (optional)"
              className="text-sm"
            />
            <Textarea
              value={editText}
              onChange={(e) => onEditTextChange(e.target.value)}
              className="text-sm min-h-[60px]"
            />
            <div className="flex gap-2">
              <Button size="sm" onClick={() => onEdit(comment.id, editText, editName)}>
                Save
              </Button>
              <Button size="sm" variant="outline" onClick={onCancelEdit}>
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
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onStartReply(comment.id)}
                  className="h-7 w-7 p-0"
                >
                  <Reply className="h-3 w-3" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onStartEdit(comment.id, comment.comment, comment.name || "")}
                  className="h-7 w-7 p-0"
                >
                  <Pencil className="h-3 w-3" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onDelete(comment.id)}
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
            key={`reply-name-${comment.id}`}
            value={replyName}
            onChange={(e) => onReplyNameChange(e.target.value)}
            placeholder="Name (optional)"
            className="text-sm"
          />
          <Textarea
            key={`reply-text-${comment.id}`}
            value={replyText}
            onChange={(e) => onReplyTextChange(e.target.value)}
            placeholder="Write a reply..."
            className="text-sm min-h-[60px]"
            autoFocus
          />
          <div className="flex gap-2">
            <Button size="sm" onClick={() => onSubmitReply(comment.id)}>
              Reply
            </Button>
            <Button size="sm" variant="outline" onClick={onCancelReply}>
              Cancel
            </Button>
          </div>
        </div>
      )}

      {replies.map((reply) => {
        const nestedReplies = getReplies(reply.id);
        return (
          <CommentItem
            key={reply.id}
            comment={reply}
            isReply={true}
            onEdit={onEdit}
            onDelete={onDelete}
            onStartReply={onStartReply}
            onStartEdit={onStartEdit}
            isEditing={editingId === reply.id}
            isReplying={replyingTo === reply.id}
            editText={editText}
            editName={editName}
            replyText={replyText}
            replyName={replyName}
            onEditTextChange={onEditTextChange}
            onEditNameChange={onEditNameChange}
            onReplyTextChange={onReplyTextChange}
            onReplyNameChange={onReplyNameChange}
            onCancelEdit={onCancelEdit}
            onCancelReply={onCancelReply}
            onSubmitReply={onSubmitReply}
            replies={nestedReplies}
            getReplies={getReplies}
            editingId={editingId}
            replyingTo={replyingTo}
          />
        );
      })}
    </div>
  );
});

CommentItem.displayName = "CommentItem";

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

  const handleEdit = async (id: string, text: string, name: string) => {
    if (!text.trim()) return;

    const { error } = await supabase
      .from("quotation_comments")
      .update({ comment: text.trim(), name: name.trim() || null })
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-primary" />
            Comments: {sectionTitle}
          </DialogTitle>
          <DialogDescription>
            View and manage comments for this section
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-4">
            {topLevelComments.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                No comments yet. Be the first to comment!
              </p>
            ) : (
              topLevelComments.map((comment) => (
                <CommentItem
                  key={comment.id}
                  comment={comment}
                  isReply={false}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onStartReply={(id) => setReplyingTo(id)}
                  onStartEdit={(id, text, name) => {
                    setEditingId(id);
                    setEditText(text);
                    setEditName(name);
                  }}
                  isEditing={editingId === comment.id}
                  isReplying={replyingTo === comment.id}
                  editText={editText}
                  editName={editName}
                  replyText={replyText}
                  replyName={replyName}
                  onEditTextChange={setEditText}
                  onEditNameChange={setEditName}
                  onReplyTextChange={setReplyText}
                  onReplyNameChange={setReplyName}
                  onCancelEdit={() => {
                    setEditingId(null);
                    setEditText("");
                    setEditName("");
                  }}
                  onCancelReply={() => {
                    setReplyingTo(null);
                    setReplyText("");
                    setReplyName("");
                  }}
                  onSubmitReply={handleReply}
                  replies={getReplies(comment.id)}
                  getReplies={getReplies}
                  editingId={editingId}
                  replyingTo={replyingTo}
                />
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
