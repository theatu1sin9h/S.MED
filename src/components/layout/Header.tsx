import React, { useState } from 'react';
import { Menu, X, Sun, Moon, User, Stethoscope, FileText, Building2 as Hospital, Activity, Home, LogOut, UserCircle, ChevronRight, Settings, Bell } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import SignInUp from './Signinup';

interface AuthUser {
  name: string;
  email: string;
}

const Header: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/', icon: <Home size={20} />, description: 'Dashboard & Overview' },
    { name: 'Chatbot', path: '/ai_Chatbot', icon: <Stethoscope size={20} />, description: 'AI-Powered Health Analysis' },
    { name: 'Records', path: '/records', icon: <FileText size={20} />, description: 'Medical History & Documents' },
    { name: 'Hospitals', path: '/hospitals', icon: <Hospital size={20} />, description: 'Find & Book Appointments' },
    { name: 'HealthDesk', path: '/healthdesk', icon: <Activity size={20} />, description: 'Health Monitoring Tools' },
  ];

  const profileLinks = [
    { name: 'Profile Settings', path: '/profile', icon: <User size={18} />, description: 'Manage your account' },
    { name: 'Preferences', path: '/preferences', icon: <Settings size={18} />, description: 'App settings & privacy' },
    { name: 'Notifications', path: '/notifications', icon: <Bell size={18} />, description: 'Manage alerts' },
  ];

  const handleAuthSuccess = (userData: AuthUser) => {
    setUser(userData);
    setIsAuthOpen(false);
    // Store user data in localStorage
    localStorage.setItem('user', JSON.stringify(userData));
    // Dispatch custom event to update other components
    window.dispatchEvent(new CustomEvent('authChange', { detail: userData }));
  };

  const handleSignOut = () => {
    setUser(null);
    setIsUserMenuOpen(false);
    setIsSidebarOpen(false);
    localStorage.removeItem('user');
    // Dispatch custom event to update other components
    window.dispatchEvent(new CustomEvent('authChange', { detail: null }));
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  // Load user from localStorage on component mount
  React.useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user data:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  return (
    <>
      {/* Backdrop Overlay - visible on tablet and mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={closeSidebar}
        />
      )}

      <header className="bg-white dark:bg-gray-900 sticky top-0 z-50 shadow-md transition-colors duration-200">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Stethoscope className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">S.MED</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-all duration-200 ${
                  location.pathname === link.path
                    ? 'text-blue-600 dark:text-blue-400 font-medium bg-blue-50 dark:bg-blue-900/30'
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30'
                }`}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Desktop Authentication Section */}
            {user ? (
              <div className="relative hidden md:block">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
                  aria-label="User menu"
                >
                  <UserCircle size={20} />
                  <span className="hidden sm:inline text-sm font-medium">{user.name}</span>
                </button>

                {/* Desktop User Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-2 border border-gray-200 dark:border-gray-700">
                    <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                    </div>
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <User className="mr-3 h-4 w-4" />
                      Profile
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <LogOut className="mr-3 h-4 w-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setIsAuthOpen(true)}
                className="hidden md:block bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105"
              >
                Sign In
              </button>
            )}

            {/* Mobile/Hamburger menu button */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              aria-label="Open menu"
            >
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Sidebar Navigation */}
        <div
          className={`md:hidden fixed top-0 left-0 h-full w-80 bg-white dark:bg-gray-900 shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <Link to="/" className="flex items-center space-x-2" onClick={closeSidebar}>
              <Stethoscope className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">S.MED</span>
            </Link>
            <button
              onClick={closeSidebar}
              className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex flex-col h-full overflow-y-auto">
            {/* User Profile Section */}
            {user && (
              <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                    <UserCircle className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{user.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{user.email}</p>
                  </div>
                </div>
                <div className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                  ● Online
                </div>
              </div>
            )}

            {/* Navigation Links */}
            <nav className="flex-1 p-4 space-y-2">
              <div className="mb-4">
                <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                  Navigation
                </h4>
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 group ${
                      location.pathname === link.path
                        ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 shadow-sm'
                        : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30'
                    }`}
                    onClick={closeSidebar}
                  >
                    <div className={`p-2 rounded-md ${
                      location.pathname === link.path
                        ? 'bg-blue-100 dark:bg-blue-800/50'
                        : 'bg-gray-100 dark:bg-gray-800 group-hover:bg-blue-100 dark:group-hover:bg-blue-800/50'
                    }`}>
                      {link.icon}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{link.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{link.description}</div>
                    </div>
                    <ChevronRight size={16} className="text-gray-400 group-hover:text-blue-500" />
                  </Link>
                ))}
              </div>

              {/* Profile Section */}
              {user && (
                <div className="mb-4">
                  <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                    Account
                  </h4>
                  {profileLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all duration-200 group"
                      onClick={closeSidebar}
                    >
                      <div className="p-2 rounded-md bg-gray-100 dark:bg-gray-800 group-hover:bg-blue-100 dark:group-hover:bg-blue-800/50">
                        {link.icon}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{link.name}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{link.description}</div>
                      </div>
                      <ChevronRight size={16} className="text-gray-400 group-hover:text-blue-500" />
                    </Link>
                  ))}
                </div>
              )}

              {/* Settings */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <button
                  onClick={toggleTheme}
                  className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 w-full group"
                >
                  <div className="p-2 rounded-md bg-gray-100 dark:bg-gray-800 group-hover:bg-gray-200 dark:group-hover:bg-gray-700">
                    {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-medium">Theme</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                    </div>
                  </div>
                </button>
              </div>
            </nav>

            {/* Bottom Section */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              {user ? (
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-3 p-3 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 w-full group"
                >
                  <div className="p-2 rounded-md bg-red-100 dark:bg-red-900/30 group-hover:bg-red-200 dark:group-hover:bg-red-900/50">
                    <LogOut size={18} />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-medium">Sign Out</div>
                    <div className="text-xs text-red-500 dark:text-red-400">Logout from your account</div>
                  </div>
                </button>
              ) : (
                <button
                  onClick={() => {
                    setIsAuthOpen(true);
                    closeSidebar();
                  }}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-4 py-3 rounded-lg transition-all duration-200 transform hover:scale-105"
                >
                  Sign In to S.MED
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* SignInUp Modal */}
      <SignInUp
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />
    </>
  );
};

export default Header;