import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const EventInfoPanel = ({ event = {} }) => {
  const [expandedSection, setExpandedSection] = useState(null);

  const defaultEvent = {
    title: "Tech Innovation Summit 2025",
    date: "2025-03-15",
    time: "18:00",
    endTime: "23:00",
    venue: {
      name: "Grand Convention Center",
      address: "123 Innovation Drive, Tech City, TC 12345",
      capacity: 2500,
      coordinates: { lat: 40.7128, lng: -74.0060 }
    },
    description: `Join us for the most anticipated technology event of the year! The Tech Innovation Summit 2025 brings together industry leaders, innovators, and tech enthusiasts for an unforgettable evening of networking, learning, and inspiration.\n\nFeaturing keynote speakers from major tech companies, interactive workshops, product demonstrations, and exclusive networking opportunities. This premium event showcases the latest trends in AI, blockchain, cybersecurity, and emerging technologies.\n\nDon't miss this opportunity to connect with like-minded professionals and discover the future of technology.`,
    category: "Technology",
    tags: ["Innovation", "Networking", "AI", "Blockchain", "Future Tech"],
    organizer: {
      name: "TechEvents Pro",
      contact: "events@techpro.com",
      phone: "+1 (555) 123-4567"
    },
    policies: {
      ageRestriction: "18+",
      dresscode: "Business Casual",
      refundPolicy: "Full refund available up to 48 hours before event",
      cancellationPolicy: "Event may be cancelled due to unforeseen circumstances"
    }
  };

  const eventData = { ...defaultEvent, ...event };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString?.split(':');
    const date = new Date();
    date?.setHours(parseInt(hours), parseInt(minutes));
    return date?.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const shareEvent = (platform) => {
    const eventUrl = window.location?.href;
    const eventText = `Check out ${eventData?.title} - ${formatDate(eventData?.date)}`;
    
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(eventText)}&url=${encodeURIComponent(eventUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(eventUrl)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(eventUrl)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(eventText + ' ' + eventUrl)}`
    };

    if (shareUrls?.[platform]) {
      window.open(shareUrls?.[platform], '_blank', 'width=600,height=400');
    }
  };

  return (
    <div className="bg-card border-2 border-border rounded-lg shadow-elevation-2">
      {/* Event Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2 font-mono">
              {eventData?.title}
            </h1>
            <div className="flex items-center space-x-2 mb-3">
              <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm font-medium border border-accent/30">
                {eventData?.category}
              </span>
              <div className="flex items-center space-x-1">
                {eventData?.tags?.slice(0, 3)?.map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-muted text-muted-foreground rounded-full text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-muted rounded-lg transition-colors duration-150">
              <Icon name="Heart" size={20} className="text-muted-foreground hover:text-destructive" />
            </button>
            <button className="p-2 hover:bg-muted rounded-lg transition-colors duration-150">
              <Icon name="Bookmark" size={20} className="text-muted-foreground hover:text-accent" />
            </button>
          </div>
        </div>

        {/* Key Event Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
            <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
              <Icon name="Calendar" size={20} className="text-accent" />
            </div>
            <div>
              <p className="font-medium text-foreground">{formatDate(eventData?.date)}</p>
              <p className="text-sm text-muted-foreground">Event Date</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
            <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
              <Icon name="Clock" size={20} className="text-accent" />
            </div>
            <div>
              <p className="font-medium text-foreground">
                {formatTime(eventData?.time)} - {formatTime(eventData?.endTime)}
              </p>
              <p className="text-sm text-muted-foreground">Event Time</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg md:col-span-2">
            <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
              <Icon name="MapPin" size={20} className="text-accent" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground">{eventData?.venue?.name}</p>
              <p className="text-sm text-muted-foreground">{eventData?.venue?.address}</p>
            </div>
            <button className="text-accent hover:text-accent/80 transition-colors duration-150">
              <Icon name="ExternalLink" size={16} />
            </button>
          </div>
        </div>
      </div>
      {/* Event Description */}
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground mb-3 font-mono">About This Event</h3>
        <div className="prose prose-sm max-w-none">
          <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
            {eventData?.description}
          </p>
        </div>
      </div>
      {/* Expandable Sections */}
      <div className="divide-y divide-border">
        {/* Venue Details */}
        <div>
          <button
            onClick={() => toggleSection('venue')}
            className="w-full flex items-center justify-between p-6 text-left hover:bg-muted/30 transition-colors duration-150"
          >
            <div className="flex items-center space-x-3">
              <Icon name="Building" size={20} className="text-muted-foreground" />
              <div>
                <h4 className="font-medium text-foreground">Venue Information</h4>
                <p className="text-sm text-muted-foreground">Location details and directions</p>
              </div>
            </div>
            <Icon 
              name={expandedSection === 'venue' ? 'ChevronUp' : 'ChevronDown'} 
              size={20} 
              className="text-muted-foreground" 
            />
          </button>
          
          {expandedSection === 'venue' && (
            <div className="px-6 pb-6">
              <div className="bg-muted/30 rounded-lg p-4 mb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-foreground mb-2">Venue Details</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Capacity:</span>
                        <span className="text-foreground">{eventData?.venue?.capacity?.toLocaleString()} people</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Parking:</span>
                        <span className="text-foreground">Available on-site</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Accessibility:</span>
                        <span className="text-foreground">Wheelchair accessible</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h5 className="font-medium text-foreground mb-2">Getting There</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <Icon name="Car" size={16} className="text-muted-foreground" />
                        <span className="text-muted-foreground">15 min from downtown</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Icon name="Train" size={16} className="text-muted-foreground" />
                        <span className="text-muted-foreground">Metro Station: Tech Center</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Icon name="Plane" size={16} className="text-muted-foreground" />
                        <span className="text-muted-foreground">20 min from airport</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Map */}
              <div className="h-48 rounded-lg overflow-hidden border border-border">
                <iframe
                  width="100%"
                  height="100%"
                  loading="lazy"
                  title={eventData?.venue?.name}
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps?q=${eventData?.venue?.coordinates?.lat},${eventData?.venue?.coordinates?.lng}&z=14&output=embed`}>
                </iframe>
              </div>
            </div>
          )}
        </div>

        {/* Event Policies */}
        <div>
          <button
            onClick={() => toggleSection('policies')}
            className="w-full flex items-center justify-between p-6 text-left hover:bg-muted/30 transition-colors duration-150"
          >
            <div className="flex items-center space-x-3">
              <Icon name="FileText" size={20} className="text-muted-foreground" />
              <div>
                <h4 className="font-medium text-foreground">Event Policies</h4>
                <p className="text-sm text-muted-foreground">Terms, conditions, and guidelines</p>
              </div>
            </div>
            <Icon 
              name={expandedSection === 'policies' ? 'ChevronUp' : 'ChevronDown'} 
              size={20} 
              className="text-muted-foreground" 
            />
          </button>
          
          {expandedSection === 'policies' && (
            <div className="px-6 pb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                    <span className="text-muted-foreground">Age Restriction:</span>
                    <span className="font-medium text-foreground">{eventData?.policies?.ageRestriction}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                    <span className="text-muted-foreground">Dress Code:</span>
                    <span className="font-medium text-foreground">{eventData?.policies?.dresscode}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Refund Policy:</p>
                    <p className="text-sm text-foreground">{eventData?.policies?.refundPolicy}</p>
                  </div>
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Cancellation:</p>
                    <p className="text-sm text-foreground">{eventData?.policies?.cancellationPolicy}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Organizer Info */}
        <div>
          <button
            onClick={() => toggleSection('organizer')}
            className="w-full flex items-center justify-between p-6 text-left hover:bg-muted/30 transition-colors duration-150"
          >
            <div className="flex items-center space-x-3">
              <Icon name="Users" size={20} className="text-muted-foreground" />
              <div>
                <h4 className="font-medium text-foreground">Event Organizer</h4>
                <p className="text-sm text-muted-foreground">Contact and company information</p>
              </div>
            </div>
            <Icon 
              name={expandedSection === 'organizer' ? 'ChevronUp' : 'ChevronDown'} 
              size={20} 
              className="text-muted-foreground" 
            />
          </button>
          
          {expandedSection === 'organizer' && (
            <div className="px-6 pb-6">
              <div className="bg-muted/30 rounded-lg p-4">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                    <Icon name="Building2" size={24} className="text-accent" />
                  </div>
                  <div>
                    <h5 className="font-medium text-foreground">{eventData?.organizer?.name}</h5>
                    <p className="text-sm text-muted-foreground">Professional Event Organizer</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <Icon name="Mail" size={16} className="text-muted-foreground" />
                    <span className="text-sm text-foreground">{eventData?.organizer?.contact}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Icon name="Phone" size={16} className="text-muted-foreground" />
                    <span className="text-sm text-foreground">{eventData?.organizer?.phone}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Social Sharing */}
      <div className="p-6 border-t border-border bg-muted/30">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-foreground">Share This Event</h4>
          <div className="flex items-center space-x-2">
            {[
              { name: 'twitter', icon: 'Twitter', color: 'hover:text-blue-400' },
              { name: 'facebook', icon: 'Facebook', color: 'hover:text-blue-600' },
              { name: 'linkedin', icon: 'Linkedin', color: 'hover:text-blue-700' },
              { name: 'whatsapp', icon: 'MessageCircle', color: 'hover:text-green-600' }
            ]?.map((platform) => (
              <button
                key={platform?.name}
                onClick={() => shareEvent(platform?.name)}
                className={`p-2 text-muted-foreground ${platform?.color} transition-colors duration-150 rounded-lg hover:bg-background`}
              >
                <Icon name={platform?.icon} size={20} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventInfoPanel;