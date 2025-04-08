
import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 py-12 mt-16">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="text-2xl font-bold">
              <span className="gradient-text">JobRight</span>
            </Link>
            <p className="mt-4 text-gray-600">
              AI-powered job matching platform that helps you find the right job based on your resume and skills.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-400 hover:text-jobright-blue transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-jobright-blue transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-jobright-blue transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-jobright-blue transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">For Job Seekers</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/jobs" className="text-gray-600 hover:text-jobright-blue">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link to="/resume" className="text-gray-600 hover:text-jobright-blue">
                  Resume Analysis
                </Link>
              </li>
              <li>
                <Link to="/saved" className="text-gray-600 hover:text-jobright-blue">
                  Saved Jobs
                </Link>
              </li>
              <li>
                <Link to="/career-tips" className="text-gray-600 hover:text-jobright-blue">
                  Career Tips
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-jobright-blue">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-jobright-blue">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-jobright-blue">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-jobright-blue">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="text-gray-600">
                1234 Market Street
              </li>
              <li className="text-gray-600">
                San Francisco, CA 94103
              </li>
              <li className="text-gray-600">
                contact@jobright.ai
              </li>
              <li className="text-gray-600">
                +1 (555) 123-4567
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-12 pt-8 text-center text-gray-500">
          <p>© {new Date().getFullYear()} JobRight AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
