import CTASection from "../components/Landing-Page/CTASection";
import FeaturesSection from "../components/Landing-Page/FeaturesSection";
import Footer from "../components/Landing-Page/Footer";
import Header from "../components/Landing-Page/Header";
import HeroSection from "../components/Landing-Page/HeroSection";
import HowItWorksSection from "../components/Landing-Page/HowItWorksSection";
import ReviewsSection from "../components/Landing-Page/ReviewSection";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-purple-900">
      {/* Navigation Header - Fixed at top */}
      <Header/>
      
      {/* Hero Section - Main landing area with voice demo */}
      <HeroSection />
      
      {/* Features Section - Key product features */}
      <FeaturesSection />
      
      {/* How It Works Section - Step by step process */}
      <HowItWorksSection />
      
      {/* Customer Reviews - Social proof */}
      <ReviewsSection />
      
      {/* Call to Action - Sign up encouragement */}
      <CTASection />
      
      {/* Footer - Links and company info */}
      <Footer />
    </div>
  );
};

export default LandingPage;