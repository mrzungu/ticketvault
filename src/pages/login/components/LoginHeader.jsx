import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LoginHeader = ({ showBackButton = true }) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <div className="text-center space-y-6">
      {/* Back Button */}
      {showBackButton && (
        <div className="flex justify-start">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBackClick}
            iconName="ArrowLeft"
            iconPosition="left"
            className="text-muted-foreground hover:text-foreground"
          >
            Back
          </Button>
        </div>
      )}

      {/* Logo and Brand */}
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center shadow-neo group-hover:shadow-cyber transition-all duration-200">
            <Icon name="Ticket" size={32} color="var(--color-primary-foreground)" strokeWidth={2.5} />
          </div>
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full animate-pulse-glow"></div>
        </div>
        
        <div>
          <h1 className="text-2xl font-bold text-foreground font-mono tracking-tight">
            Welcome Back
          </h1>
          <p className="text-muted-foreground font-mono mt-1">
            Sign in to your TicketVault account
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4 py-4 border-y border-border">
        <div className="text-center">
          <div className="text-lg font-bold text-accent font-mono">50K+</div>
          <div className="text-xs text-muted-foreground">Active Users</div>
        </div>
        <div className="text-center border-x border-border">
          <div className="text-lg font-bold text-success font-mono">99.9%</div>
          <div className="text-xs text-muted-foreground">Uptime</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-warning font-mono">24/7</div>
          <div className="text-xs text-muted-foreground">Support</div>
        </div>
      </div>

      {/* Register Link */}
      <div className="flex items-center justify-center space-x-2 text-sm">
        <span className="text-muted-foreground">Don't have an account?</span>
        <Button
          variant="link"
          size="sm"
          onClick={handleRegisterClick}
          className="p-0 h-auto font-medium text-accent hover:text-accent/80"
        >
          Create Account
        </Button>
      </div>
    </div>
  );
};

export default LoginHeader;