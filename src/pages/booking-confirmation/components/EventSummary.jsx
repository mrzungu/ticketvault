import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const EventSummary = ({ eventData, bookingData }) => {
  return (
    <div className="bg-card border-2 border-border rounded-lg shadow-elevation-2 p-6 mb-6">
      <h2 className="text-xl font-semibold text-foreground font-mono mb-4 flex items-center">
        <Icon name="Calendar" size={24} className="text-accent mr-2" />
        Event Details
      </h2>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3">
          <div className="relative overflow-hidden rounded-lg border-2 border-border">
            <Image
              src={eventData?.image}
              alt={eventData?.title}
              className="w-full h-48 object-cover"
            />
            <div className="absolute top-2 right-2 bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-bold">
              {eventData?.category}
            </div>
          </div>
        </div>
        
        <div className="md:w-2/3 space-y-4">
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-2">{eventData?.title}</h3>
            <p className="text-muted-foreground">{eventData?.description}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <Icon name="MapPin" size={20} className="text-accent" />
              <div>
                <p className="font-medium text-foreground">{eventData?.venue}</p>
                <p className="text-sm text-muted-foreground">{eventData?.address}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Icon name="Clock" size={20} className="text-accent" />
              <div>
                <p className="font-medium text-foreground">{eventData?.date}</p>
                <p className="text-sm text-muted-foreground">{eventData?.time}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Icon name="Ticket" size={20} className="text-accent" />
              <div>
                <p className="font-medium text-foreground">{bookingData?.totalTickets} Tickets</p>
                <p className="text-sm text-muted-foreground">{bookingData?.ticketType}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Icon name="DollarSign" size={20} className="text-accent" />
              <div>
                <p className="font-medium text-foreground">${bookingData?.totalAmount}</p>
                <p className="text-sm text-muted-foreground">Total Paid</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventSummary;