import React from 'react';
import { User, Stethoscope, FileText, Building2 as Hospital, ArrowRight, ShieldCheck, Heart, Sparkles, Activity } from 'lucide-react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import FeatureCard from '../components/home/FeatureCard';

const Home: React.FC = () => {
  // Define features for the feature cards
  const features = [
    {
      title: 'Personal Profile',
      description: 'Manage your health information and family details in one secure place.',
      icon: <User className="h-8 w-8 text-blue-600" />,
      to: '/profile',
      color: 'bg-blue-100 dark:bg-blue-900/30'
    },
    {
      title: 'AI Diagnostics',
      description: 'Get preliminary health insights based on your symptoms.',
      icon: <Stethoscope className="h-8 w-8 text-green-600" />,
      to: '/diagnostics',
      color: 'bg-green-100 dark:bg-green-900/30'
    },
    {
      title: 'Health Records',
      description: 'Store and access your medical history securely.',
      icon: <FileText className="h-8 w-8 text-indigo-600" />,
      to: '/records',
      color: 'bg-indigo-100 dark:bg-indigo-900/30'
    },
    {
      title: 'Hospital Directory',
      description: 'Find and book appointments with hospitals near you.',
      icon: <Hospital className="h-8 w-8 text-red-600" />,
      to: '/hospitals',
      color: 'bg-red-100 dark:bg-red-900/30'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-200 dark:bg-blue-800 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-64 h-64 bg-purple-200 dark:bg-purple-800 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-pink-200 dark:bg-pink-800 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white py-16 md:py-24 relative z-10">
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6 animate-fade-in-down">
              <Sparkles className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">AI-Powered Healthcare</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight animate-fade-in-up">
              Your Personal Healthcare
              <span className="bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent block">
                Companion
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 animate-fade-in-up animation-delay-200">
              Manage your health records, get AI-powered insights, and connect with healthcare providers - all in one secure place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-400">
              <button className="group relative border-2 border-white/30 text-white hover:border-white hover:scale-105 transform transition-all duration-300 font-semibold px-8 py-4 rounded-lg overflow-hidden bg-gradient-to-r backdrop-blur-sm">
              <div className="absolute inset-0 rounded-lg p-0.5 bg-gradient-to-r from-pink-400 via-purple-500 to-cyan-400 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                <div className="h-full w-full rounded-md bg-black/20 backdrop-blur-sm group-hover:bg-gradient-to-r group-hover:from-pink-500/30 group-hover:via-purple-500/30 group-hover:to-cyan-500/30 transition-all duration-500"></div>
              </div>
              <div className="absolute -inset-2 bg-gradient-to-r from-pink-400 via-purple-500 to-cyan-400 rounded-lg blur-lg opacity-0 group-hover:opacity-40 transition-all duration-500"></div>
              <span className="relative flex items-center justify-center bg-gradient-to-r from-pink-300 via-purple-300 to-cyan-300 bg-clip-text group-hover:text-transparent transition-all duration-300">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </span>
            </button>

              <Button 
                className="border-2 border-white/30 text-white hover:bg-white/10 hover:border-white hover:scale-105 transform transition-all duration-300 backdrop-blur-sm font-semibold px-8 py-4 rounded-full"
              >
                <span className="flex items-center">
                  <Activity className="mr-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  Learn More
                </span>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 mb-4">
              <span className="text-sm font-medium">Comprehensive Features</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 animate-fade-in-up">
              Healthcare Management
              <span className="text-blue-600"> Reimagined</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
              S.MED provides all the tools you need to take control of your healthcare journey with cutting-edge technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="animate-fade-in-up hover:scale-105 transform transition-all duration-500"
                style={{ animationDelay: `${index * 100 + 400}ms` }}
              >
                <FeatureCard
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                  to={feature.to}
                  color={feature.color}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white dark:bg-gray-900 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 mb-4">
              <span className="text-sm font-medium">Why Choose Us</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 animate-fade-in-up">
              Built for
              <span className="text-green-600"> Modern Healthcare</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
              Our platform offers unique benefits designed to make healthcare management simpler, safer, and more efficient.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="animate-fade-in-up animation-delay-200 hover:scale-105 transform transition-all duration-500">
              <Card className="h-full hover:shadow-2xl transition-all duration-300 border-0 shadow-lg">
                <div className="flex flex-col items-center text-center p-8">
                  <div className="p-4 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 mb-6 hover:rotate-12 transition-transform duration-300">
                    <ShieldCheck className="h-10 w-10 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-800 dark:text-white">Secure Data</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Your health data is encrypted and protected using advanced blockchain technology, ensuring complete privacy and security.
                  </p>
                </div>
              </Card>
            </div>

            <div className="animate-fade-in-up animation-delay-400 hover:scale-105 transform transition-all duration-500">
              <Card className="h-full hover:shadow-2xl transition-all duration-300 border-0 shadow-lg">
                <div className="flex flex-col items-center text-center p-8">
                  <div className="p-4 rounded-full bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 mb-6 hover:rotate-12 transition-transform duration-300">
                    <Heart className="h-10 w-10 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-800 dark:text-white">Personalized Care</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Get customized health insights and AI-powered recommendations based on your unique health profile and history.
                  </p>
                </div>
              </Card>
            </div>

            <div className="animate-fade-in-up animation-delay-600 hover:scale-105 transform transition-all duration-500">
              <Card className="h-full hover:shadow-2xl transition-all duration-300 border-0 shadow-lg">
                <div className="flex flex-col items-center text-center p-8">
                  <div className="p-4 rounded-full bg-gradient-to-br from-indigo-100 to-indigo-200 dark:from-indigo-900/30 dark:to-indigo-800/30 mb-6 hover:rotate-12 transition-transform duration-300">
                    <Hospital className="h-10 w-10 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-800 dark:text-white">Simplified Access</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Easily find and connect with healthcare providers, book appointments, and securely share your information.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="animate-fade-in-up">
              <div className="text-4xl font-bold mb-2">50K+</div>
              <div className="text-blue-200">Active Users</div>
            </div>
            <div className="animate-fade-in-up animation-delay-200">
              <div className="text-4xl font-bold mb-2">1M+</div>
              <div className="text-blue-200">Health Records</div>
            </div>
            <div className="animate-fade-in-up animation-delay-400">
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-blue-200">Partner Hospitals</div>
            </div>
            <div className="animate-fade-in-up animation-delay-600">
              <div className="text-4xl font-bold mb-2">99.9%</div>
              <div className="text-blue-200">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-600 via-purple-700 to-pink-600 text-white relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6 animate-fade-in-down">
              <span className="text-sm font-medium">Join the Revolution</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in-up">
              Ready to transform your
              <span className="block text-yellow-300">healthcare experience?</span>
            </h2>
            <p className="text-xl mb-10 text-indigo-100 animate-fade-in-up animation-delay-200 max-w-2xl mx-auto">
              Join thousands of users who are already benefiting from S.MED's comprehensive healthcare management platform.
            </p>
            <div className="animate-fade-in-up animation-delay-400">
              <button className="bg-white text-indigo-600 hover:bg-gray-100 hover:scale-105 transform transition-all duration-300 shadow-xl hover:shadow-2xl font-bold px-12 py-5 rounded-full text-lg group inline-flex items-center justify-center">
                Get Started Now
                <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Custom CSS for animations */}
      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }
        
        .animate-fade-in-down {
          animation: fade-in-down 0.6s ease-out;
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-200 {
          animation-delay: 200ms;
        }
        
        .animation-delay-400 {
          animation-delay: 400ms;
        }
        
        .animation-delay-600 {
          animation-delay: 600ms;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default Home;