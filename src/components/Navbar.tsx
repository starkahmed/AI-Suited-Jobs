
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, User, LogOut, Bookmark } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check if user is logged in on component mount
  useEffect(() => {
    const userData = localStorage.getItem("jobright_user");
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("jobright_user");
    setUser(null);
    
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    });
    
    navigate("/");
  };

  return (
    <header className="py-4 px-4 md:px-8 fixed w-full z-50 bg-white/80 backdrop-blur-md border-b">
      <div className="container max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold text-jobright-blue">
            <span className="gradient-text">JobRight</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-700 hover:text-jobright-blue transition-colors">
            Home
          </Link>
          <Link to="/jobs" className="text-gray-700 hover:text-jobright-blue transition-colors">
            Find Jobs
          </Link>
          <Link to="/resume" className="text-gray-700 hover:text-jobright-blue transition-colors">
            AI Resume
          </Link>
          {user && (
            <Link to="/saved-jobs" className="text-gray-700 hover:text-jobright-blue transition-colors flex items-center">
              <Bookmark size={16} className="mr-1" /> Saved Jobs
            </Link>
          )}
        </nav>

        {/* Auth Buttons or User Menu */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <User size={16} />
                  <span>{user.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/saved-jobs")}>
                  <Bookmark className="mr-2 h-4 w-4" />
                  <span>Saved Jobs</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  My Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="text-red-500">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link to="/login">Login</Link>
              </Button>
              <Button className="bg-gradient-to-r from-jobright-blue to-jobright-purple hover:opacity-90" asChild>
                <Link to="/signup">Sign Up</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={toggleMenu}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b shadow-lg animate-fade-in">
          <div className="container mx-auto py-4 px-4 flex flex-col space-y-4">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-jobright-blue transition-colors py-2"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/jobs" 
              className="text-gray-700 hover:text-jobright-blue transition-colors py-2"
              onClick={() => setMenuOpen(false)}
            >
              Find Jobs
            </Link>
            <Link 
              to="/resume" 
              className="text-gray-700 hover:text-jobright-blue transition-colors py-2"
              onClick={() => setMenuOpen(false)}
            >
              AI Resume
            </Link>
            {user && (
              <Link 
                to="/saved-jobs" 
                className="text-gray-700 hover:text-jobright-blue transition-colors py-2 flex items-center"
                onClick={() => setMenuOpen(false)}
              >
                <Bookmark size={16} className="mr-2" /> Saved Jobs
              </Link>
            )}
            
            <div className="flex flex-col space-y-2 pt-4 border-t">
              {user ? (
                <>
                  <Button variant="outline" asChild className="justify-start" onClick={() => setMenuOpen(false)}>
                    <Link to="/dashboard">
                      <User className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </Button>
                  <Button variant="outline" asChild className="justify-start" onClick={() => setMenuOpen(false)}>
                    <Link to="/saved-jobs">
                      <Bookmark className="mr-2 h-4 w-4" />
                      Saved Jobs
                    </Link>
                  </Button>
                  <Button variant="outline" className="justify-start text-red-500" onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" asChild className="w-full">
                    <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
                  </Button>
                  <Button className="bg-gradient-to-r from-jobright-blue to-jobright-purple w-full" asChild>
                    <Link to="/signup" onClick={() => setMenuOpen(false)}>Sign Up</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
