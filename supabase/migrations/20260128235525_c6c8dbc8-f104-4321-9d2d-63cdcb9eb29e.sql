-- Create a public view that excludes sensitive fields (email)
CREATE VIEW public.profiles_public
WITH (security_invoker=on) AS
SELECT 
  id,
  user_id,
  user_type,
  full_name,
  avatar_url,
  bio,
  company_name,
  industry,
  website,
  niche,
  location,
  languages,
  primary_platform,
  total_followers,
  avg_engagement_rate,
  brand_account_type,
  created_at,
  updated_at
FROM public.profiles;

-- Drop the existing public SELECT policy
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;

-- Create a new policy that only allows users to see their OWN full profile (including email)
CREATE POLICY "Users can view their own full profile"
ON public.profiles
FOR SELECT
USING (auth.uid() = user_id);

-- Grant SELECT on the public view to authenticated and anon users
GRANT SELECT ON public.profiles_public TO authenticated;
GRANT SELECT ON public.profiles_public TO anon;