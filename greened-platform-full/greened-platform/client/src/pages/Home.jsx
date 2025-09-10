import React from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';

const Home = () => {
  return (
    <motion.div
      className="text-center py-16"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Header 
        title="GreenEd Platform" 
        subtitle="Next-gen gamified environmental education platform for Punjab schools" 
      />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">GreenEd Platform</h1>
          <p className="text-xl text-green-700 mb-8 max-w-3xl mx-auto">
            Next-gen gamified environmental education platform for schools & colleges in Punjab, India.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary text-lg px-8 py-3">
              Get Started
            </button>
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          className="grid md:grid-cols-3 gap-8 mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="card p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13v8a2 2 0 01-2 2H5a2 2 0 01-2-2V13m16-10v4a2 2 0 01-2 2H9a2 2 0 01-2-2V3m16 7h-2a2 2 0 00-2 2v3a2 2 0 002 2h2a2 2 0 002-2v-3a2 2 0 00-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Gamified Learning</h3>
            <p className="text-gray-600">Earn points, badges, and climb leaderboards while learning about environmental sustainability.</p>
          </div>
          <div className="card p-6 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16a2 2 0 002 2h10a2 2 0 002-2zm-9-4h4a1 1 0 001-1v-4a1 1 0 00-1-1h-4a1 1 0 001 1v4a1 1 0 001 1zm-1 4h2v2h-2v-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Career Growth Tools</h3>
            <p className="text-gray-600">Build your portfolio, earn certifications, and discover career opportunities.</p>
          </div>
          <div className="card p-6 text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h-2V4a2 2 0 00-2-2H9a2 2 0 00-2 2v4H5a2 2 0 00-2 2v8a2 2 0 002 2h2v4a2 2 0 002 2h6a2 2 0 002-2v-4h2a2 2 0 002-2V8zM9 15l2 2 4-4" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Community Collaboration</h3>
            <p className="text-gray-600">Connect with peers, participate in group projects, and share environmental initiatives.</p>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="bg-green-50 rounded-2xl px-6 py-16 mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-700">5000+</div>
              <div className="text-gray-600">Students</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-700">150+</div>
              <div className="text-gray-600">Schools</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-700">50+</div>
              <div className="text-gray-600">Challenges</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-700">25+</div>
              <div className="text-gray-600">Partners</div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Home;