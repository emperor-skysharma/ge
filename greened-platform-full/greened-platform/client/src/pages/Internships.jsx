import React from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Card from '../components/Card';

const Internships = ({ user }) => {
  const opportunities = [
    {
      id: 1,
      title: 'Environmental Research Assistant',
      organization: 'Punjab Environmental Research Institute',
      location: 'Chandigarh',
      duration: '3 months',
      stipend: '₹8,000/month'
    },
    {
      id: 2,
      title: 'Sustainability Coordinator',
      organization: 'Green Punjab Initiative',
      location: 'Amritsar',
      duration: '6 months',
      stipend: '₹12,000/month'
    },
    {
      id: 3,
      title: 'Field Conservation Volunteer',
      organization: 'Wildlife Protection Society',
      location: 'Ropar',
      duration: '2 months',
      stipend: 'Volunteer'
    }
  ];

  if (!user) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold mb-4">Login Required</h2>
        <p className="text-gray-600 mb-6">Please log in to view internship opportunities</p>
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
        title="Career Opportunities" 
        subtitle="Available Internship Positions" 
      />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {opportunities.map((opportunity) => (
            <motion.div
              key={opportunity.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <h3 className="text-xl font-bold mb-2">{opportunity.title}</h3>
                <p className="text-gray-600 mb-4">{opportunity.organization}</p>
                <div className="flex justify-between items-center mb-4">
                  <div className="text-sm text-gray-500">
                    <span className="mr-3">📍 {opportunity.location}</span>
                    <span>⏱️ {opportunity.duration}</span>
                  </div>
                  <button className="btn-primary text-sm">
                    {t('internships.apply')}
                  </button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Internships;