-- Add columns to support comment replies, names, and edit tracking
ALTER TABLE quotation_comments
ADD COLUMN IF NOT EXISTS name text,
ADD COLUMN IF NOT EXISTS parent_id uuid REFERENCES quotation_comments(id) ON DELETE CASCADE,
ADD COLUMN IF NOT EXISTS updated_at timestamp with time zone DEFAULT now(),
ADD COLUMN IF NOT EXISTS deleted_at timestamp with time zone;

-- Update existing comments to have updated_at
UPDATE quotation_comments SET updated_at = created_at WHERE updated_at IS NULL;

-- Create index for faster parent_id lookups
CREATE INDEX IF NOT EXISTS idx_quotation_comments_parent_id ON quotation_comments(parent_id);

-- Create index for faster quotation_id + section lookups
CREATE INDEX IF NOT EXISTS idx_quotation_comments_quotation_section ON quotation_comments(quotation_id, section);

-- Add RLS policies for UPDATE and DELETE operations
CREATE POLICY "Anyone can update comments"
ON quotation_comments FOR UPDATE
USING (true)
WITH CHECK (true);

CREATE POLICY "Anyone can delete comments"
ON quotation_comments FOR DELETE
USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_quotation_comments_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
DROP TRIGGER IF EXISTS update_quotation_comments_updated_at_trigger ON quotation_comments;
CREATE TRIGGER update_quotation_comments_updated_at_trigger
BEFORE UPDATE ON quotation_comments
FOR EACH ROW
EXECUTE FUNCTION update_quotation_comments_updated_at();