import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ScanResultDisplay = ({ 
  result = null,
  onClearResult = () => {},
  onAllowEntry = () => {},
  onDenyEntry = () => {},
  className = ''
}) => {
  if (!result) {
    return (
      <div className={`bg-muted/30 border-2 border-dashed border-border rounded-lg p-8 text-center ${className}`}>
        <Icon name="QrCode" size={48} className="text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground font-mono">
          Scan results will appear here
        </p>
      </div>
    );
  }

  const isValid = result?.isValid;
  const statusColor = isValid ? 'success' : 'destructive';
  const statusBg = isValid ? 'bg-success/20' : 'bg-destructive/20';
  const statusBorder = isValid ? 'border-success/30' : 'border-destructive/30';
  const statusText = isValid ? 'text-success' : 'text-destructive';

  return (
    <div className={`bg-card border-2 border-border rounded-lg shadow-elevation-2 ${className}`}>
      {/* Result Header */}
      <div className={`p-4 border-b border-border ${statusBg}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${statusBg} border-2 ${statusBorder}`}>
              <Icon 
                name={isValid ? "CheckCircle" : "XCircle"} 
                size={24} 
                className={statusText}
              />
            </div>
            <div>
              <h3 className={`text-lg font-semibold font-mono ${statusText}`}>
                {isValid ? 'VALID TICKET' : 'INVALID TICKET'}
              </h3>
              <p className="text-sm text-muted-foreground">
                Scanned at {new Date(result.timestamp)?.toLocaleTimeString()}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearResult}
            iconName="X"
          />
        </div>
      </div>
      {/* Ticket Information */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Primary Details */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground font-mono">
                TICKET ID
              </label>
              <p className="text-lg font-mono text-foreground mt-1">
                {result?.ticketId}
              </p>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground font-mono">
                ATTENDEE NAME
              </label>
              <p className="text-lg font-semibold text-foreground mt-1">
                {result?.attendeeName}
              </p>
            </div>

            <div className="flex space-x-4">
              <div className="flex-1">
                <label className="text-sm font-medium text-muted-foreground font-mono">
                  SEAT
                </label>
                <p className="text-lg font-mono text-foreground mt-1">
                  {result?.seatNumber}
                </p>
              </div>
              <div className="flex-1">
                <label className="text-sm font-medium text-muted-foreground font-mono">
                  TYPE
                </label>
                <div className="mt-1">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium font-mono ${
                    result?.ticketType === 'VIP' ?'bg-warning/20 text-warning border border-warning/30' :'bg-accent/20 text-accent border border-accent/30'
                  }`}>
                    {result?.ticketType}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Event Details */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground font-mono">
                EVENT ID
              </label>
              <p className="text-lg font-mono text-foreground mt-1">
                {result?.eventId}
              </p>
            </div>

            {/* Error Message for Invalid Tickets */}
            {!isValid && result?.error && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Icon name="AlertTriangle" size={20} className="text-destructive mt-0.5" />
                  <div>
                    <p className="font-medium text-destructive mb-1">
                      Validation Error
                    </p>
                    <p className="text-sm text-destructive/80">
                      {result?.error}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Success Message for Valid Tickets */}
            {isValid && (
              <div className="bg-success/10 border border-success/20 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Icon name="CheckCircle" size={20} className="text-success mt-0.5" />
                  <div>
                    <p className="font-medium text-success mb-1">
                      Entry Authorized
                    </p>
                    <p className="text-sm text-success/80">
                      Ticket is valid and ready for entry
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-6 pt-6 border-t border-border">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="bg-muted/50 rounded-lg p-3">
              <Icon name="Calendar" size={20} className="text-muted-foreground mx-auto mb-2" />
              <p className="text-xs text-muted-foreground font-mono">SCAN TIME</p>
              <p className="text-sm font-medium text-foreground">
                {new Date(result.timestamp)?.toLocaleTimeString()}
              </p>
            </div>
            
            <div className="bg-muted/50 rounded-lg p-3">
              <Icon name="MapPin" size={20} className="text-muted-foreground mx-auto mb-2" />
              <p className="text-xs text-muted-foreground font-mono">LOCATION</p>
              <p className="text-sm font-medium text-foreground">
                Main Entrance
              </p>
            </div>
            
            <div className="bg-muted/50 rounded-lg p-3">
              <Icon name="User" size={20} className="text-muted-foreground mx-auto mb-2" />
              <p className="text-xs text-muted-foreground font-mono">SCANNED BY</p>
              <p className="text-sm font-medium text-foreground">
                Staff-001
              </p>
            </div>
            
            <div className="bg-muted/50 rounded-lg p-3">
              <Icon name="Shield" size={20} className="text-muted-foreground mx-auto mb-2" />
              <p className="text-xs text-muted-foreground font-mono">STATUS</p>
              <p className={`text-sm font-medium ${statusText}`}>
                {isValid ? 'VERIFIED' : 'REJECTED'}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          {isValid ? (
            <>
              <Button
                variant="success"
                onClick={() => onAllowEntry(result)}
                iconName="Check"
                iconPosition="left"
                className="flex-1 font-medium"
              >
                Allow Entry
              </Button>
              <Button
                variant="outline"
                onClick={() => onDenyEntry(result)}
                iconName="X"
                iconPosition="left"
                className="flex-1"
              >
                Deny Entry
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="destructive"
                onClick={() => onDenyEntry(result)}
                iconName="Ban"
                iconPosition="left"
                className="flex-1 font-medium"
              >
                Entry Denied
              </Button>
              <Button
                variant="outline"
                onClick={onClearResult}
                iconName="RotateCcw"
                iconPosition="left"
                className="flex-1"
              >
                Scan Again
              </Button>
            </>
          )}
        </div>

        {/* Manual Override (Staff Only) */}
        <div className="mt-4 pt-4 border-t border-border">
          <details className="group">
            <summary className="flex items-center justify-between cursor-pointer text-sm text-muted-foreground hover:text-foreground transition-colors">
              <span className="font-mono">Manual Override Options</span>
              <Icon name="ChevronDown" size={16} className="group-open:rotate-180 transition-transform" />
            </summary>
            <div className="mt-3 space-y-2">
              <Button
                variant="ghost"
                size="sm"
                iconName="Edit"
                iconPosition="left"
                className="w-full justify-start"
              >
                Edit Ticket Details
              </Button>
              <Button
                variant="ghost"
                size="sm"
                iconName="MessageSquare"
                iconPosition="left"
                className="w-full justify-start"
              >
                Add Staff Note
              </Button>
              <Button
                variant="ghost"
                size="sm"
                iconName="Phone"
                iconPosition="left"
                className="w-full justify-start"
              >
                Contact Supervisor
              </Button>
            </div>
          </details>
        </div>
      </div>
    </div>
  );
};

export default ScanResultDisplay;