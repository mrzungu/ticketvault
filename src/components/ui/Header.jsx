import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = ({ user = null, onAuthToggle = () => {} }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    {
      label: 'Events',
      path: '/event-details',
      icon: 'Calendar',
      role: 'public',
      tooltip: 'Browse and book event tickets'
    },
    {
      label: 'My Account',
      path: '/booking-confirmation',
      icon: 'User',
      role: 'authenticated',
      tooltip: 'View bookings and account details'
    },
    {
      label: 'Staff Tools',
      path: '/qr-code-scanner',
      icon: 'Shield',
      role: 'staff',
      tooltip: 'Access staff management tools',
      submenu: [
        {
          label: 'QR Scanner',
          path: '/qr-code-scanner',
          icon: 'QrCode',
          tooltip: 'Scan and validate tickets'
        },
        {
          label: 'Admin Dashboard',
          path: '/admin-dashboard',
          icon: 'BarChart3',
          tooltip: 'Event management and analytics'
        }
      ]
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleAuthAction = () => {
    if (user) {
      // Handle logout
      onAuthToggle(null);
    } else {
      navigate('/login');
      setIsMobileMenuOpen(false);
    }
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  const canAccessItem = (item) => {
    if (item?.role === 'public') return true;
    if (item?.role === 'authenticated') return !!user;
    if (item?.role === 'staff') return user?.role === 'staff' || user?.role === 'admin';
    return false;
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b-2 border-foreground shadow-elevation-2">
        <div className="flex items-center justify-between h-16 px-4 lg:px-6">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-3 group transition-all duration-200 hover:scale-105"
            >
              <div className="relative">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shadow-neo-sm group-hover:shadow-cyber transition-all duration-200">
                  <Icon name="Ticket" size={24} color="var(--color-primary-foreground)" strokeWidth={2.5} />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse-glow"></div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-foreground font-mono tracking-tight">
                  TicketVault
                </h1>
                <p className="text-xs text-muted-foreground font-mono">
                  Secure • Fast • Trusted
                </p>
              </div>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems?.map((item) => {
              if (!canAccessItem(item)) return null;

              if (item?.submenu) {
                return (
                  <div key={item?.label} className="relative group">
                    <button className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-foreground hover:text-accent transition-colors duration-150 rounded-lg hover:bg-muted/50">
                      <Icon name={item?.icon} size={18} />
                      <span>{item?.label}</span>
                      <Icon name="ChevronDown" size={16} />
                    </button>
                    <div className="absolute top-full left-0 mt-1 w-48 bg-popover border-2 border-foreground shadow-neo rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      {item?.submenu?.map((subItem) => (
                        <button
                          key={subItem?.path}
                          onClick={() => handleNavigation(subItem?.path)}
                          className={`w-full flex items-center space-x-3 px-4 py-3 text-sm text-left hover:bg-accent/10 transition-colors duration-150 first:rounded-t-md last:rounded-b-md ${
                            isActivePath(subItem?.path) ? 'bg-accent/20 text-accent font-medium' : 'text-popover-foreground'
                          }`}
                        >
                          <Icon name={subItem?.icon} size={16} />
                          <span>{subItem?.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                );
              }

              return (
                <button
                  key={item?.path}
                  onClick={() => handleNavigation(item?.path)}
                  className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-150 ${
                    isActivePath(item?.path)
                      ? 'bg-accent text-accent-foreground shadow-neo-sm'
                      : 'text-foreground hover:text-accent hover:bg-muted/50'
                  }`}
                >
                  <Icon name={item?.icon} size={18} />
                  <span>{item?.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Auth & Mobile Menu */}
          <div className="flex items-center space-x-3">
            {/* Desktop Auth Button */}
            <div className="hidden md:block">
              <Button
                variant={user ? "outline" : "default"}
                size="sm"
                onClick={handleAuthAction}
                iconName={user ? "LogOut" : "LogIn"}
                iconPosition="left"
                className="font-medium"
              >
                {user ? 'Sign Out' : 'Sign In'}
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-foreground hover:text-accent transition-colors duration-150 rounded-lg hover:bg-muted/50"
              aria-label="Toggle mobile menu"
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
            </button>
          </div>
        </div>
      </header>
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="fixed top-16 right-0 bottom-0 w-80 bg-card border-l-2 border-foreground shadow-elevation-3 animate-slide-in">
            <div className="flex flex-col h-full">
              {/* Mobile Navigation */}
              <nav className="flex-1 px-4 py-6 space-y-2">
                {navigationItems?.map((item) => {
                  if (!canAccessItem(item)) return null;

                  if (item?.submenu) {
                    return (
                      <div key={item?.label} className="space-y-1">
                        <div className="flex items-center space-x-3 px-4 py-3 text-sm font-medium text-muted-foreground border-b border-border">
                          <Icon name={item?.icon} size={18} />
                          <span>{item?.label}</span>
                        </div>
                        {item?.submenu?.map((subItem) => (
                          <button
                            key={subItem?.path}
                            onClick={() => handleNavigation(subItem?.path)}
                            className={`w-full flex items-center space-x-3 px-8 py-3 text-sm text-left rounded-lg transition-all duration-150 ${
                              isActivePath(subItem?.path)
                                ? 'bg-accent text-accent-foreground shadow-neo-sm'
                                : 'text-foreground hover:bg-muted/50'
                            }`}
                          >
                            <Icon name={subItem?.icon} size={16} />
                            <span>{subItem?.label}</span>
                          </button>
                        ))}
                      </div>
                    );
                  }

                  return (
                    <button
                      key={item?.path}
                      onClick={() => handleNavigation(item?.path)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 text-sm text-left rounded-lg transition-all duration-150 ${
                        isActivePath(item?.path)
                          ? 'bg-accent text-accent-foreground shadow-neo-sm'
                          : 'text-foreground hover:bg-muted/50'
                      }`}
                    >
                      <Icon name={item?.icon} size={18} />
                      <span>{item?.label}</span>
                    </button>
                  );
                })}
              </nav>

              {/* Mobile Auth Section */}
              <div className="p-4 border-t border-border">
                <Button
                  variant={user ? "outline" : "default"}
                  fullWidth
                  onClick={handleAuthAction}
                  iconName={user ? "LogOut" : "LogIn"}
                  iconPosition="left"
                  className="font-medium"
                >
                  {user ? 'Sign Out' : 'Sign In'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;