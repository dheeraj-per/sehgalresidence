-- Create comments table for client annotations
CREATE TABLE public.quotation_comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  quotation_id TEXT NOT NULL,
  section TEXT NOT NULL,
  comment TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.quotation_comments ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert comments (public quotation)
CREATE POLICY "Anyone can insert comments"
ON public.quotation_comments
FOR INSERT
WITH CHECK (true);

-- Allow anyone to view comments
CREATE POLICY "Anyone can view comments"
ON public.quotation_comments
FOR SELECT
USING (true);