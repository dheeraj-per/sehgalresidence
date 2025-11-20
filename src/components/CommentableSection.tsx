interface CommentableSectionProps {
  children: React.ReactNode;
  sectionId: string;
  sectionTitle: string;
  onCommentAdded?: () => void;
}

const CommentableSection = ({ children }: CommentableSectionProps) => {
  return <div>{children}</div>;
};

export default CommentableSection;
