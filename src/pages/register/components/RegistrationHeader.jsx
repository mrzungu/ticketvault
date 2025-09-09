import React from 'react';
import Icon from '../../../components/AppIcon';

const RegistrationHeader = ({ className = '' }) => {
  const benefits = [
    {
      icon: 'Ticket',
      text: 'Instant ticket access'
    },
    {
      icon: 'Bell',
      text: 'Event notifications'
    },
    {
      icon: 'History',
      text: 'Booking history'
    },
    {
      icon: 'Shield',
      text: 'Secure payments'
    }
  ];

  return (
    <div className={`text-center space-y-6 ${className}`}>
      {/* Main Header */}
      <div className="space-y-4">
        <div className="relative inline-block">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-elevation-2 mx-auto">
            <Icon name="UserPlus" size={32} color="var(--color-primary-foreground)" strokeWidth={2} />
          </div>
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-accent rounded-full flex items-center justify-center animate-pulse-glow">
            <Icon name="Sparkles" size={12} className="text-accent-foreground" />
          </div>
        </div>
        
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground font-mono mb-2">
            Join TicketVault
          </h1>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            Create your account and unlock seamless event booking with secure digital tickets
          </p>
        </div>
      </div>
      {/* Benefits Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-2xl mx-auto">
        {benefits?.map((benefit, index) => (
          <div 
            key={index}
            className="flex flex-col items-center space-y-2 p-4 bg-card border border-border rounded-lg hover:shadow-elevation-1 transition-all duration-200 group"
          >
            <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center group-hover:bg-accent/30 transition-colors duration-200">
              <Icon name={benefit?.icon} size={20} className="text-accent" />
            </div>
            <p className="text-xs text-muted-foreground font-medium text-center">
              {benefit?.text}
            </p>
          </div>
        ))}
      </div>
      {/* Registration Stats */}
      <div className="bg-muted/30 rounded-lg p-4 border border-border">
        <div className="flex items-center justify-center space-x-8">
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground font-mono">50K+</p>
            <p className="text-xs text-muted-foreground">Active Users</p>
          </div>
          <div className="w-px h-8 bg-border"></div>
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground font-mono">1M+</p>
            <p className="text-xs text-muted-foreground">Tickets Sold</p>
          </div>
          <div className="w-px h-8 bg-border"></div>
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground font-mono">99.9%</p>
            <p className="text-xs text-muted-foreground">Uptime</p>
          </div>
        </div>
      </div>
      {/* Quick Start Notice */}
      <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
        <div className="flex items-center justify-center space-x-3">
          <Icon name="Clock" size={16} className="text-accent" />
          <p className="text-sm text-accent font-medium">
            Account setup takes less than 2 minutes
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationHeader;