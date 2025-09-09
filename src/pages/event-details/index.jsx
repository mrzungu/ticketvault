import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import EventImageGallery from './components/EventImageGallery';
import EventInfoPanel from './components/EventInfoPanel';
import TicketSelectionPanel from './components/TicketSelectionPanel';
import SeatSelectionInterface from './components/SeatSelectionInterface';
import CustomerReviewsSection from './components/CustomerReviewsSection';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const EventDetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [selectedTickets, setSelectedTickets] = useState({});
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showSeatSelection, setShowSeatSelection] = useState(false);
  const [bookingData, setBookingData] = useState({});

  // Mock event data - in real app this would come from API/props
  const eventData = {
    id: 'tech-summit-2025',
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
    images: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800&h=600&fit=crop",
        alt: "Main event stage with lighting setup"
      },
      {
        id: 2,
        url: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?w=800&h=600&fit=crop",
        alt: "Event venue interior view"
      },
      {
        id: 3,
        url: "https://images.pixabay.com/photo/2016/11/23/15/48/audience-1853662_960_720.jpg?w=800&h=600&fit=crop",
        alt: "Audience enjoying the event"
      }
    ],
    ticketTypes: [
      {
        id: 'general',name: 'General Admission',price: 89.99,originalPrice: 99.99,available: 245,total: 500,description: 'Standard event access with general seating',
        features: ['Event Access', 'Welcome Drink', 'Networking Session', 'Digital Materials'],
        maxPerOrder: 8,
        category: 'standard'
      },
      {
        id: 'vip',name: 'VIP Experience',price: 199.99,originalPrice: 249.99,available: 48,total: 100,description: 'Premium experience with exclusive benefits',
        features: ['Priority Seating', 'VIP Lounge Access', 'Meet & Greet', 'Premium Catering', 'Exclusive Swag Bag', 'Valet Parking'],
        maxPerOrder: 4,
        category: 'premium',
        popular: true
      },
      {
        id: 'early-bird',name: 'Early Bird Special',price: 69.99,originalPrice: 89.99,available: 12,total: 50,description: 'Limited time early bird pricing',
        features: ['Event Access', 'Early Entry', 'Welcome Drink', 'Reserved Seating'],
        maxPerOrder: 6,
        category: 'special',
        limited: true
      }
    ]
  };

  // Check for user authentication
  useEffect(() => {
    const savedUser = localStorage.getItem('ticketVaultUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleAuthToggle = (userData) => {
    if (userData) {
      localStorage.setItem('ticketVaultUser', JSON.stringify(userData));
      setUser(userData);
    } else {
      localStorage.removeItem('ticketVaultUser');
      setUser(null);
    }
  };

  const handleBookingUpdate = (data) => {
    setSelectedTickets(data?.selectedTickets || {});
    setBookingData(data);
    
    // Show seat selection if tickets are selected and event supports seating
    const hasTickets = Object.keys(data?.selectedTickets || {})?.length > 0;
    setShowSeatSelection(hasTickets);
  };

  const handleSeatSelection = (seats) => {
    setSelectedSeats(seats);
  };

  const getTotalTickets = () => {
    return Object.values(selectedTickets)?.reduce((sum, quantity) => sum + quantity, 0);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} onAuthToggle={handleAuthToggle} />
      {/* Main Content */}
      <main className="pt-16">
        {/* Breadcrumb Navigation */}
        <div className="bg-muted/30 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4">
            <nav className="flex items-center space-x-2 text-sm">
              <button
                onClick={() => navigate('/')}
                className="text-muted-foreground hover:text-accent transition-colors duration-150"
              >
                Home
              </button>
              <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
              <button
                onClick={() => navigate('/events')}
                className="text-muted-foreground hover:text-accent transition-colors duration-150"
              >
                Events
              </button>
              <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
              <span className="text-foreground font-medium">Tech Innovation Summit 2025</span>
            </nav>
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="bg-card border-b border-border sticky top-16 z-40">
          <div className="max-w-7xl mx-auto px-4 lg:px-6">
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center space-x-6">
                <button
                  onClick={() => scrollToSection('event-info')}
                  className="text-sm text-muted-foreground hover:text-accent transition-colors duration-150"
                >
                  Event Details
                </button>
                <button
                  onClick={() => scrollToSection('tickets')}
                  className="text-sm text-muted-foreground hover:text-accent transition-colors duration-150"
                >
                  Tickets
                </button>
                {showSeatSelection && (
                  <button
                    onClick={() => scrollToSection('seats')}
                    className="text-sm text-muted-foreground hover:text-accent transition-colors duration-150"
                  >
                    Seat Selection
                  </button>
                )}
                <button
                  onClick={() => scrollToSection('reviews')}
                  className="text-sm text-muted-foreground hover:text-accent transition-colors duration-150"
                >
                  Reviews
                </button>
              </div>
              
              {getTotalTickets() > 0 && (
                <div className="flex items-center space-x-3">
                  <div className="text-sm text-muted-foreground">
                    {getTotalTickets()} ticket{getTotalTickets() !== 1 ? 's' : ''} selected
                  </div>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => scrollToSection('tickets')}
                    iconName="ShoppingCart"
                    iconPosition="left"
                  >
                    ${bookingData?.totalAmount?.toFixed(2) || '0.00'}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Event Information */}
            <div className="lg:col-span-2 space-y-8">
              {/* Event Image Gallery */}
              <EventImageGallery 
                images={eventData?.images} 
                eventTitle={eventData?.title} 
              />

              {/* Event Information Panel */}
              <div id="event-info">
                <EventInfoPanel event={eventData} />
              </div>

              {/* Seat Selection Interface */}
              {showSeatSelection && (
                <div id="seats">
                  <SeatSelectionInterface
                    venue={eventData?.venue}
                    selectedTickets={selectedTickets}
                    onSeatSelection={handleSeatSelection}
                  />
                </div>
              )}

              {/* Customer Reviews */}
              <div id="reviews">
                <CustomerReviewsSection eventId={eventData?.id} />
              </div>
            </div>

            {/* Right Column - Ticket Selection */}
            <div className="lg:col-span-1">
              <div id="tickets">
                <TicketSelectionPanel
                  event={eventData}
                  onBookingUpdate={handleBookingUpdate}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Sticky Booking Bar */}
        {getTotalTickets() > 0 && (
          <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t-2 border-border shadow-elevation-3 z-50">
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {getTotalTickets()} ticket{getTotalTickets() !== 1 ? 's' : ''} selected
                  </p>
                  <p className="font-bold text-accent text-lg">
                    ${bookingData?.totalAmount?.toFixed(2) || '0.00'}
                  </p>
                </div>
                <Button
                  variant="default"
                  onClick={() => scrollToSection('tickets')}
                  iconName="CreditCard"
                  iconPosition="left"
                  className="font-semibold"
                >
                  Proceed to Checkout
                </Button>
              </div>
              
              {selectedSeats?.length > 0 && (
                <div className="text-xs text-muted-foreground">
                  Seats: {selectedSeats?.map(seat => `${seat?.row}${seat?.number}`)?.join(', ')}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Trust Signals Footer */}
        <div className="bg-muted/30 border-t border-border mt-16">
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
              <div className="flex flex-col items-center space-y-2">
                <div className="w-12 h-12 bg-success/20 rounded-full flex items-center justify-center">
                  <Icon name="Shield" size={24} className="text-success" />
                </div>
                <h4 className="font-medium text-foreground">Secure Booking</h4>
                <p className="text-sm text-muted-foreground">SSL encrypted transactions</p>
              </div>
              
              <div className="flex flex-col items-center space-y-2">
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                  <Icon name="Zap" size={24} className="text-accent" />
                </div>
                <h4 className="font-medium text-foreground">Instant Confirmation</h4>
                <p className="text-sm text-muted-foreground">Immediate ticket delivery</p>
              </div>
              
              <div className="flex flex-col items-center space-y-2">
                <div className="w-12 h-12 bg-warning/20 rounded-full flex items-center justify-center">
                  <Icon name="RefreshCw" size={24} className="text-warning" />
                </div>
                <h4 className="font-medium text-foreground">Easy Refunds</h4>
                <p className="text-sm text-muted-foreground">Hassle-free cancellation</p>
              </div>
              
              <div className="flex flex-col items-center space-y-2">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <Icon name="Headphones" size={24} className="text-primary" />
                </div>
                <h4 className="font-medium text-foreground">24/7 Support</h4>
                <p className="text-sm text-muted-foreground">Always here to help</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Footer Spacer for Mobile Sticky Bar */}
      {getTotalTickets() > 0 && <div className="lg:hidden h-24"></div>}
    </div>
  );
};

export default EventDetailsPage;