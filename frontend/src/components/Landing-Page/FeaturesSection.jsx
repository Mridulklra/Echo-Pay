import React, { useState } from 'react';
import { Mic, MicOff, CreditCard, Send, Users, Shield, Zap, Star, ArrowRight, CheckCircle, Sparkles, TrendingUp } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: <Mic className="w-8 h-8" />,
      title: "Voice Commands",
      description: "Simply speak your payment request - 'Send $50 to Sarah' and it's done instantly.",
      gradient: "from-cyan-500 to-blue-600",
      shadow: "shadow-cyan-500/25"
    },
    {
      icon: <CreditCard className="w-8 h-8" />,
      title: "Traditional Payments", 
      description: "Classic card and bank transfer options available for those who prefer traditional methods.",
      gradient: "from-purple-500 to-pink-600",
      shadow: "shadow-purple-500/25"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Bank-Level Security",
      description: "Your voice patterns and payments are protected with military-grade encryption.",
      gradient: "from-green-500 to-teal-600",
      shadow: "shadow-green-500/25"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Instant Transfers",
      description: "Money reaches recipients in seconds, whether sent by voice or traditional methods.",
      gradient: "from-yellow-500 to-orange-600",
      shadow: "shadow-yellow-500/25"
    }
  ];

  return (
    <section id="features" className="py-20 bg-gradient-to-b from-slate-900 to-slate-800 relative">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-2 text-cyan-400 font-semibold mb-4">
            <Sparkles className="w-5 h-5" />
            <span className="text-sm uppercase tracking-wide">Premium Features</span>
          </div>
          <h2 className="text-5xl font-black text-white mb-4">
            Next-Level <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Payment Experience</span>
          </h2>
          <p className="text-slate-300 text-lg max-w-3xl mx-auto">
            Revolutionary features that make payments effortless, secure, and lightning-fast ⚡
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group relative">
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${feature.gradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 blur-sm`}></div>
              <div className={`relative bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 hover:border-cyan-500/30 transition-all duration-300 hover:transform hover:scale-105 ${feature.shadow} hover:shadow-lg group-hover:bg-slate-800`}>
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.gradient} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-300 leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;