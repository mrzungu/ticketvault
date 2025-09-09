import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import BookingHeader from './components/BookingHeader';
import EventSummary from './components/EventSummary';
import DigitalTickets from './components/DigitalTickets';
import PaymentSummary from './components/PaymentSummary';
import SocialSharing from './components/SocialSharing';
import VenueInformation from './components/VenueInformation';
import NextSteps from './components/NextSteps';
import Icon from '../../components/AppIcon';

const BookingConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock booking data - in real app would come from API/state
  const mockBookingData = {
    referenceNumber: "TKV-2025-001247",
    totalTickets: 2,
    ticketType: "VIP Experience",
    totalAmount: "299.98",
    subtotal: "259.98",
    serviceFee: "25.00",
    processingFee: "15.00",
    discount: 0,
    eventTime: "7:00 PM",
    tickets: [
      {
        type: "VIP",
        quantity: 2,
        price: 129.99
      }
    ]
  };

  const mockEventData = {
    title: "Tech Innovation Summit 2025",
    description: "Join industry leaders for groundbreaking discussions on AI, blockchain, and the future of technology.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop",
    category: "Technology",
    venue: "Innovation Center",
    address: "123 Tech Boulevard, Silicon Valley, CA 94025",
    date: "March 15, 2025",
    time: "7:00 PM - 11:00 PM"
  };

  const mockTickets = [
    {
      id: "TKV-VIP-001247-01",
      type: "VIP Experience",
      seat: "A-15",
      section: "VIP Section",
      gate: "Gate A",
      price: "129.99",
      validUntil: "March 16, 2025 11:59 PM"
    },
    {
      id: "TKV-VIP-001247-02",
      type: "VIP Experience",
      seat: "A-16",
      section: "VIP Section",
      gate: "Gate A",
      price: "129.99",
      validUntil: "March 16, 2025 11:59 PM"
    }
  ];

  const mockPaymentData = {
    transactionId: "TXN-789456123",
    method: "Visa",
    lastFour: "4242",
    date: "December 8, 2025 2:10 PM",
    billingName: "John Smith",
    billingEmail: "john.smith@email.com",
    billingAddress: "456 Main Street, Anytown, CA 90210"
  };

  const mockVenueData = {
    name: "Innovation Center",
    address: "123 Tech Boulevard, Silicon Valley, CA 94025",
    phone: "(555) 123-4567",
    website: "innovationcenter.com",
    capacity: "2,500",
    coordinates: {
      lat: 37.4419,
      lng: -122.1430
    }
  };

  useEffect(() => {
    // Simulate loading and user authentication check
    const timer = setTimeout(() => {
      // Mock user data
      setUser({
        id: 1,
        name: "John Smith",
        email: "john.smith@email.com",
        role: "user"
      });
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleDownloadPDF = (tickets) => {
    console.log('Downloading PDF for tickets:', tickets);
    // Mock PDF download
    alert('PDF download started! Check your downloads folder.');
  };

  const handleEmailTicket = (tickets) => {
    console.log('Emailing tickets:', tickets);
    alert(`Tickets sent to ${mockPaymentData?.billingEmail}`);
  };

  const handleAddToWallet = (tickets) => {
    console.log('Adding to wallet:', tickets);
    alert('Tickets added to your mobile wallet!');
  };

  const handleShare = (platform) => {
    console.log('Shared on:', platform);
  };

  const handleManageBooking = (booking) => {
    console.log('Managing booking:', booking);
    navigate('/admin-dashboard');
  };

  const handleContactSupport = (booking) => {
    console.log('Contacting support for booking:', booking);
    alert('Support chat will open in a new window.');
  };

  const handleAuthToggle = (userData) => {
    setUser(userData);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header user={user} onAuthToggle={handleAuthToggle} />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <Icon name="Loader2" size={32} className="text-accent-foreground animate-spin" />
            </div>
            <p className="text-muted-foreground font-mono">Loading your booking confirmation...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} onAuthToggle={handleAuthToggle} />
      <main className="pt-16">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Booking Header */}
          <BookingHeader bookingData={mockBookingData} />

          {/* Event Summary */}
          <EventSummary 
            eventData={mockEventData} 
            bookingData={mockBookingData} 
          />

          {/* Digital Tickets */}
          <DigitalTickets
            tickets={mockTickets}
            onDownloadPDF={handleDownloadPDF}
            onEmailTicket={handleEmailTicket}
            onAddToWallet={handleAddToWallet}
          />

          {/* Payment Summary */}
          <PaymentSummary
            paymentData={mockPaymentData}
            bookingData={mockBookingData}
          />

          {/* Social Sharing */}
          <SocialSharing
            eventData={mockEventData}
            onShare={handleShare}
          />

          {/* Venue Information */}
          <VenueInformation venueData={mockVenueData} />

          {/* Next Steps */}
          <NextSteps
            bookingData={mockBookingData}
            onManageBooking={handleManageBooking}
            onContactSupport={handleContactSupport}
          />

          {/* Footer Actions */}
          <div className="bg-card border-2 border-border rounded-lg shadow-elevation-2 p-6">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Icon name="Shield" size={20} className="text-success" />
                <span className="text-sm font-medium text-success">Secure Transaction Completed</span>
              </div>
              <p className="text-muted-foreground text-sm mb-6">
                Your booking is confirmed and protected by our secure payment system. 
                All tickets are verified and ready for use.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => navigate('/event-details')}
                  className="flex items-center justify-center space-x-2 px-6 py-3 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors duration-150 font-medium"
                >
                  <Icon name="Search" size={18} />
                  <span>Discover More Events</span>
                </button>
                <button
                  onClick={() => window.print()}
                  className="flex items-center justify-center space-x-2 px-6 py-3 bg-muted hover:bg-muted/80 text-foreground rounded-lg transition-colors duration-150 font-medium"
                >
                  <Icon name="Printer" size={18} />
                  <span>Print Confirmation</span>
                </button>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center mt-8 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground font-mono">
              © {new Date()?.getFullYear()} TicketVault. All rights reserved. 
              Secure • Fast • Trusted
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookingConfirmation;