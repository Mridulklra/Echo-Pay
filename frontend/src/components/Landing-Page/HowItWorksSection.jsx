import React, { useState } from 'react';
import { Mic, MicOff, CreditCard, Send, Users, Shield, Zap, Star, ArrowRight, CheckCircle, Sparkles, TrendingUp } from 'lucide-react';

const HowItWorksSection = () => {
  const steps = [
    {
      step: 1,
      title: "Quick Sign Up",
      description: "Create your Echo Pay account in under 60 seconds with just your email and phone.",
      icon: <Users className="w-8 h-8" />,
      gradient: "from-cyan-400 to-blue-500"
    },
    {
      step: 2,
      title: "Choose Your Style",
      description: "Pick voice payment for instant commands or traditional methods - your choice!",
      icon: <CreditCard className="w-8 h-8" />,
      gradient: "from-purple-400 to-pink-500"
    },
    {
      step: 3,
      title: "Send & Receive",
      description: "Just say 'Send $100 to Rohan' or tap to pay. Money moves in seconds! ⚡",
      icon: <Send className="w-8 h-8" />,
      gradient: "from-green-400 to-teal-500"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-b from-slate-800 to-slate-900 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-2 text-purple-400 font-semibold mb-4">
            <TrendingUp className="w-5 h-5" />
            <span className="text-sm uppercase tracking-wide">Super Simple Process</span>
          </div>
          <h2 className="text-5xl font-black text-white mb-4">
            Get Started in <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">3 Easy Steps</span>
          </h2>
          <p className="text-slate-300 text-lg max-w-3xl mx-auto">
            From zero to hero in minutes. Track every transaction with complete transparency 📊
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {steps.map((step, index) => (
            <div key={index} className="text-center relative">
              {/* Step connector line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-20 left-full w-full h-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 opacity-30 transform -translate-x-1/2 z-0"></div>
              )}
              
              {/* Step card */}
              <div className="relative z-10 group">
                <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${step.gradient} flex items-center justify-center text-white shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                  {step.icon}
                </div>
                
                <div className={`w-12 h-12 mx-auto mb-6 rounded-full bg-gradient-to-r ${step.gradient} flex items-center justify-center text-white font-black text-lg shadow-lg`}>
                  {step.step}
                </div>
                
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                  <div className="relative bg-slate-800/50 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50 group-hover:border-cyan-500/30 transition-all duration-300">
                    <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
                    <p className="text-slate-300 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;