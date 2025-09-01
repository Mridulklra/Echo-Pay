import React, { useState } from 'react';
import { Mic, MicOff, CreditCard, Send, Users, Shield, Zap, Star, ArrowRight, CheckCircle, Sparkles, TrendingUp } from 'lucide-react';
import { Link } from "react-router-dom";

// Header Navigation Component
// Header Navigation Component with modern aesthetic
const Header = () => {
  return (
    <header className="fixed top-0 w-full bg-slate-900/80 backdrop-blur-xl z-50 border-b border-cyan-500/20">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo with neon glow effect */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/25">
                <Mic className="w-7 h-7 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse">
                <Sparkles className="w-3 h-3 text-white m-0.5" />
              </div>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Echo Pay
            </h1>
          </div>
          
          {/* Navigation with glassmorphism */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-slate-300 hover:text-cyan-400 transition-colors font-medium">Features</a>
            <a href="#how-it-works" className="text-slate-300 hover:text-cyan-400 transition-colors font-medium">How it Works</a>
            <a href="#pricing" className="text-slate-300 hover:text-cyan-400 transition-colors font-medium">Pricing</a>
            <a href="#reviews" className="text-slate-300 hover:text-cyan-400 transition-colors font-medium">Reviews</a>
            <button className="relative overflow-hidden bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-105">
<Link to="/signup" className="relative z-10">
  GET STARTED
</Link>              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};


export default Header;