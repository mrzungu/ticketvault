import React, { useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import LoginHeader from './components/LoginHeader';
import LoginForm from './components/LoginForm';
import SocialLoginOptions from './components/SocialLoginOptions';
import SecurityBadges from './components/SecurityBadges';

const LoginPage = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('ticketVaultUser');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        
        // Redirect based on role
        if (userData?.role === 'admin') {
          navigate('/admin-dashboard');
        } else if (userData?.role === 'staff') {
          navigate('/qr-code-scanner');
        } else {
          navigate('/event-details');
        }
      } catch (error) {
        localStorage.removeItem('ticketVaultUser');
      }
    }
  }, [navigate]);

  const handleLogin = (userData) => {
    setUser(userData);
    // Navigation is handled in LoginForm component
  };

  const handleSocialLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('ticketVaultUser', JSON.stringify(userData));
    navigate('/event-details');
  };

  if (user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-accent border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Redirecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Column - Login Form */}
          <div className="order-2 lg:order-1">
            <div className="bg-card border-2 border-border rounded-2xl shadow-elevation-3 p-8 lg:p-12">
              <LoginHeader showBackButton={false} />
              
              <div className="mt-8 space-y-8">
                <LoginForm onLogin={handleLogin} />
                <SocialLoginOptions onSocialLogin={handleSocialLogin} />
              </div>
            </div>
          </div>

          {/* Right Column - Security & Features */}
          <div className="order-1 lg:order-2 space-y-6">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground font-mono mb-4">
                Secure Event
                <span className="text-accent block">Ticketing</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Experience the future of event ticketing with advanced QR code technology, 
                fraud prevention, and seamless booking experiences.
              </p>
              
              {/* Feature Highlights */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-card border border-border rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-success font-mono">100%</div>
                  <div className="text-sm text-muted-foreground">Secure</div>
                </div>
                <div className="bg-card border border-border rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-accent font-mono">&lt;2s</div>
                  <div className="text-sm text-muted-foreground">Booking</div>
                </div>
              </div>
            </div>

            <SecurityBadges />

            {/* Additional Features */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-semibold text-foreground font-mono mb-4">
                Why Choose TicketVault?
              </h3>
              <div className="space-y-3">
                {[
                  'Anti-fraud QR code technology',
                  'Instant ticket delivery',
                  'Mobile-optimized experience',
                  'Real-time seat availability',
                  '24/7 customer support'
                ]?.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date()?.getFullYear()} TicketVault. All rights reserved. 
            <span className="mx-2">•</span>
            Powered by advanced security technology
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;