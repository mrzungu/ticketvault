import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const VenueInformation = ({ venueData }) => {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const informationSections = [
    {
      key: 'directions',
      title: 'Directions & Transportation',
      icon: 'Navigation',
      content: (
        <div className="space-y-4">
          <div className="bg-muted/30 border border-border rounded-lg p-4">
            <h4 className="font-medium text-foreground mb-2">Getting There</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-3">
                <Icon name="Car" size={16} className="text-accent mt-1" />
                <div>
                  <p className="font-medium text-foreground">By Car</p>
                  <p className="text-muted-foreground">
                    Take Exit 15 from Highway 101. Free parking available in Lot A & B.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Icon name="Train" size={16} className="text-accent mt-1" />
                <div>
                  <p className="font-medium text-foreground">Public Transit</p>
                  <p className="text-muted-foreground">
                    Metro Line 3 to Central Station, then Bus 42 to venue (10 min walk).
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Icon name="Plane" size={16} className="text-accent mt-1" />
                <div>
                  <p className="font-medium text-foreground">From Airport</p>
                  <p className="text-muted-foreground">
                    25-minute drive via Airport Express or taxi service.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Interactive Map */}
          <div className="border-2 border-border rounded-lg overflow-hidden">
            <iframe
              width="100%"
              height="250"
              loading="lazy"
              title={venueData?.name}
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps?q=${venueData?.coordinates?.lat},${venueData?.coordinates?.lng}&z=15&output=embed`}
              className="w-full"
            />
          </div>
        </div>
      )
    },
    {
      key: 'parking',
      title: 'Parking Information',
      icon: 'Car',
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-success/10 border border-success/20 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="CheckCircle" size={16} className="text-success" />
                <h4 className="font-medium text-success">Free Parking</h4>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Lot A: 500 spaces (Main entrance)</li>
                <li>• Lot B: 300 spaces (Side entrance)</li>
                <li>• Street parking: 2-hour limit</li>
              </ul>
            </div>
            
            <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="DollarSign" size={16} className="text-warning" />
                <h4 className="font-medium text-warning">Premium Parking</h4>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• VIP Lot: $15 (Reserved spots)</li>
                <li>• Valet Service: $25</li>
                <li>• Covered Garage: $10</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-muted/30 border border-border rounded-lg p-4">
            <h4 className="font-medium text-foreground mb-2 flex items-center">
              <Icon name="Info" size={16} className="text-accent mr-2" />
              Parking Tips
            </h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Arrive 45 minutes early for best parking spots</li>
              <li>• Download ParkEasy app for real-time availability</li>
              <li>• Carpooling encouraged - special carpool spots available</li>
              <li>• Electric vehicle charging stations in Lot A</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      key: 'policies',
      title: 'Event Policies & Guidelines',
      icon: 'FileText',
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-foreground mb-3 flex items-center">
                <Icon name="Check" size={16} className="text-success mr-2" />
                Allowed Items
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Small bags (12" x 6" x 12")</li>
                <li>• Mobile phones & cameras</li>
                <li>• Sealed water bottles</li>
                <li>• Medication (with prescription)</li>
                <li>• Blankets for outdoor events</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-foreground mb-3 flex items-center">
                <Icon name="X" size={16} className="text-destructive mr-2" />
                Prohibited Items
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Outside food & beverages</li>
                <li>• Professional cameras</li>
                <li>• Weapons of any kind</li>
                <li>• Glass containers</li>
                <li>• Illegal substances</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
            <h4 className="font-medium text-warning mb-2 flex items-center">
              <Icon name="AlertTriangle" size={16} className="text-warning mr-2" />
              Important Policies
            </h4>
            <div className="text-sm text-muted-foreground space-y-2">
              <p>• All attendees subject to security screening</p>
              <p>• No re-entry policy in effect</p>
              <p>• Age restrictions: 18+ for VIP areas</p>
              <p>• Refunds available up to 48 hours before event</p>
              <p>• Event may be recorded for broadcast</p>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="bg-card border-2 border-border rounded-lg shadow-elevation-2 p-6 mb-6">
      <h2 className="text-xl font-semibold text-foreground font-mono mb-4 flex items-center">
        <Icon name="MapPin" size={24} className="text-accent mr-2" />
        Venue Information
      </h2>
      {/* Venue Header */}
      <div className="bg-gradient-to-r from-accent/10 to-primary/10 border border-border rounded-lg p-4 mb-6">
        <div className="flex items-start space-x-4">
          <div className="w-16 h-16 bg-accent rounded-lg flex items-center justify-center shrink-0">
            <Icon name="Building" size={24} className="text-accent-foreground" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-foreground mb-1">{venueData?.name}</h3>
            <p className="text-muted-foreground mb-2">{venueData?.address}</p>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center space-x-1">
                <Icon name="Phone" size={14} className="text-accent" />
                <span className="text-foreground">{venueData?.phone}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Globe" size={14} className="text-accent" />
                <span className="text-foreground">{venueData?.website}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Users" size={14} className="text-accent" />
                <span className="text-foreground">Capacity: {venueData?.capacity}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Expandable Information Sections */}
      <div className="space-y-3">
        {informationSections?.map((section) => (
          <div key={section?.key} className="border border-border rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection(section?.key)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors duration-150"
            >
              <div className="flex items-center space-x-3">
                <Icon name={section?.icon} size={20} className="text-accent" />
                <h3 className="font-medium text-foreground">{section?.title}</h3>
              </div>
              <Icon 
                name={expandedSection === section?.key ? "ChevronUp" : "ChevronDown"} 
                size={20} 
                className="text-muted-foreground" 
              />
            </button>
            
            {expandedSection === section?.key && (
              <div className="px-4 pb-4 border-t border-border">
                <div className="pt-4">
                  {section?.content}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Quick Contact */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex flex-col sm:flex-row gap-3">
          <button className="flex items-center justify-center space-x-2 px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors duration-150">
            <Icon name="Phone" size={16} />
            <span className="font-medium">Call Venue</span>
          </button>
          <button className="flex items-center justify-center space-x-2 px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg transition-colors duration-150">
            <Icon name="Navigation" size={16} className="text-muted-foreground" />
            <span className="font-medium text-foreground">Get Directions</span>
          </button>
          <button className="flex items-center justify-center space-x-2 px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg transition-colors duration-150">
            <Icon name="Globe" size={16} className="text-muted-foreground" />
            <span className="font-medium text-foreground">Visit Website</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VenueInformation;