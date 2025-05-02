import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">AgencyListings</h3>
            <p className="text-primary-300 text-sm">
              The premier marketplace for agency listings. Connecting professional agencies with interested clients.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-primary-300 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary-300 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary-300 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary-300 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-primary-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/listings" className="text-primary-300 hover:text-white transition-colors">
                  Listings
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-primary-300 hover:text-white transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-primary-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* More links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">For Agencies</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/register" className="text-primary-300 hover:text-white transition-colors">
                  Join as Agency
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-primary-300 hover:text-white transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-primary-300 hover:text-white transition-colors">
                  Resources
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-primary-300 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Mail className="h-5 w-5 mr-2 text-primary-400 flex-shrink-0 mt-0.5" />
                <span className="text-primary-300">support@agencylistings.example.com</span>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 mr-2 text-primary-400 flex-shrink-0 mt-0.5" />
                <span className="text-primary-300">+1 (555) 123-4567</span>
              </li>
            </ul>
            <div className="mt-6">
              <form className="space-y-3">
                <h4 className="text-sm font-medium">Subscribe to our Newsletter</h4>
                <div className="flex">
                  <input 
                    type="email" 
                    placeholder="Your email" 
                    className="px-3 py-2 text-sm text-gray-900 bg-white border border-r-0 border-gray-300 rounded-l-md w-full focus:outline-none focus:ring-1 focus:ring-accent-500"
                  />
                  <button 
                    type="submit" 
                    className="bg-accent-600 px-4 py-2 text-white text-sm font-medium rounded-r-md hover:bg-accent-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-500 focus:ring-offset-primary-900"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-700">
          <p className="text-center text-primary-400 text-sm">
            &copy; {new Date().getFullYear()} AgencyListings. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;