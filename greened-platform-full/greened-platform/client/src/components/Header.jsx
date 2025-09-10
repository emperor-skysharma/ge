import React from 'react';
import { useTranslation } from 'react-i18next';

const Header = ({ user, onLogout, language, onToggleLanguage }) => {
  const { t } = useTranslation();

  return (
    <nav className="bg-green-700 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold">GreenEd</Link>
          
          <div className="hidden md:flex space-x-1">
            {[{ path: '/', label: t('nav.home') },
             { path: '/learn', label: t('nav.learn') },
             { path: '/challenges', label: t('nav.challenges') },
             { path: '/dashboard', label: t('nav.dashboard') },
             { path: '/portfolio', label: t('nav.portfolio') },
             { path: '/internships', label: t('nav.internships') },
             { path: '/forums', label: t('nav.forums') }
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? 'bg-green-800 text-white'
                    : 'text-green-100 hover:bg-green-600'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={onToggleLanguage}
              className="px-3 py-1 rounded-md bg-green-600 hover:bg-green-500 transition-colors"
            >
              {t('nav.language')}
            </button>
            
            {user ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm hidden md:inline">
                  {user.name}
                </span>
                <button
                  onClick={onLogout}
                  className="px-3 py-1 rounded-md bg-red-600 hover:bg-red-500 transition-colors"
                >
                  {t('nav.logout')}
                </button>
              </div>
            ) : (
              <div className="flex space-x-2">
                <Link
                  to="/login"
                  className="px-3 py-1 rounded-md bg-green-600 hover:bg-green-500 transition-colors"
                >
                  {t('nav.login')}
                </Link>
                <Link
                  to="/signup"
                  className="px-3 py-1 rounded-md bg-white text-green-700 hover:bg-gray-100 transition-colors"
                >
                  {t('nav.signup')}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;