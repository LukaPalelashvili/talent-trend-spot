-- Add UPDATE policy for conversations table - only participants can update their conversations
CREATE POLICY "Participants can update their conversations"
ON public.conversations
FOR UPDATE
USING (
  (participant_one IN (SELECT profiles.id FROM profiles WHERE profiles.user_id = auth.uid()))
  OR (participant_two IN (SELECT profiles.id FROM profiles WHERE profiles.user_id = auth.uid()))
);

-- Add DELETE policy for conversations table - only participants can delete their conversations
CREATE POLICY "Participants can delete their conversations"
ON public.conversations
FOR DELETE
USING (
  (participant_one IN (SELECT profiles.id FROM profiles WHERE profiles.user_id = auth.uid()))
  OR (participant_two IN (SELECT profiles.id FROM profiles WHERE profiles.user_id = auth.uid()))
);