import React, { useState } from 'react';
import { Mic, MicOff, CreditCard, Send, Users, Shield, Zap, Star, ArrowRight, CheckCircle, Sparkles, TrendingUp } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 animate-pulse"></div>
        <div className="absolute top-10 left-10 w-32 h-32 border border-white/10 rounded-full animate-spin slow"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 border border-white/10 rounded-full animate-spin slow reverse"></div>
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center space-x-2 text-white/80 font-semibold mb-6">
            <Sparkles className="w-6 h-6" />
            <span className="text-lg uppercase tracking-wide">Join The Revolution</span>
          </div>
          
          <h2 className="text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
            Ready to <span className="text-yellow-300">Go Viral</span><br />
            with Voice Payments?
          </h2>
          
          <p className="text-2xl text-white/90 mb-12 max-w-3xl mx-auto font-medium">
            Be the trendsetter in your squad! Join 2M+ Gen-Z users who've already ditched traditional payment methods 🚀
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="group relative overflow-hidden bg-white text-purple-700 px-10 py-5 rounded-2xl font-black text-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <span className="relative z-10 flex items-center">
                <Sparkles className="w-6 h-6 mr-3" />
                Start For FREE
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            
            <button className="group relative overflow-hidden border-3 border-white text-white px-10 py-5 rounded-2xl font-black text-xl hover:bg-white hover:text-purple-700 transition-all duration-300 hover:scale-105">
              <span className="flex items-center">
                <TrendingUp className="w-6 h-6 mr-3" />
                Watch Demo
              </span>
            </button>
          </div>
          
          <div className="flex items-center justify-center space-x-8 mt-8 text-white/80 text-lg">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-6 h-6 text-green-400" />
              <span>No Credit Card</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-6 h-6 text-green-400" />
              <span>Free Forever</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-6 h-6 text-green-400" />
              <span>Voice Included</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default CTASection;