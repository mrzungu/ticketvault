import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityBadges = ({ className = '' }) => {
  const securityFeatures = [
    {
      icon: 'Shield',
      title: 'SSL Encrypted',
      description: '256-bit encryption'
    },
    {
      icon: 'Lock',
      title: 'Secure Login',
      description: 'Protected access'
    },
    {
      icon: 'CheckCircle',
      title: 'Verified Platform',
      description: 'Trusted by thousands'
    }
  ];

  const trustBadges = [
    {
      name: 'SSL Certificate',
      icon: 'Shield',
      color: 'text-success'
    },
    {
      name: 'Secure Payment',
      icon: 'CreditCard',
      color: 'text-accent'
    },
    {
      name: 'Data Protection',
      icon: 'Lock',
      color: 'text-warning'
    }
  ];

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Security Features */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Shield" size={20} className="text-success" />
          <h3 className="font-semibold text-foreground font-mono">
            Secure Access
          </h3>
        </div>
        
        <div className="grid grid-cols-1 gap-3">
          {securityFeatures?.map((feature, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-success/20 rounded-full flex items-center justify-center">
                <Icon name={feature?.icon} size={16} className="text-success" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  {feature?.title}
                </p>
                <p className="text-xs text-muted-foreground">
                  {feature?.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Trust Badges */}
      <div className="flex justify-center space-x-4">
        {trustBadges?.map((badge, index) => (
          <div
            key={index}
            className="flex flex-col items-center space-y-1 p-2 rounded-lg hover:bg-muted/50 transition-colors duration-150"
          >
            <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
              <Icon name={badge?.icon} size={20} className={badge?.color} />
            </div>
            <span className="text-xs text-muted-foreground font-mono text-center">
              {badge?.name}
            </span>
          </div>
        ))}
      </div>
      {/* Security Notice */}
      <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} className="text-accent mt-0.5" />
          <div>
            <p className="text-sm font-medium text-accent mb-1">
              Your Security Matters
            </p>
            <p className="text-xs text-muted-foreground">
              All login attempts are monitored and encrypted. We never store your passwords in plain text and use industry-standard security measures to protect your account.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityBadges;