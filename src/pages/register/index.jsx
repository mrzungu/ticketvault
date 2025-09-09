import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import AuthenticationToggle from '../../components/ui/AuthenticationToggle';
import RegistrationForm from './components/RegistrationForm';
import SocialRegistration from './components/SocialRegistration';
import SecurityBadges from './components/SecurityBadges';
import RegistrationHeader from './components/RegistrationHeader';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const Register = () => {
  const navigate = useNavigate();
  const { register: registerUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [registrationStep, setRegistrationStep] = useState('form'); // 'form', 'verification', 'success'
  const [user, setUser] = useState(null);

  const handleRegistrationSubmit = async (payload) => {
    setIsLoading(true);
    try {
      await registerUser({ 
        fullName: payload.fullName, 
        email: payload.email, 
        password: payload.password, 
        phone: payload.phone 
      });
      setRegistrationStep('success');
    } catch (err) {
      alert(err?.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };


  // Mock user data for demonstration
  const mockUsers = [
    {
      email: "john.doe@example.com",
      password: "SecurePass123!",
      fullName: "John Doe",
      role: "user"
    },
    {
      email: "staff@ticketvault.com",
      password: "StaffPass456!",
      fullName: "Staff Member",
      role: "staff"
    }
  ];

  const handleRegistration = async (formData) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Check if email already exists
      const existingUser = mockUsers?.find(u => u?.email?.toLowerCase() === formData?.email?.toLowerCase());
      if (existingUser) {
        throw new Error('An account with this email already exists');
      }

      // Create new user
      const newUser = {
        id: Date.now(),
        fullName: formData?.fullName,
        email: formData?.email,
        phone: formData?.phone,
        role: 'user',
        marketingConsent: formData?.marketingConsent,
        createdAt: new Date()?.toISOString(),
        emailVerified: false
      };

      setUser(newUser);
      setRegistrationStep('verification');
      
    } catch (error) {
      console.error('Registration error:', error);
      alert(error?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialRegistration = async (providerId) => {
    setIsLoading(true);
    
    try {
      // Simulate social registration
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const socialUser = {
        id: Date.now(),
        fullName: `${providerId?.charAt(0)?.toUpperCase() + providerId?.slice(1)} User`,
        email: `user@${providerId}.com`,
        role: 'user',
        provider: providerId,
        createdAt: new Date()?.toISOString(),
        emailVerified: true
      };

      setUser(socialUser);
      setRegistrationStep('success');
      
    } catch (error) {
      console.error('Social registration error:', error);
      alert('Social registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailVerification = async () => {
    setIsLoading(true);
    
    try {
      // Simulate email verification
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setUser(prev => ({ ...prev, emailVerified: true }));
      setRegistrationStep('success');
      
    } catch (error) {
      console.error('Verification error:', error);
      alert('Verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendVerification = async () => {
    try {
      // Simulate resend verification email
      await new Promise(resolve => setTimeout(resolve, 500));
      alert('Verification email sent! Please check your inbox.');
    } catch (error) {
      console.error('Resend error:', error);
      alert('Failed to resend verification email.');
    }
  };

  const handleAuthToggle = (mode) => {
    if (mode === 'login') {
      navigate('/login');
    }
  };

  const handleContinueToApp = () => {
    // In a real app, this would set the user in global state/context
    navigate('/event-details');
  };

  const renderVerificationStep = () => (
    <div className="max-w-md mx-auto text-center space-y-6">
      <div className="w-16 h-16 bg-warning/20 rounded-full flex items-center justify-center mx-auto">
        <Icon name="Mail" size={32} className="text-warning" />
      </div>
      
      <div>
        <h2 className="text-2xl font-bold text-foreground font-mono mb-2">
          Verify Your Email
        </h2>
        <p className="text-muted-foreground">
          We've sent a verification link to <strong>{user?.email}</strong>. 
          Please check your email and click the link to activate your account.
        </p>
      </div>

      <div className="bg-muted/30 rounded-lg p-4 border border-border">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={16} className="text-accent mt-0.5" />
          <div className="text-left">
            <p className="text-sm font-medium text-foreground mb-1">
              Didn't receive the email?
            </p>
            <p className="text-xs text-muted-foreground">
              Check your spam folder or click below to resend the verification email.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <Button
          variant="default"
          onClick={handleEmailVerification}
          loading={isLoading}
          iconName="CheckCircle"
          iconPosition="left"
          fullWidth
        >
          I've Verified My Email
        </Button>
        
        <Button
          variant="outline"
          onClick={handleResendVerification}
          iconName="RefreshCw"
          iconPosition="left"
          fullWidth
        >
          Resend Verification Email
        </Button>
      </div>

      <button
        onClick={() => navigate('/login')}
        className="text-sm text-muted-foreground hover:text-accent transition-colors duration-150 underline underline-offset-2"
      >
        Back to Login
      </button>
    </div>
  );

  const renderSuccessStep = () => (
    <div className="max-w-md mx-auto text-center space-y-6">
      <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto animate-pulse-glow">
        <Icon name="CheckCircle" size={32} className="text-success" />
      </div>
      
      <div>
        <h2 className="text-2xl font-bold text-foreground font-mono mb-2">
          Welcome to TicketVault!
        </h2>
        <p className="text-muted-foreground">
          Your account has been successfully created. You can now start booking tickets for amazing events.
        </p>
      </div>

      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
            <Icon name="User" size={20} className="text-accent" />
          </div>
          <div className="text-left">
            <p className="font-medium text-foreground">{user?.fullName}</p>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
            <div className="flex items-center space-x-2 mt-1">
              <Icon name="CheckCircle" size={12} className="text-success" />
              <span className="text-xs text-success">Email Verified</span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <Button
          variant="default"
          onClick={handleContinueToApp}
          iconName="ArrowRight"
          iconPosition="right"
          fullWidth
          className="shadow-cyber"
        >
          Start Booking Events
        </Button>
        
        <Button
          variant="outline"
          onClick={() => navigate('/login')}
          iconName="LogIn"
          iconPosition="left"
          fullWidth
        >
          Sign In Instead
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} onAuthToggle={setUser} />
      <main className="pt-16">
        <div className="container mx-auto px-4 py-8 lg:py-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              
              {/* Left Column - Header & Security */}
              <div className="space-y-8">
                <RegistrationHeader />
                <SecurityBadges className="hidden lg:block" />
              </div>

              {/* Right Column - Registration Form */}
              <div className="space-y-6">
                <div className="bg-card border-2 border-border rounded-lg shadow-elevation-2 p-6 lg:p-8">
                  
                  {registrationStep === 'form' && (
                    <>
                      {/* Auth Toggle */}
                      <div className="mb-8">
                        <AuthenticationToggle
                          mode="register"
                          onModeChange={handleAuthToggle}
                          showLabels={true}
                        />
                      </div>

                      {/* Registration Form */}
                      <RegistrationForm
                        onSubmit={handleRegistration}
                        isLoading={isLoading}
                      />

                      {/* Social Registration */}
                      <div className="mt-8">
                        <SocialRegistration
                          onSocialRegister={handleSocialRegistration}
                          isLoading={isLoading}
                        />
                      </div>

                      {/* Login Link */}
                      <div className="mt-6 text-center">
                        <p className="text-sm text-muted-foreground">
                          Already have an account?{' '}
                          <button
                            onClick={() => navigate('/login')}
                            className="text-accent hover:text-accent/80 font-medium underline underline-offset-2 transition-colors duration-150"
                          >
                            Sign in here
                          </button>
                        </p>
                      </div>
                    </>
                  )}

                  {registrationStep === 'verification' && renderVerificationStep()}
                  {registrationStep === 'success' && renderSuccessStep()}
                </div>

                {/* Mobile Security Badges */}
                <SecurityBadges className="lg:hidden" />
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="bg-card border-t-2 border-border py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Ticket" size={20} color="var(--color-primary-foreground)" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground font-mono">TicketVault</p>
                <p className="text-xs text-muted-foreground">Secure • Fast • Trusted</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-6 text-xs text-muted-foreground">
              <button className="hover:text-accent transition-colors duration-150">
                Terms of Service
              </button>
              <button className="hover:text-accent transition-colors duration-150">
                Privacy Policy
              </button>
              <button className="hover:text-accent transition-colors duration-150">
                Support
              </button>
            </div>
            
            <p className="text-xs text-muted-foreground font-mono">
              © {new Date()?.getFullYear()} TicketVault. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Register;