import { useState } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import { Building2, User, Mail, Lock, Eye, EyeOff, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { lovable } from "@/integrations/lovable";

type UserType = "brand" | "creator" | null;
type AuthMode = "select" | "login" | "signup";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const initialType = searchParams.get("type") as UserType;
  
  const [userType, setUserType] = useState<UserType>(initialType);
  const [mode, setMode] = useState<AuthMode>(initialType ? "signup" : "select");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { user, profile, signUp, signIn } = useAuth();
  const { toast } = useToast();

  // Redirect if already logged in
  if (user && profile) {
    return <Navigate to={profile.user_type === "brand" ? "/brand/dashboard" : "/creator/dashboard"} replace />;
  }

  const handleSelectType = (type: UserType) => {
    setUserType(type);
    setMode("signup");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (mode === "signup") {
        if (!userType) {
          toast({ title: "Please select account type", variant: "destructive" });
          return;
        }
        const { error } = await signUp(email, password, userType, fullName);
        if (error) throw error;
        toast({ title: "Account created successfully!", description: "Welcome to Nexly!" });
      } else {
        const { error } = await signIn(email, password);
        if (error) throw error;
        toast({ title: "Welcome back!" });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const result = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: window.location.origin,
      });
      if (result.error) {
        toast({ title: "Google sign-in failed", description: result.error.message, variant: "destructive" });
        setIsLoading(false);
        return;
      }
      if (result.redirected) return;
    } catch (error: any) {
      toast({ title: "Error", description: error.message || "Something went wrong", variant: "destructive" });
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    if (mode === "login") {
      setMode("select");
    } else if (mode === "signup") {
      setMode("select");
      setUserType(null);
    }
  };

  return (
    <div className="min-h-screen gradient-hero flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 gradient-primary p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        </div>
        
        <div className="relative z-10">
          <a href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <span className="text-white font-bold text-xl">N</span>
            </div>
            <span className="font-display font-bold text-2xl text-white">Nexly</span>
          </a>
        </div>

        <div className="relative z-10 text-white">
          <h1 className="font-display text-4xl xl:text-5xl font-bold mb-6">
            {userType === "brand" 
              ? "Find Your Perfect Creator Match"
              : userType === "creator"
              ? "Turn Your Influence Into Income"
              : "Connect. Collaborate. Grow."}
          </h1>
          <p className="text-white/80 text-lg xl:text-xl">
            {userType === "brand"
              ? "Access 50,000+ verified creators across TikTok, YouTube, Instagram and more."
              : userType === "creator"
              ? "Join thousands of creators who've found their dream brand partnerships."
              : "The leading marketplace connecting brands with authentic content creators."}
          </p>
        </div>

        <div className="relative z-10 flex gap-8 text-white/60 text-sm">
          <div>
            <div className="text-3xl font-display font-bold text-white">50K+</div>
            <div>Creators</div>
          </div>
          <div>
            <div className="text-3xl font-display font-bold text-white">10K+</div>
            <div>Brands</div>
          </div>
          <div>
            <div className="text-3xl font-display font-bold text-white">1M+</div>
            <div>Collaborations</div>
          </div>
        </div>
      </div>

      {/* Right Side - Auth Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center mb-8">
            <a href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                <span className="text-white font-bold text-xl">N</span>
              </div>
              <span className="font-display font-bold text-2xl">Nexly</span>
            </a>
          </div>

          {/* User Type Selection */}
          {mode === "select" && (
            <div className="animate-fade-in">
              <div className="text-center mb-8">
                <h2 className="font-display text-3xl font-bold mb-2">Join Nexly</h2>
                <p className="text-muted-foreground">Choose how you want to use Nexly</p>
              </div>

              <div className="grid gap-4 mb-8">
                <button
                  onClick={() => handleSelectType("brand")}
                  className="card-interactive p-6 text-left flex items-center gap-4 group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Building2 className="w-7 h-7 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display font-bold text-lg mb-1">I'm a Brand</h3>
                    <p className="text-sm text-muted-foreground">Find and collaborate with influencers</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </button>

                <button
                  onClick={() => handleSelectType("creator")}
                  className="card-interactive p-6 text-left flex items-center gap-4 group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <User className="w-7 h-7 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display font-bold text-lg mb-1">I'm a Creator</h3>
                    <p className="text-sm text-muted-foreground">Get discovered by top brands</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" />
                </button>
              </div>

              <div className="text-center">
                <p className="text-muted-foreground">
                  Already have an account?{" "}
                  <button
                    onClick={() => setMode("login")}
                    className="text-primary font-semibold hover:underline"
                  >
                    Log in
                  </button>
                </p>
              </div>
            </div>
          )}

          {/* Login / Signup Form */}
          {(mode === "login" || mode === "signup") && (
            <div className="animate-fade-in">
              <button
                onClick={handleBack}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>

              <div className="mb-8">
                <h2 className="font-display text-3xl font-bold mb-2">
                  {mode === "signup" ? "Create your account" : "Welcome back"}
                </h2>
                <p className="text-muted-foreground">
                  {mode === "signup" 
                    ? `Sign up as a ${userType === "brand" ? "Brand" : "Creator"}`
                    : "Log in to your Nexly account"}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === "signup" && (
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="fullName"
                        type="text"
                        placeholder="John Doe"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="pl-10 h-12"
                        required
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-12"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10 h-12"
                      required
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 btn-gradient text-lg"
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : mode === "signup" ? "Create Account" : "Log In"}
                </Button>
              </form>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full h-12"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </Button>
              <div className="mt-6 text-center">
                <p className="text-muted-foreground">
                  {mode === "signup" ? (
                    <>
                      Already have an account?{" "}
                      <button
                        onClick={() => setMode("login")}
                        className="text-primary font-semibold hover:underline"
                      >
                        Log in
                      </button>
                    </>
                  ) : (
                    <>
                      Don't have an account?{" "}
                      <button
                        onClick={() => setMode("select")}
                        className="text-primary font-semibold hover:underline"
                      >
                        Sign up
                      </button>
                    </>
                  )}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
