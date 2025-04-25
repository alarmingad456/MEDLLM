import React, { useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Brain, Shield, Activity, ChevronDown } from 'lucide-react';
import Navbar from './Navbar';

function HomePage() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, -50]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const features = [
    {
      icon: Brain,
      title: "Advanced AI Diagnostics",
      description: "Cutting-edge medical analysis powered by state-of-the-art language models"
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your health data is protected with enterprise-grade security"
    },
    {
      icon: Activity,
      title: "Real-time Monitoring",
      description: "Continuous health tracking and personalized recommendations"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-white">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <motion.div
            style={{ y, opacity }}
            className="container mx-auto px-4 text-center"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold text-gray-900 mb-6"
            >
              The Future of
              <span className="text-[#4f8684] block">Medical Diagnostics</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
            >
              Experience healthcare powered by advanced AI, providing personalized medical insights and recommendations.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex justify-center gap-4"
            >
              <Link
                to="/profile"
                className="bg-[#4f8684] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#3f6b69] transition-colors transform hover:scale-105"
              >
                Complete Your Profile
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          >
            <ChevronDown className="text-gray-400" size={32} />
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose MedLLM?</h2>
              <p className="text-xl text-gray-600">Revolutionizing healthcare with AI-powered insights</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="w-16 h-16 bg-cyan-100 rounded-lg flex items-center justify-center mb-6">
                    <feature.icon className="text-[#4f8684]" size={32} />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-[#4f8684] to-[#3f6b69]">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center text-white"
            >
              <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                Complete your health profile for personalized medical insights and recommendations.
              </p>
              <Link
                to="/profile"
                className="bg-white text-[#4f8684] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block transform hover:scale-105"
              >
                Complete Your Profile
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default HomePage;