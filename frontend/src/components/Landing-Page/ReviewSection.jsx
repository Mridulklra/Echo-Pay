import React, { useState } from 'react';
import { Mic, MicOff, CreditCard, Send, Users, Shield, Zap, Star, ArrowRight, CheckCircle } from 'lucide-react';

const ReviewsSection = () => {
  const reviews = [
    {
      name: "Zara Kim",
      role: "Digital Creator",
      rating: 5,
      comment: "Literally obsessed! 😍 Voice payments are a total game-changer. No more fumbling with cards - just speak and boom, done!",
      avatar: "ZK",
      gradient: "from-pink-400 to-purple-500"
    },
    {
      name: "Alex Chen",
      role: "Tech Entrepreneur",
      rating: 5,
      comment: "This is the future! My friends are shook when I pay by just talking. The traditional options work flawlessly too! 🔥",
      avatar: "AC",
      gradient: "from-cyan-400 to-blue-500"
    },
    {
      name: "Maya Patel",
      role: "Student",
      rating: 5,
      comment: "Finally a payment app that gets Gen-Z! Voice commands are so intuitive and the UI is absolutely stunning ✨",
      avatar: "MP",
      gradient: "from-green-400 to-teal-500"
    }
  ];

  return (
    <section id="reviews" className="py-20 bg-gradient-to-b from-slate-900 to-slate-800 relative">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-10 w-40 h-40 bg-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-10 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-2 text-yellow-400 font-semibold mb-4">
            <Star className="w-5 h-5 fill-current" />
            <span className="text-sm uppercase tracking-wide">5-Star Reviews</span>
          </div>
          <h2 className="text-5xl font-black text-white mb-4">
            What Our <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">Community</span> Says
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div key={index} className="group relative">
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${review.gradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm`}></div>
              <div className="relative bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 group-hover:border-cyan-500/30 transition-all duration-300 hover:transform hover:scale-105">
                <div className="flex items-center mb-4">
                  <div className={`w-14 h-14 rounded-full bg-gradient-to-r ${review.gradient} flex items-center justify-center text-white font-bold text-lg mr-4 shadow-lg`}>
                    {review.avatar}
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg">{review.name}</h4>
                    <p className="text-slate-400 text-sm">{review.role}</p>
                  </div>
                </div>
                
                <div className="flex mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-slate-300 leading-relaxed font-medium">{review.comment}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;