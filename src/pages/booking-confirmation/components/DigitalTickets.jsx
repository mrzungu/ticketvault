import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DigitalTickets = ({ tickets, onDownloadPDF, onEmailTicket, onAddToWallet }) => {
  const [expandedTicket, setExpandedTicket] = useState(null);

  const toggleTicketExpansion = (ticketId) => {
    setExpandedTicket(expandedTicket === ticketId ? null : ticketId);
  };

  const generateQRCode = (ticketId) => {
    // Mock QR code generation - in real app would use qrcode library
    return `data:image/svg+xml;base64,${btoa(`
      <svg width="120" height="120" xmlns="http://www.w3.org/2000/svg">
        <rect width="120" height="120" fill="white"/>
        <g fill="black">
          <rect x="10" y="10" width="10" height="10"/>
          <rect x="30" y="10" width="10" height="10"/>
          <rect x="50" y="10" width="10" height="10"/>
          <rect x="70" y="10" width="10" height="10"/>
          <rect x="90" y="10" width="10" height="10"/>
          <rect x="10" y="30" width="10" height="10"/>
          <rect x="50" y="30" width="10" height="10"/>
          <rect x="90" y="30" width="10" height="10"/>
          <rect x="10" y="50" width="10" height="10"/>
          <rect x="30" y="50" width="10" height="10"/>
          <rect x="70" y="50" width="10" height="10"/>
          <rect x="90" y="50" width="10" height="10"/>
          <rect x="10" y="70" width="10" height="10"/>
          <rect x="50" y="70" width="10" height="10"/>
          <rect x="90" y="70" width="10" height="10"/>
          <rect x="10" y="90" width="10" height="10"/>
          <rect x="30" y="90" width="10" height="10"/>
          <rect x="50" y="90" width="10" height="10"/>
          <rect x="70" y="90" width="10" height="10"/>
          <rect x="90" y="90" width="10" height="10"/>
        </g>
        <text x="60" y="110" text-anchor="middle" font-size="8" fill="black">${ticketId}</text>
      </svg>
    `)}`;
  };

  return (
    <div className="bg-card border-2 border-border rounded-lg shadow-elevation-2 p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground font-mono flex items-center">
          <Icon name="Ticket" size={24} className="text-accent mr-2" />
          Your Digital Tickets
        </h2>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          <span className="text-sm text-success font-medium">Active</span>
        </div>
      </div>
      <div className="space-y-4">
        {tickets?.map((ticket, index) => (
          <div key={ticket?.id} className="border-2 border-border rounded-lg overflow-hidden">
            {/* Ticket Header */}
            <div className="bg-gradient-to-r from-accent/10 to-primary/10 p-4 border-b border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                    <span className="text-accent-foreground font-bold font-mono">
                      {index + 1}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{ticket?.type} Ticket</h3>
                    <p className="text-sm text-muted-foreground">
                      Seat: {ticket?.seat} • Section: {ticket?.section}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => toggleTicketExpansion(ticket?.id)}
                  className="p-2 hover:bg-muted/50 rounded-lg transition-colors duration-150"
                >
                  <Icon 
                    name={expandedTicket === ticket?.id ? "ChevronUp" : "ChevronDown"} 
                    size={20} 
                    className="text-muted-foreground" 
                  />
                </button>
              </div>
            </div>

            {/* Ticket Content */}
            {expandedTicket === ticket?.id && (
              <div className="p-6 bg-card">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* QR Code Section */}
                  <div className="lg:w-1/3">
                    <div className="bg-white border-2 border-foreground rounded-lg p-4 text-center">
                      <img
                        src={generateQRCode(ticket?.id)}
                        alt={`QR Code for ticket ${ticket?.id}`}
                        className="w-32 h-32 mx-auto mb-3"
                      />
                      <p className="text-xs text-foreground font-mono font-bold">
                        {ticket?.id}
                      </p>
                      <div className="mt-3 p-2 bg-accent/10 rounded border border-accent/20">
                        <p className="text-xs text-accent font-medium">
                          Scan at venue entrance
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Ticket Details */}
                  <div className="lg:w-2/3 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Ticket ID</p>
                        <p className="font-mono font-bold text-foreground">{ticket?.id}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Price</p>
                        <p className="font-bold text-foreground">${ticket?.price}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Entry Gate</p>
                        <p className="font-medium text-foreground">{ticket?.gate}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Valid Until</p>
                        <p className="font-medium text-foreground">{ticket?.validUntil}</p>
                      </div>
                    </div>

                    {/* Security Features */}
                    <div className="bg-muted/30 border border-border rounded-lg p-4">
                      <h4 className="font-medium text-foreground mb-2 flex items-center">
                        <Icon name="Shield" size={16} className="text-success mr-2" />
                        Security Features
                      </h4>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="flex items-center space-x-2">
                          <Icon name="Check" size={12} className="text-success" />
                          <span className="text-muted-foreground">Unique QR Code</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Icon name="Check" size={12} className="text-success" />
                          <span className="text-muted-foreground">Blockchain Verified</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Icon name="Check" size={12} className="text-success" />
                          <span className="text-muted-foreground">Anti-Forgery</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Icon name="Check" size={12} className="text-success" />
                          <span className="text-muted-foreground">Real-time Validation</span>
                        </div>
                      </div>
                    </div>

                    {/* Entry Instructions */}
                    <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
                      <h4 className="font-medium text-warning mb-2 flex items-center">
                        <Icon name="Info" size={16} className="text-warning mr-2" />
                        Entry Instructions
                      </h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Present QR code at {ticket?.gate} entrance</li>
                        <li>• Arrive 30 minutes before event start</li>
                        <li>• Bring valid photo ID for verification</li>
                        <li>• Keep ticket visible until seated</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Ticket Actions */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Button
            variant="default"
            onClick={() => onDownloadPDF(tickets)}
            iconName="Download"
            iconPosition="left"
            fullWidth
          >
            Download PDF
          </Button>
          <Button
            variant="outline"
            onClick={() => onEmailTicket(tickets)}
            iconName="Mail"
            iconPosition="left"
            fullWidth
          >
            Email Tickets
          </Button>
          <Button
            variant="outline"
            onClick={() => onAddToWallet(tickets)}
            iconName="Wallet"
            iconPosition="left"
            fullWidth
          >
            Add to Wallet
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DigitalTickets;