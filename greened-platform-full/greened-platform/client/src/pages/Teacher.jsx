import React from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';

const Teacher = ({ user }) => {
  if (!user || user.role !== 'TEACHER') {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
        <p className="text-gray-600">This page is only accessible to teachers.</p>
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
        title="Teacher Dashboard" 
        subtitle="Manage student submissions and track class progress" 
      />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            className="card p-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-lg font-bold mb-4">{t('teacher.approvals')}</h3>
            <div className="space-y-4">
              {[
                { id: 1, student: 'Amanpreet Kaur', challenge: 'Plant a Tree', date: '2023-03-15' },
                { id: 2, student: 'Rajveer Singh', challenge: 'Community Clean-up', date: '2023-03-14' }
              ].map(submission => (
                <div key={submission.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-bold">{submission.student}</h4>
                      <p className="text-sm text-gray-600">{submission.challenge}</p>
                    </div>
                    <span className="text-xs text-gray-500">{submission.date}</span>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <button className="btn-primary text-sm">
                      {t('teacher.approve')}
                    </button>
                    <button className="btn-outline text-sm">
                      {t('teacher.reject')}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            className="card p-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <h3 className="text-lg font-bold mb-4">{t('teacher.analytics')}</h3>
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-bold">Class Summary</h4>
                <div className="flex justify-between">
                  <span>Total Students</span>
                  <span className="font-bold">42/50</span>
                </div>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-bold">Class Average</h4>
                <div className="flex justify-between">
                  <span>Average Points</span>
                  <span className="font-bold">245</span>
                </div>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-bold">Active Students</h4>
                <div className="flex justify-between">
                  <span>Active Students</span>
                  <span className="font-bold">84%</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Teacher;