import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityBadges = ({ className = '' }) => {
  const securityFeatures = [
    {
      id: 'ssl',
      icon: 'Shield',
      title: 'SSL Encrypted',
      description: '256-bit encryption protects your data',
      color: 'text-success'
    },
    {
      id: 'gdpr',
      icon: 'Lock',
      title: 'GDPR Compliant',
      description: 'Your privacy rights are protected',
      color: 'text-accent'
    },
    {
      id: 'secure',
      icon: 'CheckCircle',
      title: 'Secure Storage',
      description: 'Bank-level security standards',
      color: 'text-success'
    }
  ];

  const trustSignals = [
    {
      name: 'Norton Secured',
      icon: 'Shield',
      verified: true
    },
    {
      name: 'SSL Certificate',
      icon: 'Lock',
      verified: true
    },
    {
      name: 'Privacy Protected',
      icon: 'Eye',
      verified: true
    }
  ];

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Security Features */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="ShieldCheck" size={20} className="text-success" />
          <h3 className="text-sm font-semibold text-foreground font-mono">
            Your Security Matters
          </h3>
        </div>
        
        <div className="space-y-4">
          {securityFeatures?.map((feature) => (
            <div key={feature?.id} className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name={feature?.icon} size={16} className={feature?.color} />
              </div>
              <div>
                <h4 className="text-sm font-medium text-foreground">
                  {feature?.title}
                </h4>
                <p className="text-xs text-muted-foreground mt-1">
                  {feature?.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Trust Signals */}
      <div className="bg-muted/30 rounded-lg p-4 border border-border">
        <h4 className="text-xs font-medium text-foreground mb-3 font-mono uppercase tracking-wide">
          Trusted & Verified
        </h4>
        
        <div className="grid grid-cols-3 gap-3">
          {trustSignals?.map((signal, index) => (
            <div key={index} className="text-center">
              <div className="w-10 h-10 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <Icon name={signal?.icon} size={16} className="text-success" />
              </div>
              <p className="text-xs text-muted-foreground font-medium">
                {signal?.name}
              </p>
              {signal?.verified && (
                <div className="flex items-center justify-center mt-1">
                  <Icon name="Check" size={12} className="text-success" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Data Protection Notice */}
      <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={16} className="text-accent mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="text-sm font-medium text-accent mb-1">
              Data Protection
            </h4>
            <p className="text-xs text-muted-foreground">
              We use industry-standard encryption and never store sensitive payment information. Your personal data is processed according to our Privacy Policy and applicable data protection laws.
            </p>
          </div>
        </div>
      </div>
      {/* Security Certifications */}
      <div className="flex items-center justify-center space-x-6 py-4">
        <div className="flex items-center space-x-2 text-muted-foreground">
          <Icon name="Award" size={16} />
          <span className="text-xs font-mono">ISO 27001</span>
        </div>
        <div className="flex items-center space-x-2 text-muted-foreground">
          <Icon name="Shield" size={16} />
          <span className="text-xs font-mono">SOC 2</span>
        </div>
        <div className="flex items-center space-x-2 text-muted-foreground">
          <Icon name="CheckCircle" size={16} />
          <span className="text-xs font-mono">PCI DSS</span>
        </div>
      </div>
    </div>
  );
};

export default SecurityBadges;