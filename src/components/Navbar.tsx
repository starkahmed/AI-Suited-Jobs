
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
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
          <Link to="/about" className="text-gray-700 hover:text-jobright-blue transition-colors">
            About
          </Link>
        </nav>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" asChild>
            <Link to="/login">Login</Link>
          </Button>
          <Button className="bg-gradient-to-r from-jobright-blue to-jobright-purple hover:opacity-90" asChild>
            <Link to="/signup">Sign Up</Link>
          </Button>
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
            <Link 
              to="/about" 
              className="text-gray-700 hover:text-jobright-blue transition-colors py-2"
              onClick={() => setMenuOpen(false)}
            >
              About
            </Link>
            <div className="flex flex-col space-y-2 pt-4 border-t">
              <Button variant="outline" asChild className="w-full">
                <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
              </Button>
              <Button className="bg-gradient-to-r from-jobright-blue to-jobright-purple w-full" asChild>
                <Link to="/signup" onClick={() => setMenuOpen(false)}>Sign Up</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
