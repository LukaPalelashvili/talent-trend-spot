import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/hooks/useAuth";

// Pages
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Onboarding from "./pages/Onboarding";
import NotFound from "./pages/NotFound";
import Feed from "./pages/Feed";

// Brand Pages
import BrandDashboard from "./pages/brand/BrandDashboard";
import Discover from "./pages/brand/Discover";
import SmartMatch from "./pages/brand/SmartMatch";
import BrandSettings from "./pages/brand/BrandSettings";

// Creator Pages
import CreatorDashboard from "./pages/creator/CreatorDashboard";
import SocialAccounts from "./pages/creator/SocialAccounts";
import CreatorSettings from "./pages/creator/CreatorSettings";

// Shared Pages
import Messages from "./pages/Messages";
import Community from "./pages/Community";
import ProfileView from "./pages/ProfileView";
import SavedProfiles from "./pages/SavedProfiles";

// Components
import ProtectedRoute from "./components/auth/ProtectedRoute";

const queryClient = new QueryClient();

// Redirect to feed after login
const DashboardRedirect = () => {
  const { profile, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }
  
  if (!profile) {
    return <Navigate to="/auth" replace />;
  }
  
  // Always redirect to the main feed
  return <Navigate to="/feed" replace />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/profile/:id" element={<ProfileView />} />
            
            {/* Dashboard Redirect */}
            <Route path="/dashboard" element={<DashboardRedirect />} />
            
            {/* Main Feed - accessible to all authenticated users */}
            <Route path="/feed" element={
              <ProtectedRoute>
                <Feed />
              </ProtectedRoute>
            } />
            
            {/* Brand Routes */}
            <Route path="/brand/dashboard" element={
              <ProtectedRoute requiredType="brand">
                <BrandDashboard />
              </ProtectedRoute>
            } />
            <Route path="/brand/discover" element={
              <ProtectedRoute requiredType="brand">
                <Discover />
              </ProtectedRoute>
            } />
            <Route path="/brand/smart-match" element={
              <ProtectedRoute requiredType="brand">
                <SmartMatch />
              </ProtectedRoute>
            } />
            <Route path="/brand/saved" element={
              <ProtectedRoute requiredType="brand">
                <SavedProfiles />
              </ProtectedRoute>
            } />
            <Route path="/brand/settings" element={
              <ProtectedRoute requiredType="brand">
                <BrandSettings />
              </ProtectedRoute>
            } />
            
            {/* Creator Routes */}
            <Route path="/creator/dashboard" element={
              <ProtectedRoute requiredType="creator">
                <CreatorDashboard />
              </ProtectedRoute>
            } />
            <Route path="/creator/accounts" element={
              <ProtectedRoute requiredType="creator">
                <SocialAccounts />
              </ProtectedRoute>
            } />
            <Route path="/creator/saved" element={
              <ProtectedRoute requiredType="creator">
                <SavedProfiles />
              </ProtectedRoute>
            } />
            <Route path="/creator/settings" element={
              <ProtectedRoute requiredType="creator">
                <CreatorSettings />
              </ProtectedRoute>
            } />
            
            {/* Shared Protected Routes */}
            <Route path="/messages" element={
              <ProtectedRoute>
                <Messages />
              </ProtectedRoute>
            } />
            <Route path="/community" element={
              <ProtectedRoute>
                <Community />
              </ProtectedRoute>
            } />
            
            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
