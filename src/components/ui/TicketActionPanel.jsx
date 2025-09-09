import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const TicketActionPanel = ({ 
  ticket = null,
  booking = null,
  onDownloadPDF = () => {},
  onEmailTicket = () => {},
  onAddToWallet = () => {},
  onTransferTicket = () => {},
  onCancelTicket = () => {},
  onViewDetails = () => {},
  className = '',
  showTransfer = true,
  showCancel = true,
  allowMultipleActions = true
}) => {
  const [isLoading, setIsLoading] = useState({});
  const [expandedSection, setExpandedSection] = useState(null);

  const handleAction = async (actionKey, actionFn, ...args) => {
    setIsLoading(prev => ({ ...prev, [actionKey]: true }));
    try {
      await actionFn(...args);
    } catch (error) {
      console.error(`Error executing ${actionKey}:`, error);
    } finally {
      setIsLoading(prev => ({ ...prev, [actionKey]: false }));
    }
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const primaryActions = [
    {
      key: 'download',
      label: 'Download PDF',
      icon: 'Download',
      description: 'Save ticket as PDF file',
      action: () => handleAction('download', onDownloadPDF, ticket),
      variant: 'default',
      priority: 1
    },
    {
      key: 'email',
      label: 'Email Ticket',
      icon: 'Mail',
      description: 'Send ticket to email address',
      action: () => handleAction('email', onEmailTicket, ticket),
      variant: 'outline',
      priority: 2
    },
    {
      key: 'wallet',
      label: 'Add to Wallet',
      icon: 'Wallet',
      description: 'Save to Apple/Google Wallet',
      action: () => handleAction('wallet', onAddToWallet, ticket),
      variant: 'outline',
      priority: 3
    }
  ];

  const secondaryActions = [
    ...(showTransfer ? [{
      key: 'transfer',
      label: 'Transfer Ticket',
      icon: 'Send',
      description: 'Transfer to another person',
      action: () => handleAction('transfer', onTransferTicket, ticket),
      variant: 'outline',
      priority: 4
    }] : []),
    {
      key: 'details',
      label: 'View Details',
      icon: 'Eye',
      description: 'View full ticket information',
      action: () => handleAction('details', onViewDetails, ticket),
      variant: 'ghost',
      priority: 5
    }
  ];

  const dangerActions = showCancel ? [
    {
      key: 'cancel',
      label: 'Cancel Ticket',
      icon: 'X',
      description: 'Cancel and request refund',
      action: () => handleAction('cancel', onCancelTicket, ticket),
      variant: 'destructive',
      priority: 6
    }
  ] : [];

  const getTicketStatus = () => {
    if (!ticket) return 'unknown';
    return ticket?.status || 'active';
  };

  const isTicketActive = () => {
    const status = getTicketStatus();
    return ['active', 'confirmed', 'valid']?.includes(status);
  };

  if (!ticket && !booking) {
    return (
      <div className={`bg-muted/30 border-2 border-dashed border-border rounded-lg p-8 text-center ${className}`}>
        <Icon name="Ticket" size={48} className="text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground">No ticket information available</p>
      </div>
    );
  }

  return (
    <div className={`bg-card border-2 border-border rounded-lg shadow-elevation-2 ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground font-mono">
              Ticket Actions
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Manage your ticket and booking
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`px-3 py-1 rounded-full text-xs font-medium font-mono ${
              isTicketActive() 
                ? 'bg-success/20 text-success border border-success/30' :'bg-warning/20 text-warning border border-warning/30'
            }`}>
              {getTicketStatus()?.toUpperCase()}
            </div>
          </div>
        </div>
      </div>
      {/* Primary Actions */}
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {primaryActions?.map((action) => (
            <Button
              key={action?.key}
              variant={action?.variant}
              onClick={action?.action}
              loading={isLoading?.[action?.key]}
              disabled={!isTicketActive() && action?.key !== 'details'}
              iconName={action?.icon}
              iconPosition="left"
              className="h-auto p-4 flex-col space-y-2"
              fullWidth
            >
              <span className="font-medium">{action?.label}</span>
              <span className="text-xs opacity-75">{action?.description}</span>
            </Button>
          ))}
        </div>

        {/* Quick Actions Row */}
        <div className="flex flex-wrap gap-2 mb-6">
          {secondaryActions?.map((action) => (
            <Button
              key={action?.key}
              variant={action?.variant}
              size="sm"
              onClick={action?.action}
              loading={isLoading?.[action?.key]}
              disabled={!isTicketActive() && action?.key !== 'details'}
              iconName={action?.icon}
              iconPosition="left"
            >
              {action?.label}
            </Button>
          ))}
        </div>

        {/* Expandable Sections */}
        <div className="space-y-3">
          {/* Sharing Options */}
          <div className="border border-border rounded-lg">
            <button
              onClick={() => toggleSection('sharing')}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors duration-150"
            >
              <div className="flex items-center space-x-3">
                <Icon name="Share2" size={20} className="text-muted-foreground" />
                <div>
                  <p className="font-medium text-foreground">Sharing Options</p>
                  <p className="text-sm text-muted-foreground">Share via social media or messaging</p>
                </div>
              </div>
              <Icon 
                name={expandedSection === 'sharing' ? 'ChevronUp' : 'ChevronDown'} 
                size={20} 
                className="text-muted-foreground" 
              />
            </button>
            
            {expandedSection === 'sharing' && (
              <div className="px-4 pb-4 border-t border-border">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4">
                  {[
                    { name: 'WhatsApp', icon: 'MessageCircle', color: 'text-green-600' },
                    { name: 'Twitter', icon: 'Twitter', color: 'text-blue-400' },
                    { name: 'Facebook', icon: 'Facebook', color: 'text-blue-600' },
                    { name: 'Copy Link', icon: 'Copy', color: 'text-muted-foreground' }
                  ]?.map((platform) => (
                    <button
                      key={platform?.name}
                      className="flex items-center space-x-2 p-2 rounded-lg hover:bg-muted/50 transition-colors duration-150"
                    >
                      <Icon name={platform?.icon} size={16} className={platform?.color} />
                      <span className="text-sm">{platform?.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Ticket Information */}
          <div className="border border-border rounded-lg">
            <button
              onClick={() => toggleSection('info')}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors duration-150"
            >
              <div className="flex items-center space-x-3">
                <Icon name="Info" size={20} className="text-muted-foreground" />
                <div>
                  <p className="font-medium text-foreground">Ticket Information</p>
                  <p className="text-sm text-muted-foreground">View booking details and terms</p>
                </div>
              </div>
              <Icon 
                name={expandedSection === 'info' ? 'ChevronUp' : 'ChevronDown'} 
                size={20} 
                className="text-muted-foreground" 
              />
            </button>
            
            {expandedSection === 'info' && (
              <div className="px-4 pb-4 border-t border-border">
                <div className="mt-4 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Booking ID:</span>
                    <span className="font-mono text-foreground">{booking?.id || ticket?.bookingId || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Purchase Date:</span>
                    <span className="text-foreground">{booking?.purchaseDate || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Valid Until:</span>
                    <span className="text-foreground">{ticket?.validUntil || 'Event Date'}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Danger Zone */}
        {dangerActions?.length > 0 && (
          <div className="mt-6 pt-6 border-t border-destructive/20">
            <div className="flex items-center space-x-2 mb-4">
              <Icon name="AlertTriangle" size={20} className="text-destructive" />
              <h4 className="font-medium text-destructive">Danger Zone</h4>
            </div>
            <div className="space-y-2">
              {dangerActions?.map((action) => (
                <Button
                  key={action?.key}
                  variant={action?.variant}
                  size="sm"
                  onClick={action?.action}
                  loading={isLoading?.[action?.key]}
                  disabled={!isTicketActive()}
                  iconName={action?.icon}
                  iconPosition="left"
                  className="w-full sm:w-auto"
                >
                  {action?.label}
                </Button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Cancellation may be subject to terms and conditions. Refunds are processed according to the event policy.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketActionPanel;