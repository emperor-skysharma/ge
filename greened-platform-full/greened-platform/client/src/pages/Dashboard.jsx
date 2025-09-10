import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import ProgressBar from '../components/ProgressBar';
import BadgeDisplay from '../components/BadgeDisplay';

const Dashboard = ({ user }) => {
  const [stats, setStats] = useState({
    points: 0,
    badges: [],
    completedChallenges: 0,
    quizScores: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchStats();
    }
  }, [user]);

  const fetchStats = async () => {
    try {
      const response = await analyticsAPI.getSummary();
      setStats(response);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold mb-4">Login Required</h2>
        <p className="text-gray-600 mb-6">Please log in to view your dashboard</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
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
        title="My Dashboard" 
        subtitle={`Welcome back, ${user.name}`} 
      />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <motion.div
            className="card p-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-lg font-bold mb-2">{t('dashboard.points')}</h3>
            <div className="text-3xl font-bold text-green-600">{stats.points}</div>
          </motion.div>
          
          <motion.div
            className="card p-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <h3 className="text-lg font-bold mb-2">{t('dashboard.badges')}</h3>
            <div className="text-3xl font-bold text-blue-600">{stats.badges.length}</div>
          </motion.div>
          
          <motion.div
            className="card p-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <h3 className="text-lg font-bold mb-2">{t('dashboard.challenges')}</h3>
            <div className="text-3xl font-bold text-purple-600">{stats.completedChallenges}</div>
          </motion.div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 mt-8">
          <motion.div
            className="card p-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <h3 className="text-lg font-bold mb-4">{t('dashboard.recentActivity')}</h3>
            <div className="space-y-4">
              {stats.quizScores.slice(0, 5).map((score, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span>Quiz #{index + 1}</span>
                  <span className="font-bold text-green-600">{score.score}</span>
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            className="card p-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <BadgeDisplay badges={stats.badges} />
            <div className="mt-4">
              <ProgressBar 
                value={stats.points} 
                max={1000} 
                label="Next Badge Progress" 
              />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;