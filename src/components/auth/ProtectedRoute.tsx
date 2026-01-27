import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredType?: "brand" | "creator";
}

const ProtectedRoute = ({ children, requiredType }: ProtectedRouteProps) => {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  // Check if onboarding is complete
  const isBrand = profile.user_type === "brand";
  const onboardingComplete = isBrand ? !!profile.industry : !!profile.niche;

  if (!onboardingComplete) {
    return <Navigate to="/onboarding" replace />;
  }

  // Check user type if required
  if (requiredType && profile.user_type !== requiredType) {
    return <Navigate to={profile.user_type === "brand" ? "/brand/dashboard" : "/creator/dashboard"} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
