import React, { useState } from 'react';
import { Mic, MicOff, CreditCard, Send, Users, Shield, Zap, Star, ArrowRight, CheckCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-700">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <Mic className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Echo Pay</h3>
            </div>
            <p className="text-slate-400 leading-relaxed max-w-sm">
              The future of payments with next-gen voice technology. Join the revolution! 🚀
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 text-lg">Product</h4>
            <ul className="space-y-3 text-slate-400">
              <li><a href="#" className="hover:text-cyan-400 transition-colors font-medium">Voice Payments</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors font-medium">Traditional Payments</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors font-medium">Mobile App</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors font-medium">Developer API</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 text-lg">Company</h4>
            <ul className="space-y-3 text-slate-400">
              <li><a href="#" className="hover:text-cyan-400 transition-colors font-medium">About Us</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors font-medium">Careers</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors font-medium">Blog</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors font-medium">Press Kit</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 text-lg">Support</h4>
            <ul className="space-y-3 text-slate-400">
              <li><a href="#" className="hover:text-cyan-400 transition-colors font-medium">Help Center</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors font-medium">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors font-medium">Terms of Service</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors font-medium">Security</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-center md:text-left">
            &copy; 2025 Echo Pay. All rights reserved. Made with 💜 for Gen-Z
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <div className="text-slate-400 hover:text-cyan-400 transition-colors">🌟 4.9/5 App Store</div>
            <div className="text-slate-400 hover:text-cyan-400 transition-colors">⚡ 2M+ Users</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;