import React from 'react';
import { User, Stethoscope, FileText, Guitar as Hospital, ArrowRight, ShieldCheck, Heart } from 'lucide-react';
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
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Your Personal Healthcare Companion
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Manage your health records, get AI-powered insights, and connect with healthcare providers - all in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="primary" 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-blue-50"
              >
                Get Started
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white text-white hover:bg-blue-700"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Comprehensive Healthcare Management
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              S.MED provides all the tools you need to take control of your healthcare journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                to={feature.to}
                color={feature.color}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose S.MED?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Our platform offers unique benefits designed to make healthcare management simpler and more efficient.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <div className="flex flex-col items-center text-center p-4">
                <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-4">
                  <ShieldCheck className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Secure Data</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Your health data is encrypted and protected using blockchain technology, ensuring privacy and security.
                </p>
              </div>
            </Card>

            <Card>
              <div className="flex flex-col items-center text-center p-4">
                <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
                  <Heart className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Personalized Care</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Get customized health insights and recommendations based on your unique health profile and history.
                </p>
              </div>
            </Card>

            <Card>
              <div className="flex flex-col items-center text-center p-4">
                <div className="p-3 rounded-full bg-indigo-100 dark:bg-indigo-900/30 mb-4">
                  <Hospital className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Simplified Access</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Easily find and connect with healthcare providers, book appointments, and share your health information.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to take control of your healthcare?</h2>
            <p className="text-xl mb-8 text-indigo-100">
              Join thousands of users who are already benefiting from S.MED's comprehensive healthcare management platform.
            </p>
            <Button 
              variant="primary" 
              size="lg"
              className="bg-white text-indigo-600 hover:bg-indigo-50"
              icon={<ArrowRight className="ml-2" />}
            >
              Get Started Now
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;