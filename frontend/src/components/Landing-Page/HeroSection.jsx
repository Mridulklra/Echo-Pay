import React, { useState } from 'react';
import { Mic, MicOff, CreditCard, Send, Users, Shield, Zap, Star, ArrowRight, CheckCircle, Sparkles, TrendingUp } from 'lucide-react';


// Hero Section with vibrant Gen-Z aesthetic
const HeroSection = () => {
  const [isListening, setIsListening] = useState(false);
  const [voiceCommand, setVoiceCommand] = useState('');

  const handleVoiceClick = () => {
    setIsListening(!isListening);
    if (!isListening) {
      setTimeout(() => {
        setVoiceCommand('Send $100 to Rohan');
        setIsListening(false);
      }, 2000);
    } else {
      setVoiceCommand('');
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-20 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-pink-500/5 to-cyan-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content with enhanced typography */}
          <div className="text-white space-y-8">
            <div className="flex items-center space-x-2 text-cyan-400 font-semibold">
              <TrendingUp className="w-5 h-5" />
              <span className="text-sm uppercase tracking-wide">Next-Gen Payment</span>
            </div>

            <h1 className="text-6xl lg:text-7xl font-black leading-tight">
              <span className="text-white">Pay with</span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
                Your Voice
              </span>
              <br />
              <span className="text-slate-300 text-4xl lg:text-5xl font-light">instantly ⚡</span>
            </h1>
            
            <p className="text-xl text-slate-300 leading-relaxed max-w-lg">
              Skip the typing, skip the tapping. Just speak and send money instantly. 
              <span className="text-cyan-400 font-semibold">"Send $100 to Rohan"</span> - that's it! 
            </p>

            {/* Enhanced Voice Demo with neon effects */}
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl blur opacity-25"></div>
              <div className="relative bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-cyan-500/20">
                <h3 className="text-lg font-bold mb-4 flex items-center text-cyan-400">
                  <Mic className="w-5 h-5 mr-2" />
                  Try Voice Payment Now
                </h3>
                
                <div className="flex items-center space-x-4">
                  <button
                    onClick={handleVoiceClick}
                    className={`relative p-4 rounded-2xl transition-all duration-300 ${
                      isListening 
                        ? 'bg-gradient-to-r from-red-500 to-pink-600 animate-pulse shadow-lg shadow-red-500/50' 
                        : 'bg-gradient-to-r from-cyan-500 to-purple-600 hover:shadow-lg hover:shadow-cyan-500/50 hover:scale-110'
                    }`}
                  >
                    {isListening ? <MicOff className="w-7 h-7" /> : <Mic className="w-7 h-7" />}
                    {isListening && (
                      <div className="absolute -inset-2 border-2 border-red-400 rounded-2xl animate-ping"></div>
                    )}
                  </button>
                  
                  <div className="flex-1">
                    {isListening && (
                      <div className="text-cyan-300 animate-pulse font-medium">🎤 Listening for your command...</div>
                    )}
                    {voiceCommand && (
                      <div className="text-green-400 font-bold text-lg">✨ "{voiceCommand}"</div>
                    )}
                    {!isListening && !voiceCommand && (
                      <div className="text-slate-300">👆 Click mic and say: "Send $100 to Rohan"</div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Statistics with gradient borders */}
            <div className="grid grid-cols-2 gap-8">
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg opacity-50 blur-sm"></div>
                <div className="relative bg-slate-800 p-4 rounded-lg">
                  <div className="text-3xl font-black text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text">2M+</div>
                  <div className="text-slate-300 text-sm font-medium">Gen-Z users sending money daily with voice commands</div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg opacity-50 blur-sm"></div>
                <div className="relative bg-slate-800 p-4 rounded-lg">
                  <div className="text-3xl font-black text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">0.5s</div>
                  <div className="text-slate-300 text-sm font-medium">Average time to complete voice payments</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content with floating cards and enhanced animations */}
          <div className="relative">
            {/* Enhanced floating cards with neon effects */}
            <div className="absolute top-0 right-0 transform rotate-12 hover:rotate-6 transition-all duration-500 hover:scale-105">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-2xl blur opacity-50"></div>
                <div className="relative w-72 h-44 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl p-6 text-white border border-cyan-500/30">
                  <div className="flex justify-between items-start mb-8">
                    <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center">
                      <CreditCard className="w-6 h-6" />
                    </div>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-100"></div>
                      <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse delay-200"></div>
                    </div>
                  </div>
                  <div className="text-sm text-slate-400">**** **** **** 1234</div>
                  <div className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">ECHO PAY</div>
                </div>
              </div>
            </div>

            <div className="absolute top-20 left-0 transform -rotate-6 hover:rotate-0 transition-all duration-500 hover:scale-105">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-pink-600 rounded-2xl blur opacity-50"></div>
                <div className="relative w-72 h-44 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl p-6 text-white border border-purple-500/30">
                  <div className="flex justify-between items-start mb-8">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg flex items-center justify-center">
                      <Mic className="w-6 h-6" />
                    </div>
                    <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-cyan-400 rounded-full flex items-center justify-center animate-pulse">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <div className="text-sm text-slate-400">Voice Activated</div>
                  <div className="text-lg font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">VOICE PAY</div>
                </div>
              </div>
            </div>

            {/* Enhanced voice wave animation */}
            <div className="absolute bottom-10 right-20">
              <div className="flex items-end space-x-1">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="w-3 bg-gradient-to-t from-cyan-500 to-purple-600 rounded-full animate-pulse shadow-lg"
                    style={{
                      height: `${Math.random() * 60 + 20}px`,
                      animationDelay: `${i * 0.1}s`,
                      boxShadow: '0 0 20px rgba(6, 182, 212, 0.4)'
                    }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;