import React from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';

const Portfolio = ({ user }) => {
  if (!user) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold mb-4">Login Required</h2>
        <p className="text-gray-600 mb-6">Please log in to view your portfolio</p>
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Header 
        title="My Portfolio" 
        subtitle="Showcase your environmental achievements" 
      />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl p-8 mt-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <div className="bg-gray-200 rounded-full w-32 h-32 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-center">{user.name}</h2>
              <p className="text-gray-600 text-center">Environmental Advocate</p>
            </div>
            
            <div className="md:w-2/3">
              <h3 className="text-xl font-bold mb-4">Certifications</h3>
              <div className="border-l-4 border-green-500 pl-4 mb-6">
                <h4 className="font-bold">Biodiversity Conservation</h4>
                <p className="text-sm text-gray-600">Completed March 2023</p>
              </div>
              
              <div className="border-l-4 border-blue-500 pl-4 mb-6">
                <h4 className="font-bold">Sustainable Agriculture</h4>
                <p className="text-sm text-gray-600">Completed February 2023</p>
              </div>
              
              <h3 className="text-xl font-bold mb-4">Projects</h3>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-bold">Community Tree Planting</h4>
                  <p className="text-sm text-gray-600">Planted 50 native trees in local park</p>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-bold">Plastic Reduction Campaign</h4>
                  <p className="text-sm text-gray-600">Reduced single-use plastics in school by 60%</p>
                </div>
              </div>
              
              <div className="mt-6">
                <button className="btn-primary">
                  {t('portfolio.export')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Portfolio;