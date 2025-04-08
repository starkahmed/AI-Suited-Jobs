
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/toast";
import { Github, Linkedin, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Auth = () => {
  const { type } = useParams<{ type: string }>();
  const isLogin = type === "login";
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    remember: false,
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      toast({
        title: isLogin ? "Logged in successfully" : "Account created successfully",
        description: isLogin 
          ? "Welcome back to JobRight!" 
          : "Your account has been created. Welcome to JobRight!",
      });
      
      navigate("/dashboard");
    }, 1500);
  };

  const handleSocialAuth = (provider: string) => {
    setIsLoading(true);
    
    // Simulate API call for social auth
    setTimeout(() => {
      setIsLoading(false);
      
      toast({
        title: `${provider} authentication successful`,
        description: "You are now logged in with " + provider,
      });
      
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 pt-24 pb-12 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">
            {isLogin ? "Welcome Back" : "Create Your Account"}
          </h1>
          <p className="text-gray-600">
            {isLogin
              ? "Sign in to find matching jobs and track your applications"
              : "Join thousands of job seekers using AI-powered job matching"}
          </p>
        </div>

        <Card className="p-6">
          <div className="space-y-4 mb-6">
            <Button 
              variant="outline" 
              className="w-full" 
              type="button"
              onClick={() => handleSocialAuth("Google")}
              disabled={isLoading}
            >
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full" 
              type="button"
              onClick={() => handleSocialAuth("LinkedIn")}
              disabled={isLoading}
            >
              <Linkedin className="mr-2 h-4 w-4 text-[#0A66C2]" />
              Continue with LinkedIn
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full" 
              type="button"
              onClick={() => handleSocialAuth("GitHub")}
              disabled={isLoading}
            >
              <Github className="mr-2 h-4 w-4" />
              Continue with GitHub
            </Button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with email</span>
            </div>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="space-y-1">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required={!isLogin}
                />
              </div>
            )}

            <div className="space-y-1">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between">
                <Label htmlFor="password">Password</Label>
                {isLogin && (
                  <Link to="/forgot-password" className="text-sm text-jobright-blue hover:underline">
                    Forgot password?
                  </Link>
                )}
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder={isLogin ? "Enter your password" : "Create a secure password"}
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {isLogin && (
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="remember" 
                  name="remember"
                  checked={formData.remember}
                  onCheckedChange={(checked) => 
                    setFormData({...formData, remember: checked === true})
                  }
                />
                <Label htmlFor="remember" className="text-sm cursor-pointer">
                  Remember me for 30 days
                </Label>
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full bg-jobright-blue"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {isLogin ? "Signing in..." : "Creating account..."}
                </>
              ) : (
                isLogin ? "Sign In" : "Create Account"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <p className="text-gray-600">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <Link
                to={isLogin ? "/signup" : "/login"}
                className="text-jobright-blue font-medium hover:underline"
              >
                {isLogin ? "Sign up" : "Sign in"}
              </Link>
            </p>
          </div>

          <div className="mt-6 pt-6 text-center text-xs text-gray-500 border-t">
            <p>
              By continuing, you agree to JobRight's{" "}
              <Link to="/terms" className="text-jobright-blue hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="text-jobright-blue hover:underline">
                Privacy Policy
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
