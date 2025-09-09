import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SocialLoginOptions = ({ onSocialLogin = () => {} }) => {
  const [loadingProvider, setLoadingProvider] = useState(null);

  const socialProviders = [
    {
      id: 'google',
      name: 'Google',
      icon: 'Chrome',
      color: 'text-red-500',
      bgColor: 'hover:bg-red-50'
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: 'Facebook',
      color: 'text-blue-600',
      bgColor: 'hover:bg-blue-50'
    },
    {
      id: 'apple',
      name: 'Apple',
      icon: 'Apple',
      color: 'text-gray-900',
      bgColor: 'hover:bg-gray-50'
    }
  ];

  const handleSocialLogin = async (provider) => {
    setLoadingProvider(provider?.id);
    
    try {
      // Simulate social login process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful social login
      const mockUser = {
        id: Math.random()?.toString(36)?.substr(2, 9),
        email: `user@${provider?.id}.com`,
        name: `${provider?.name} User`,
        role: 'user',
        provider: provider?.id,
        loginTime: new Date()?.toISOString()
      };

      onSocialLogin(mockUser);
    } catch (error) {
      console.error(`${provider?.name} login failed:`, error);
    } finally {
      setLoadingProvider(null);
    }
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
      {/* Social Login Buttons */}
      <div className="grid grid-cols-1 gap-3">
        {socialProviders?.map((provider) => (
          <Button
            key={provider?.id}
            variant="outline"
            onClick={() => handleSocialLogin(provider)}
            loading={loadingProvider === provider?.id}
            disabled={loadingProvider !== null}
            className={`h-12 justify-center space-x-3 ${provider?.bgColor} transition-all duration-200`}
            fullWidth
          >
            <Icon 
              name={provider?.icon} 
              size={20} 
              className={provider?.color} 
            />
            <span className="font-medium">
              Continue with {provider?.name}
            </span>
          </Button>
        ))}
      </div>
      {/* Security Notice */}
      <div className="text-center">
        <p className="text-xs text-muted-foreground">
          By signing in, you agree to our{' '}
          <button className="text-accent hover:text-accent/80 underline underline-offset-2">
            Terms of Service
          </button>{' '}
          and{' '}
          <button className="text-accent hover:text-accent/80 underline underline-offset-2">
            Privacy Policy
          </button>
        </p>
      </div>
    </div>
  );
};

export default SocialLoginOptions;