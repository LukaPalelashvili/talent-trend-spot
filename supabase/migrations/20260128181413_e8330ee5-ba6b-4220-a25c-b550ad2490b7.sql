-- Add server-side validation constraints to prevent data integrity issues

-- Posts: content must be between 1-5000 characters
ALTER TABLE public.posts 
ADD CONSTRAINT posts_content_not_empty CHECK (char_length(content) > 0),
ADD CONSTRAINT posts_content_max_length CHECK (char_length(content) <= 5000);

-- Comments: content must be between 1-1000 characters  
ALTER TABLE public.comments
ADD CONSTRAINT comments_content_not_empty CHECK (char_length(content) > 0),
ADD CONSTRAINT comments_content_max_length CHECK (char_length(content) <= 1000);

-- Messages: content must be between 1-2000 characters
ALTER TABLE public.messages
ADD CONSTRAINT messages_content_not_empty CHECK (char_length(content) > 0),
ADD CONSTRAINT messages_content_max_length CHECK (char_length(content) <= 2000);

-- Social accounts: validate numeric ranges and username length
ALTER TABLE public.social_accounts
ADD CONSTRAINT social_accounts_username_max_length CHECK (char_length(username) <= 100),
ADD CONSTRAINT social_accounts_followers_positive CHECK (followers IS NULL OR followers >= 0),
ADD CONSTRAINT social_accounts_views_positive CHECK (total_views IS NULL OR total_views >= 0),
ADD CONSTRAINT social_accounts_engagement_valid CHECK (engagement_rate IS NULL OR (engagement_rate >= 0 AND engagement_rate <= 100));

-- Profiles: validate field lengths for user-editable content
ALTER TABLE public.profiles
ADD CONSTRAINT profiles_full_name_max_length CHECK (full_name IS NULL OR char_length(full_name) <= 100),
ADD CONSTRAINT profiles_bio_max_length CHECK (bio IS NULL OR char_length(bio) <= 1000),
ADD CONSTRAINT profiles_company_name_max_length CHECK (company_name IS NULL OR char_length(company_name) <= 200),
ADD CONSTRAINT profiles_niche_max_length CHECK (niche IS NULL OR char_length(niche) <= 100),
ADD CONSTRAINT profiles_location_max_length CHECK (location IS NULL OR char_length(location) <= 100),
ADD CONSTRAINT profiles_website_max_length CHECK (website IS NULL OR char_length(website) <= 500),
ADD CONSTRAINT profiles_industry_max_length CHECK (industry IS NULL OR char_length(industry) <= 100);