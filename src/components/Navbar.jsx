import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Stethoscope, Home, MessageSquare, User } from 'lucide-react';

function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-[#4f8684] text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <Stethoscope size={32} />
            <span className="text-2xl font-bold">MedLLM</span>
          </Link>
          
          <div className="hidden md:flex space-x-8">
            <Link
              to="/"
              className={`flex items-center space-x-2 hover:text-cyan-100 transition-colors ${
                isActive('/') ? 'text-cyan-100' : ''
              }`}
            >
              <Home size={20} />
              <span>Home</span>
            </Link>
            
            <Link
              to="/chat"
              className={`flex items-center space-x-2 hover:text-cyan-100 transition-colors ${
                isActive('/chat') ? 'text-cyan-100' : ''
              }`}
            >
              <MessageSquare size={20} />
              <span>Chat</span>
            </Link>
            
            <Link
              to="/profile"
              className={`flex items-center space-x-2 hover:text-cyan-100 transition-colors ${
                isActive('/profile') ? 'text-cyan-100' : ''
              }`}
            >
              <User size={20} />
              <span>Profile</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;