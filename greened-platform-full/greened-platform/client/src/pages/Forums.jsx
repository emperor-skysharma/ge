import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Card from '../components/Card';

const Forums = ({ user }) => {
  const [threads, setThreads] = useState([]);
  const [newThreadForm, setShowNewThreadForm] = useState(false);
  const [newThread, setNewThread] = useState({ title: '', content: '' });

  useEffect(() => {
    if (user) {
      fetchThreads();
    }
  }, [user]);

  const fetchThreads = async () => {
    try {
      const response = await forumsAPI.getAll();
      setThreads(response.data);
    } catch (error) {
      console.error('Error fetching forum threads:', error);
    }
  };

  const handleCreateThread = (e) => {
    e.preventDefault();
    try {
      forumsAPI.createThread(newThread);
      setNewThread({ title: '', content: '' });
      setShowNewThreadForm(false);
      fetchThreads();
    } catch (error) {
      console.error('Error creating thread:', error);
    }
  };

  if (!user) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold mb-4">{t('auth.login')}</h2>
        <p className="text-gray-600 mb-6">{t('auth.noAccount')}</p>
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
        title={t('forums.title')} 
        subtitle={t('forums.threads')} 
      />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-end mb-6">
          <button 
            onClick={() => setShowNewThreadForm(!showNewThreadForm)}
            className="px-3 py-1 rounded-md bg-green-600 hover:bg-green-500 transition-colors"
          >
            {t('forums.create')}
          </button>
        </div>
        
        {showNewThreadForm && (
          <motion.div
            className="card p-8 mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl font-bold mb-4">{t('forums.create')}</h3>
            <form onSubmit={handleCreateThread}>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder={t('forums.threadTitle')}
                  className="input-field"
                  value={newThread.title}
                  onChange={(e) => setNewThread({...newThread, title: e.target.value})}
                  required
                />
              </div>
              <div className="mb-4">
                <textarea
                  placeholder={t('forums.content')}
                  className="input-field h-32"
                  value={newThread.content}
                  onChange={(e) => setNewThread({...newThread, content: e.target.value})}
                  required
                />
              </div>
              <div className="flex gap-2">
                <button type="submit" className="btn-primary text-sm">
                  {t('forums.post')}
                </button>
                <button
                  type="button"
                  onClick={() => setShowNewThreadForm(false)}
                  className="btn-outline text-sm"
                >
                  {t('auth.cancel')}
                </button>
              </div>
            </form>
          </motion.div>
        )}

        <div className="space-y-6">
          {threads.map((thread) => (
            <motion.div
              key={thread.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <h3 className="text-xl font-bold mb-2">{thread.title}</h3>
                <p className="text-gray-700 mb-4">{thread.content}</p>
                <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
                  <span>{t('forums.posted')} {thread.author?.name}</span>
                  <span>{new Date(thread.createdAt).toLocaleDateString()}</span>
                </div>
                {thread.replies && thread.replies.length > 0 && (
                  <div className="mt-4 pt-4 border-t">
                    <h4 className="font-bold mb-2">{t('forums.replies')}</h4>
                    <div className="space-y-3">
                      {thread.replies.map((reply) => (
                        <div key={reply.id} className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-gray-700">{reply.content}</p>
                        <div className="text-xs text-gray-500 mt-1">
                          {t('forums.posted')} {reply.author?.name} Â· {new Date(reply.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                      ))}
                    </div>
                  </div>
                )}
                <div className="mt-4">
                  <button className="btn-outline text-sm">
                    {t('forums.reply')}
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

export default Forums;