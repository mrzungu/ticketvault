import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NextSteps = ({ bookingData, onManageBooking, onContactSupport }) => {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: 'Manage Bookings',
      description: 'View all your tickets and bookings',
      icon: 'Settings',
      action: () => onManageBooking?.(bookingData),
      variant: 'default'
    },
    {
      title: 'Browse More Events',
      description: 'Discover other exciting events',
      icon: 'Search',
      action: () => navigate('/event-details'),
      variant: 'outline'
    },
    {
      title: 'Transfer Tickets',
      description: 'Send tickets to friends or family',
      icon: 'Send',
      action: () => console.log('Transfer tickets'),
      variant: 'outline'
    },
    {
      title: 'Get Support',
      description: 'Need help? Contact our support team',
      icon: 'HelpCircle',
      action: () => onContactSupport?.(bookingData),
      variant: 'ghost'
    }
  ];

  const upcomingReminders = [
    {
      title: 'Event Reminder',
      description: 'We\'ll send you a reminder 24 hours before the event',
      icon: 'Bell',
      time: '1 day before',
      status: 'scheduled'
    },
    {
      title: 'Check-in Opens',
      description: 'Mobile check-in will be available 2 hours before event',
      icon: 'Smartphone',
      time: '2 hours before',
      status: 'scheduled'
    },
    {
      title: 'Event Starts',
      description: 'Doors open 30 minutes before showtime',
      icon: 'Clock',
      time: bookingData?.eventTime,
      status: 'upcoming'
    }
  ];

  return (
    <div className="bg-card border-2 border-border rounded-lg shadow-elevation-2 p-6 mb-6">
      <h2 className="text-xl font-semibold text-foreground font-mono mb-6 flex items-center">
        <Icon name="ArrowRight" size={24} className="text-accent mr-2" />
        What's Next?
      </h2>
      <div className="space-y-6">
        {/* Quick Actions */}
        <div>
          <h3 className="font-medium text-foreground mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {quickActions?.map((action, index) => (
              <button
                key={index}
                onClick={action?.action}
                className="flex items-start space-x-4 p-4 bg-muted/30 hover:bg-muted/50 border border-border rounded-lg transition-all duration-150 hover:scale-[1.02] text-left"
              >
                <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center shrink-0">
                  <Icon name={action?.icon} size={20} className="text-accent" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-foreground mb-1">{action?.title}</h4>
                  <p className="text-sm text-muted-foreground">{action?.description}</p>
                </div>
                <Icon name="ChevronRight" size={16} className="text-muted-foreground mt-3" />
              </button>
            ))}
          </div>
        </div>

        {/* Upcoming Reminders */}
        <div>
          <h3 className="font-medium text-foreground mb-4">Upcoming Reminders</h3>
          <div className="space-y-3">
            {upcomingReminders?.map((reminder, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 bg-muted/30 border border-border rounded-lg">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  reminder?.status === 'scheduled' ? 'bg-warning/20' : 'bg-accent/20'
                }`}>
                  <Icon 
                    name={reminder?.icon} 
                    size={18} 
                    className={reminder?.status === 'scheduled' ? 'text-warning' : 'text-accent'} 
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-foreground">{reminder?.title}</h4>
                    <span className="text-sm text-muted-foreground font-mono">{reminder?.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{reminder?.description}</p>
                </div>
                <div className={`w-2 h-2 rounded-full ${
                  reminder?.status === 'scheduled' ? 'bg-warning' : 'bg-accent'
                } animate-pulse`}></div>
              </div>
            ))}
          </div>
        </div>

        {/* Important Notes */}
        <div className="bg-gradient-to-r from-warning/10 to-accent/10 border border-warning/20 rounded-lg p-4">
          <h3 className="font-medium text-foreground mb-3 flex items-center">
            <Icon name="AlertCircle" size={18} className="text-warning mr-2" />
            Important Notes
          </h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-start space-x-2">
              <Icon name="Smartphone" size={14} className="text-accent mt-0.5" />
              <p>Keep your phone charged - you'll need it to display your digital tickets</p>
            </div>
            <div className="flex items-start space-x-2">
              <Icon name="CreditCard" size={14} className="text-accent mt-0.5" />
              <p>Bring the credit card used for purchase and a valid photo ID</p>
            </div>
            <div className="flex items-start space-x-2">
              <Icon name="Clock" size={14} className="text-accent mt-0.5" />
              <p>Arrive early to allow time for parking and security screening</p>
            </div>
            <div className="flex items-start space-x-2">
              <Icon name="Mail" size={14} className="text-accent mt-0.5" />
              <p>Check your email for any event updates or changes</p>
            </div>
          </div>
        </div>

        {/* Support Contact */}
        <div className="bg-muted/30 border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-foreground mb-1">Need Help?</h3>
              <p className="text-sm text-muted-foreground">
                Our support team is available 24/7 to assist you
              </p>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onContactSupport?.(bookingData)}
                iconName="MessageCircle"
                iconPosition="left"
              >
                Chat
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.location.href = 'tel:+1-800-TICKETS'}
                iconName="Phone"
                iconPosition="left"
              >
                Call
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation Actions */}
        <div className="pt-4 border-t border-border">
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="default"
              onClick={() => navigate('/event-details')}
              iconName="Search"
              iconPosition="left"
              fullWidth
              className="sm:flex-1"
            >
              Browse More Events
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/admin-dashboard')}
              iconName="BarChart3"
              iconPosition="left"
              fullWidth
              className="sm:flex-1"
            >
              My Dashboard
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NextSteps;