import React from 'react';
import Icon from '../../../components/AppIcon';

const BookingHeader = ({ bookingData }) => {
  return (
    <div className="bg-gradient-to-r from-success/20 to-accent/20 border-2 border-success rounded-lg p-6 mb-6">
      <div className="flex items-center justify-center mb-4">
        <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center shadow-cyber animate-pulse-glow">
          <Icon name="CheckCircle" size={32} className="text-white" />
        </div>
      </div>
      <div className="text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground font-mono mb-2">
          Booking Confirmed!
        </h1>
        <p className="text-muted-foreground mb-4">
          Your tickets have been successfully purchased and are ready for download
        </p>
        
        <div className="bg-card border border-border rounded-lg p-4 inline-block">
          <div className="flex items-center space-x-2">
            <Icon name="Hash" size={16} className="text-accent" />
            <span className="text-sm text-muted-foreground">Booking Reference:</span>
            <span className="font-mono font-bold text-accent text-lg">
              {bookingData?.referenceNumber}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingHeader;