import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TicketSelectionPanel = ({ event = {}, onBookingUpdate = () => {} }) => {
  const navigate = useNavigate();
  const [selectedTickets, setSelectedTickets] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const defaultTicketTypes = [
    {
      id: 'general',
      name: 'General Admission',
      price: 89.99,
      originalPrice: 99.99,
      available: 245,
      total: 500,
      description: 'Standard event access with general seating',
      features: ['Event Access', 'Welcome Drink', 'Networking Session', 'Digital Materials'],
      maxPerOrder: 8,
      category: 'standard'
    },
    {
      id: 'vip',
      name: 'VIP Experience',
      price: 199.99,
      originalPrice: 249.99,
      available: 48,
      total: 100,
      description: 'Premium experience with exclusive benefits',
      features: ['Priority Seating', 'VIP Lounge Access', 'Meet & Greet', 'Premium Catering', 'Exclusive Swag Bag', 'Valet Parking'],
      maxPerOrder: 4,
      category: 'premium',
      popular: true
    },
    {
      id: 'early-bird',
      name: 'Early Bird Special',
      price: 69.99,
      originalPrice: 89.99,
      available: 12,
      total: 50,
      description: 'Limited time early bird pricing',
      features: ['Event Access', 'Early Entry', 'Welcome Drink', 'Reserved Seating'],
      maxPerOrder: 6,
      category: 'special',
      limited: true
    }
  ];

  const ticketTypes = event?.ticketTypes || defaultTicketTypes;

  useEffect(() => {
    const total = Object.entries(selectedTickets)?.reduce((sum, [ticketId, quantity]) => {
      const ticket = ticketTypes?.find(t => t?.id === ticketId);
      return sum + (ticket ? ticket?.price * quantity : 0);
    }, 0);
    setTotalAmount(total);
    onBookingUpdate({ selectedTickets, totalAmount: total });
  }, [selectedTickets, ticketTypes, onBookingUpdate]);

  const updateTicketQuantity = (ticketId, change) => {
    const ticket = ticketTypes?.find(t => t?.id === ticketId);
    if (!ticket) return;

    setSelectedTickets(prev => {
      const currentQuantity = prev?.[ticketId] || 0;
      const newQuantity = Math.max(0, Math.min(currentQuantity + change, Math.min(ticket?.available, ticket?.maxPerOrder)));
      
      if (newQuantity === 0) {
        const { [ticketId]: removed, ...rest } = prev;
        return rest;
      }
      
      return { ...prev, [ticketId]: newQuantity };
    });
  };

  const getTotalSelectedTickets = () => {
    return Object.values(selectedTickets)?.reduce((sum, quantity) => sum + quantity, 0);
  };

  const getAvailabilityStatus = (ticket) => {
    const percentage = (ticket?.available / ticket?.total) * 100;
    if (percentage <= 10) return { status: 'critical', color: 'text-destructive', bg: 'bg-destructive/10' };
    if (percentage <= 25) return { status: 'low', color: 'text-warning', bg: 'bg-warning/10' };
    return { status: 'good', color: 'text-success', bg: 'bg-success/10' };
  };

  const handleProceedToCheckout = async () => {
    if (getTotalSelectedTickets() === 0) return;
    
    setIsLoading(true);
    
    // Simulate booking process
    setTimeout(() => {
      navigate('/booking-confirmation', {
        state: {
          event,
          selectedTickets,
          totalAmount,
          bookingId: `TKT-${Date.now()}`
        }
      });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="bg-card border-2 border-border rounded-lg shadow-elevation-2 sticky top-24">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-semibold text-foreground font-mono">Select Tickets</h3>
          <div className="flex items-center space-x-2">
            <Icon name="Shield" size={16} className="text-success" />
            <span className="text-sm text-success font-medium">Secure Booking</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">Choose your ticket type and quantity</p>
      </div>
      {/* Ticket Types */}
      <div className="p-6 space-y-4">
        {ticketTypes?.map((ticket) => {
          const availability = getAvailabilityStatus(ticket);
          const selectedQuantity = selectedTickets?.[ticket?.id] || 0;
          const isSelected = selectedQuantity > 0;

          return (
            <div
              key={ticket?.id}
              className={`relative border-2 rounded-lg p-4 transition-all duration-200 ${
                isSelected 
                  ? 'border-accent bg-accent/5 shadow-cyber' 
                  : 'border-border hover:border-accent/50'
              }`}
            >
              {/* Ticket Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-semibold text-foreground">{ticket?.name}</h4>
                    {ticket?.popular && (
                      <span className="px-2 py-1 bg-accent text-accent-foreground text-xs rounded-full font-medium">
                        POPULAR
                      </span>
                    )}
                    {ticket?.limited && (
                      <span className="px-2 py-1 bg-warning text-warning-foreground text-xs rounded-full font-medium">
                        LIMITED
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{ticket?.description}</p>
                  
                  {/* Price */}
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-foreground">${ticket?.price}</span>
                    {ticket?.originalPrice > ticket?.price && (
                      <span className="text-sm text-muted-foreground line-through">${ticket?.originalPrice}</span>
                    )}
                    {ticket?.originalPrice > ticket?.price && (
                      <span className="text-sm text-success font-medium">
                        Save ${(ticket?.originalPrice - ticket?.price)?.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateTicketQuantity(ticket?.id, -1)}
                    disabled={selectedQuantity === 0}
                    className="w-8 h-8 rounded-full border-2 border-border flex items-center justify-center hover:border-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
                  >
                    <Icon name="Minus" size={16} />
                  </button>
                  <span className="w-8 text-center font-medium text-foreground">{selectedQuantity}</span>
                  <button
                    onClick={() => updateTicketQuantity(ticket?.id, 1)}
                    disabled={selectedQuantity >= Math.min(ticket?.available, ticket?.maxPerOrder)}
                    className="w-8 h-8 rounded-full border-2 border-border flex items-center justify-center hover:border-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
                  >
                    <Icon name="Plus" size={16} />
                  </button>
                </div>
              </div>
              {/* Availability */}
              <div className={`flex items-center justify-between p-2 rounded-lg ${availability?.bg} mb-3`}>
                <div className="flex items-center space-x-2">
                  <Icon name="Users" size={16} className={availability?.color} />
                  <span className={`text-sm font-medium ${availability?.color}`}>
                    {ticket?.available} of {ticket?.total} available
                  </span>
                </div>
                <div className="w-24 h-2 bg-border rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-300 ${
                      availability?.status === 'critical' ? 'bg-destructive' :
                      availability?.status === 'low' ? 'bg-warning' : 'bg-success'
                    }`}
                    style={{ width: `${(ticket?.available / ticket?.total) * 100}%` }}
                  ></div>
                </div>
              </div>
              {/* Features */}
              <div className="grid grid-cols-2 gap-2">
                {ticket?.features?.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Icon name="Check" size={14} className="text-success" />
                    <span className="text-xs text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>
              {/* Max per order notice */}
              <div className="mt-3 text-xs text-muted-foreground">
                Maximum {ticket?.maxPerOrder} tickets per order
              </div>
            </div>
          );
        })}
      </div>
      {/* Order Summary */}
      {getTotalSelectedTickets() > 0 && (
        <div className="p-6 border-t border-border bg-muted/30">
          <div className="space-y-3 mb-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Selected Tickets:</span>
              <span className="font-medium text-foreground">{getTotalSelectedTickets()}</span>
            </div>
            {Object.entries(selectedTickets)?.map(([ticketId, quantity]) => {
              const ticket = ticketTypes?.find(t => t?.id === ticketId);
              if (!ticket) return null;
              
              return (
                <div key={ticketId} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {ticket?.name} × {quantity}
                  </span>
                  <span className="text-foreground">${(ticket?.price * quantity)?.toFixed(2)}</span>
                </div>
              );
            })}
            <div className="border-t border-border pt-3">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-foreground">Total Amount:</span>
                <span className="text-xl font-bold text-accent">${totalAmount?.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <Button
            variant="default"
            fullWidth
            onClick={handleProceedToCheckout}
            loading={isLoading}
            iconName="CreditCard"
            iconPosition="left"
            className="font-semibold"
          >
            {isLoading ? 'Processing...' : 'Proceed to Checkout'}
          </Button>

          {/* Trust Signals */}
          <div className="flex items-center justify-center space-x-4 mt-4 text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="Lock" size={12} />
              <span>SSL Secured</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Shield" size={12} />
              <span>Fraud Protected</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="RefreshCw" size={12} />
              <span>Instant Confirmation</span>
            </div>
          </div>
        </div>
      )}
      {/* Empty State */}
      {getTotalSelectedTickets() === 0 && (
        <div className="p-6 border-t border-border text-center">
          <Icon name="Ticket" size={48} className="text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground mb-2">No tickets selected</p>
          <p className="text-sm text-muted-foreground">Choose your tickets to continue</p>
        </div>
      )}
    </div>
  );
};

export default TicketSelectionPanel;