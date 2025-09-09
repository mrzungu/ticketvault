import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SocialRegistration = ({ onSocialRegister = () => {}, isLoading = false }) => {
  const socialProviders = [
    {
      id: 'google',
      name: 'Google',
      icon: 'Chrome',
      color: 'hover:bg-red-50 hover:border-red-200',
      textColor: 'text-red-600'
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: 'Facebook',
      color: 'hover:bg-blue-50 hover:border-blue-200',
      textColor: 'text-blue-600'
    },
    {
      id: 'apple',
      name: 'Apple',
      icon: 'Apple',
      color: 'hover:bg-gray-50 hover:border-gray-200',
      textColor: 'text-gray-900'
    }
  ];

  const handleSocialClick = (providerId) => {
    onSocialRegister(providerId);
  };

  return (
    <div className="space-y-4">
      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-background text-muted-foreground font-mono">
            Or continue with
          </span>
        </div>
      </div>
      {/* Social Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {socialProviders?.map((provider) => (
          <Button
            key={provider?.id}
            variant="outline"
            onClick={() => handleSocialClick(provider?.id)}
            disabled={isLoading}
            className={`transition-all duration-200 ${provider?.color} group`}
          >
            <div className="flex items-center space-x-2">
              <Icon 
                name={provider?.icon} 
                size={18} 
                className={`${provider?.textColor} group-hover:scale-110 transition-transform duration-200`} 
              />
              <span className="hidden sm:inline font-medium">
                {provider?.name}
              </span>
            </div>
          </Button>
        ))}
      </div>
      {/* Social Registration Benefits */}
      <div className="bg-muted/30 rounded-lg p-4 border border-border">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
            <Icon name="Zap" size={16} className="text-accent" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-foreground mb-1">
              Quick Registration
            </h4>
            <p className="text-xs text-muted-foreground">
              Sign up instantly using your existing social media accounts. Your information is securely imported and protected.
            </p>
          </div>
        </div>
      </div>
      {/* Security Notice */}
      <div className="text-center">
        <p className="text-xs text-muted-foreground">
          By registering, you agree that we may contact you about TicketVault services and events.
        </p>
      </div>
    </div>
  );
};

export default SocialRegistration;